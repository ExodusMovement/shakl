const flatten = style => {
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  const styles = {};

  for (let i = 0; i < style.length; i += 1) {
    const computed = flatten(style[i]);

    if (computed) {
      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const key in computed) {
        styles[key] = computed[key];
      }
    }
  }

  return styles;
};

export default flatten;
