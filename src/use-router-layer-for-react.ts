import { useHistory, useLocation } from 'react-router-dom';
import useRouterLayer from './index';

/**
 * useRouterLayerForReact
 * @param $layerComponent 
 * @param qsLayersName 
 * @param qsLayerId 
 */
const useRouterLayerForReact = <T extends JSX.Element | null>(
  $layerComponent: T | null = null,
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

export default useRouterLayerForReact;
