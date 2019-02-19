const flatten = (style) => {
  if (style === null || typeof style !== 'object') {
    return undefined
  }

  if (!Array.isArray(style)) {
    return style
  }

  const styles = {}

  for (let i = 0; i < style.length; i += 1) {
    const computed = flatten(style[i])

    if (computed) {
      for (const key in computed) {
        styles[key] = computed[key]
      }
    }
  }

  return styles
}

export default flatten
