export function handleChange({ setState }) {
  return event => {
    setState(() => ({ value: event.target.value }));
  };
}
