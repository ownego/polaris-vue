type Falsy = boolean | undefined | null | 0;

export function classNames(...classes: (string | Falsy)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function variationName(name: string, value: string): string {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
