export const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five'];

export function styleClass(name?: string) {
  return name
    ? STYLE_CLASSES[name.charCodeAt(0) % STYLE_CLASSES.length]
    : STYLE_CLASSES[0];
}
