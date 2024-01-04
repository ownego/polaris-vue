import type { VNodeArrayChildren } from 'vue';

export function isFragment(item : any) {
  return item.type.toString() === 'Symbol(Fragment)' || item.type.toString() === 'Symbol()';
}

// input: Fragment element
// output: array of pure children elements
export function extractElement(elm: any) {
  if (!isFragment(elm)) {
    return [elm];
  }

  const children = elm.children as VNodeArrayChildren;
  const items: VNodeArrayChildren = [];
  for (const child of children) {
    if (isFragment(child)) {
      items.push(...extractElement(child));
    } else {
      items.push(child);
    }
  }
  return items;
}
