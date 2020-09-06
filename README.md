# use-router-layer
This library is a react hook library that facilitates layer management. It can easily control layer displayed through the browser's `backward` or `forward` functions by mapping layer information displayed on the screen to URL information.

![Example](samples/screenshot.gif)
> A greeting Layer is displayed or not displayed depending on the URL change.

## Installation

The easiest way to install `use-router-layer` is with [npm](https://www.npmjs.com/package/use-router-layer).

```bash
npm install use-router-layer
```

Alternately, download the source.

```bash
git clone https://github.com/stegano/use-router-layer.git
```

## Features
```ts
const useRouterLayer = (
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
  ...
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
```

## Usage
### for React
```ts
// use-router-layer-for-react.ts

import { useHistory, useLocation } from 'react-router-dom';
import useRouterLayer from 'use-router-layer';

const useRouterLayerForNextjs = (
  $layerComponent: JSX.Element | null = null,
  url: string,
  qsLayersName: string = 'layersName',
  qsLayerId: string = 'myLayerId',
) => {
  const location = useLocation();
  return useRouterLayer(
    $layerComponent,
    location.search,
    qsLayersName,
    qsLayerId,
    (urlWithQuery: string) => {
      useHistory.go(urlWithQuery);
    }, useHistory.goBack,
  )
};

export default useRouterLayerForNextjs;
```
### for Next.js
```ts
// use-router-layer-for-nextjs.ts

import { useRouter } from 'next/router';
import useRouterLayer from 'use-router-layer';

const useRouterLayerForNextjs = (
  $layerComponent: JSX.Element | null = null,
  url: string,
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
```
### Using in Component
```ts
// component.tsx

import React from 'react';
import useRouterLayer from 'src/hooks/use-router-layer-for-nextjs' or 'src/hooks/use-router-layer-for-rejct';
...
import EventLayer from 'src/layers/event';
const Component = () => {
  const [
    $layerComponent, showLayer, closeLayer
  ] = useRouterLayer(
    <EventLayer/>, 'layersName', 'event',
  );

  const handleClickShowLayer = () => {
    /**
     * When the code below is executed, your browser URL will be `/?layersName=event` and the `EventLayer` component displayed.
     */
    showLayer();
  };

  const handleClickCloseLayer = () => {
    /**
     *  When the code below is executed, `/?layersName=event` will be removed from your browser URL, and `EventLayer` component will not be displayed.
     */
    closeLayer();
  };

  return (
    ...
    {$layerComponent}
    ...
  )
};
```
