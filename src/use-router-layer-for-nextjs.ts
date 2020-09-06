import { useRouter } from 'next/router';
import useRouterLayer from './index';

/**
 * useRouterLayerForNextjs
 * @param $layerComponent 
 * @param qsLayersName 
 * @param qsLayerId 
 */
const useRouterLayerForNextjs = <T extends JSX.Element | null> (
  $layerComponent: T | null = null,
  qsLayersName: string = 'layersName',
  qsLayerId: string = 'myLayerId',
) => {
  const router = useRouter();
  return useRouterLayer(
    $layerComponent,
    router.asPath,
    qsLayersName,
    qsLayerId,
    (urlWithQuery: string) => {
      router.push(urlWithQuery, undefined, {
        shallow: true,
      });
    }, router.back,
  );
}

export default useRouterLayerForNextjs;
