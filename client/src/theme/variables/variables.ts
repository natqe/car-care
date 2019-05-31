/**
 * @description Return value of ionic css variable
 *
 * @param {string} target
 * @param {*} [fromElement=document.documentElement]
 * @returns
 */
const ionCssVariable = (target: string, fromElement = document.documentElement) => {

  const prefix = `--ion-`

  if (!target.startsWith(prefix)) target = `${prefix}${target}`

  return getComputedStyle(fromElement)
    .getPropertyValue(target)
    .trim()

}
/**
 * @description Return rgba value of ionic primary color with the opacity passed
 *
 * @param {number} [opacity=1]
 */
const ionColorPrimaryRgba = (opacity = 1) => `rgba(${ionCssVariable(`color-primary-rgb`)},${opacity})`

export { ionCssVariable, ionColorPrimaryRgba }
