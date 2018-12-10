export function handleChange({ setState }) {
  return event => {
    setState(prevState => ({ value: event.target.value }));
  };
}
