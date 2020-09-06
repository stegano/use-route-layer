export interface useRouteLayer<T extends JSX.Element | null>{
  (
    $component: T,
    url: string,
    qsLayersName: string,
    qsLayerId: string,
    pushFn: (url: string) => any,
    backFn: () => any,
  ): [
    T,
    Function,
    Function,
    boolean
  ]
}
