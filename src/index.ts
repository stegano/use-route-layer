import { useEffect, useLayoutEffect, useState } from 'react';
import queryString from 'query-string';

const globalThis: Window | undefined = typeof window === 'undefined' ? undefined : window as Window;
const useIsomorphicEffect = globalThis ? useLayoutEffect : useEffect;

/**
 * useRouteLayer
 * @param [$component=null]
 * @param [url=''] 
 * @param [qsLayersName="__layers__"] 
 * @param [qsLayerId="layerId"] 
 * @param [pushFn=(url: string) => any] 
 * @param [backFn=() => any] 
 */
const useRouteLayer = (
  /**
   * Layer component to be displayed on the screen.
   */
  $component: JSX.Element| null = null,
  /**
   * URL information including QueryString.
   */
  url: string = '',
  /**
   * The name of the queryParameter to use as the `layerName`.
   */
  qsLayersName: string = '__layers__',
  /**
   * The name to use as the `layerId` value.
   */
  qsLayerId: string = 'layerId',
  /**
   * Bind a pushState function that can change the browser URL.
   */
  pushFn: (url: string) => any,
  /**
   * Binds a function that can call the browser back function.
   */
  backFn: () => any,
) : [
  JSX.Element | null,
  Function,
  Function,
  boolean
] => {
  const [isShowLayer, setShowLayer] = useState<boolean>(false);

  useIsomorphicEffect(() => {
    const qs = queryString.parseUrl(url);
    const layers: string | string[] | null | undefined = qs.query[qsLayersName];
    if (layers) {
      /**
       * When `layers` exists in the URL QueryParamters
       */
      const hasLayer = layers?.includes(qsLayerId) || layers === qsLayerId;
      if (hasLayer) {
        /**
         * If `layers` queryParameter value has a `layerId`
         */
        setShowLayer(true);
      }
    } else {
      /**
       * When `layers` not exists in the URL QueryParamters
       */
      setShowLayer(false);
    }
  }, [url]);

  const showLayer = (): boolean => {
    const qs = queryString.parseUrl(url);
    const layers: string | string[] | null | undefined = qs.query[qsLayersName];
    if (layers) {
      /**
       * If the `layers` already exists
       */
      if (Array.isArray(layers)) {
        /**
         * If there are multiple `layers`
         */
        layers.push(qsLayerId);
        pushFn(queryString.stringifyUrl(qs));
        return true;
      }
      /**
       * Add a new `layers`, if the layer doesn't exist
       */
      qs.query[qsLayersName] = qsLayerId;
      pushFn(queryString.stringifyUrl(qs));
      return true;
    }
    /**
     * Add a new `layers`
     */
    qs.query[qsLayersName] = qsLayerId;
    pushFn(queryString.stringifyUrl(qs));
    return true;
  };

  const closeLayer = (): boolean => {
    const qs = queryString.parseUrl(url);
    const layers: string | string[] | null | undefined = qs.query[qsLayersName];
    if (layers?.includes(qsLayerId)) {
      /**
       * Execute `backFn` only if the `layers` exists
       */
      backFn();
      return true;
    }
    return false;
  };

  const LayerComponent: JSX.Element | null = isShowLayer ? $component : null;
  return [
    /**
     * It is a `LayerComponent` entered as a factor. This component may or may not be displayed depending on the URL state.
     */
    LayerComponent, 
    /**
     * Changes the URL state so that the `LayerComponent` can be displayed on the screen.
     */
    showLayer, 
    /**
     * Change the URL state so that the layer does not appear on the screen.
     */
    closeLayer, 
    /**
     * Whether the layer component is displayed or not.
     */
    isShowLayer
  ];
};

export default useRouteLayer;
