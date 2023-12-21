/**
 * Allowed variables in HTML5 history state. Note that pushState clones the state
 * passed and does not accept everything: e.g.: it doesn't accept symbols, nor
 * functions as values. It also ignores Symbols as keys.
 */
type HistoryStateValue = string | number | boolean | null | undefined | HistoryState | HistoryStateArray;

interface HistoryState {
  [x: number]: HistoryStateValue;
  [x: string]: HistoryStateValue;
}

interface HistoryStateArray extends Array<HistoryStateValue> {
}

type LocationQueryRaw = Record<string | number, LocationQueryValueRaw | LocationQueryValueRaw[]>;

type LocationQueryValue = string | null;

type LocationQueryValueRaw = LocationQueryValue | number | undefined;

interface LocationAsRelativeRaw {
  name?: RouteRecordName;
  params?: RouteParamsRaw;
}

type RouteParamValue = string;

type RouteParamValueRaw = RouteParamValue | number | null | undefined;

type RouteParamsRaw = Record<string, RouteParamValueRaw | Exclude<RouteParamValueRaw, null | undefined>[]>;

type RouteRecordName = string | symbol;

interface RouteQueryAndHash {
  query?: LocationQueryRaw;
  hash?: string;
}

/**
 * Common options for all navigation methods.
 */
export declare interface RouteLocationOptions {
    /**
     * Replace the entry in the history instead of pushing a new entry
     */
    replace?: boolean;
    /**
     * Triggers the navigation even if the location is the same as the current one.
     * Note this will also add a new entry to the history unless `replace: true`
     * is passed.
     */
    force?: boolean;
    /**
     * State to save using the History API. This cannot contain any reactive
     * values and some primitives like Symbols are forbidden. More info at
     * https://developer.mozilla.org/en-US/docs/Web/API/History/state
     */
    state?: HistoryState;
}

/** Route Location that can infer the necessary params based on the name. */
interface RouteLocationNamedRaw extends RouteQueryAndHash, LocationAsRelativeRaw, RouteLocationOptions {
}

interface MatcherLocationAsPath {
  path: string;
}

/** Route Location that can infer the possible paths. */
interface RouteLocationPathRaw extends RouteQueryAndHash, MatcherLocationAsPath, RouteLocationOptions {}

export type RouteLocationRaw = string | RouteLocationPathRaw | RouteLocationNamedRaw;
