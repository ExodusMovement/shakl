const flatten = styles => {
  if (styles === null || typeof styles !== 'object') {
    return undefined;
  }

  if (!Array.isArray(styles)) {
    return styles;
  }

  return styles.reduce((obj, style) => ({ ...obj, ...flatten(style) }), {});
};

export default flatten;
