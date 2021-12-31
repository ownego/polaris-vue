export function attachListener(eventName: string, handler: (event: Event) => void): void {
  window.addEventListener(eventName, handler);
}

export function detachListener(eventName: string, handler: (event: Event) => void): void {
  window.removeEventListener(eventName, handler);
}
