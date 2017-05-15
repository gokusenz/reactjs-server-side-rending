export default function prefetchData(dispatch, components, renderProps) {
  const prefetchActions = components
    .filter(component => component)
    .reduce((prev, current) => {
      const wrappedComponent = current.WrappedComponent;
      return (current.prefetchAction || [])
        .concat((wrappedComponent && wrappedComponent.prefetchAction) || [])
        .concat(prev);
    }, []);
  return Promise.all([...new Set(prefetchActions)].map(prefetchAction => dispatch(prefetchAction(renderProps))));
}
