export function handleReset({ setState, handleReset }) {
  return () => {
    handleReset();
    setState(prevState => ({
      ...prevState,
      active: {},
    }));
  };
}
