import { onBeforeUnmount, onMounted } from 'vue';

/**
 * Acceptable target elements for `useEventListener`.
 */
type UseEventListenerTarget =
  | Window
  | Document
  | HTMLElement

/**
 * Extracts the target element from a React `RefObject` or returns the input element.
 */
type ExtractTargetElement<Target> = Target extends Element
  ? Element
  : Target;

/**
 * Extracts a (lib.dom.ts) EventMap for a given target element.
 */
type ExtractEventMap<Target> = ExtractTargetElement<Target> extends Window
  ? WindowEventMap
  : ExtractTargetElement<Target> extends Document
  ? DocumentEventMap
  : HTMLElementEventMap;

/**
 * Extracts all event names for a given target element.
 */
type ExtractEventName<Target> = keyof ExtractEventMap<
  ExtractTargetElement<Target>
>;

/**
 * Extracts the `event` object for a given event type.
 */
type ExtractEvent<
  Target,
  EventName extends ExtractEventName<Target>,
> = ExtractEventMap<ExtractTargetElement<Target>>[EventName];

/**
 * React hook encapsulating the boilerplate logic for adding and removing event listeners.
 */
export function useEventListener<
  TargetEventName extends ExtractEventName<Target>,
  TargetEvent extends ExtractEvent<Target, TargetEventName>,
  Target extends UseEventListenerTarget = Window,
>(
  eventName: TargetEventName,
  handler: (event: TargetEvent) => void,
  target?: null | Target,
  options?: AddEventListenerOptions,
): void {
  if (!(typeof eventName === 'string' && target !== null)) return;

  let targetElement: UseEventListenerTarget;

  if (typeof target === 'undefined') {
    targetElement = window;
  } else {
    targetElement = target;
  }

  const eventListener = (event: Event) =>
    handler(event as unknown as TargetEvent);


  onMounted(() => {
    targetElement.addEventListener(eventName, eventListener, options);
  });

  onBeforeUnmount(() => {
    targetElement.removeEventListener(eventName, eventListener, options);
  });
}
