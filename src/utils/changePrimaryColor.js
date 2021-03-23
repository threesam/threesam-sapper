export function changePrimaryColor(node, color) {
  document.documentElement.style.cssText = `--primary: ${color}`
}