const evaluate = (item, props) => {
  if (typeof item === 'function') {
    return item(props);
  }

  return item;
};

export default evaluate;
