export default (item, props) => {
  if (typeof item === 'function') return item(props);

  return item;
};
