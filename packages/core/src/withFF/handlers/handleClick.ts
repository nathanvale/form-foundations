import {
  warnAboutMissingIdentifier,
  isString,
  isFunction,
  setIn,
} from '../../utils';

export function handleClick({ setState }) {
  const hbCache: {
    [key: string]: (e: any) => void;
  } = {};
  return (eventOrString: any): void | ((e: any) => void) => {
    const executeClick = (e: any, path?: string) => {
      if (e.persist) {
        e.persist();
      }
      const { name, id, outerHTML } = e.target;
      const field = path ? path : name ? name : id;

      if (!field && process.env.NODE_ENV !== 'production') {
        warnAboutMissingIdentifier({
          htmlContent: outerHTML,
          documentationAnchorLink: 'handleclick-e-any--void',
          handlerName: 'handleClick',
        });
      }

      setState(prevState => ({
        ...prevState,
        active: { [field]: true },
      }));
    };

    if (isString(eventOrString)) {
      // cache these handlers by key like Preact's linkState does for perf boost
      return isFunction(hbCache[eventOrString])
        ? hbCache[eventOrString]
        : (hbCache[eventOrString] = (event: any) =>
            executeClick(event, eventOrString));
    } else {
      executeClick(eventOrString);
    }
  };
}
