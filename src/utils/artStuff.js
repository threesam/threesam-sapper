export function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export function getHeaderHeight() {
  return getComputedStyle(document.body).getPropertyValue('--headerHeight')[1]
}

export function getHeaderHeightPixels() {
  return convertRemToPixels(getStyle('--headerHeight')[1])
}

export function getStyle(property) {
  return getComputedStyle(document.body).getPropertyValue(property)
}