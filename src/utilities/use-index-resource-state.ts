import { ref } from 'vue';

export enum SelectionType {
  All = 'all',
  Page = 'page',
  Multi = 'multi',
  Single = 'single',
}
type Range = [number, number];
type ResourceIDResolver<T extends {[key: string]: unknown}> = (
  resource: T,
) => string;

function defaultResourceIDResolver(resource: {[key: string]: any}): string {
  if ('id' in resource) {
    return resource.id;
  }

  throw new Error(
    'Your resource does not directly contain an `id`. Pass a `resourceIDResolver` to `useIndexResourceState`',
  );
}

export function useIndexResourceState<T extends {[key: string]: unknown}>(
  resources: T[],
  {
    selectedResources: initSelectedResources = [],
    allResourcesSelected: initAllResourcesSelected = false,
    resourceIDResolver = defaultResourceIDResolver,
  }: {
    selectedResources?: string[];
    allResourcesSelected?: boolean;
    resourceIDResolver?: ResourceIDResolver<T>;
  } = {
    selectedResources: [],
    allResourcesSelected: false,
    resourceIDResolver: defaultResourceIDResolver,
  },
) {
  const selectedResources = ref(initSelectedResources);
  const allResourcesSelected = ref(initAllResourcesSelected);

  const handleSelectionChange =
    (
      selectionType: SelectionType,
      isSelecting: boolean,
      selection?: string | Range,
    ) => {
      if (selectionType === SelectionType.All) {
        allResourcesSelected.value = isSelecting;
      } else if (allResourcesSelected.value) {
        allResourcesSelected.value = false;
      }

      switch (selectionType) {
      case SelectionType.Single:
        selectedResources.value = isSelecting
          ? [...selectedResources.value, selection as string]
          : selectedResources.value.filter((id) => id !== selection);
        break;
      case SelectionType.All:
      case SelectionType.Page:
        selectedResources.value = isSelecting
          ? resources.map(resourceIDResolver)
          : [];
        break;
      case SelectionType.Multi:
        if (!selection) {
          break;
        }
        selectedResources.value = (() => {
          const ids: string[] = [];
          for (let i = selection[0] as number; i <= selection[1]; i++) {
            const id = resourceIDResolver(resources[i]);

            if (
              (isSelecting && !selectedResources.value.includes(id)) ||
              (!isSelecting && selectedResources.value.includes(id))
            ) {
              ids.push(id);
            }
          }

          return isSelecting
            ? [...selectedResources.value, ...ids]
            : selectedResources.value.filter((id) => !ids.includes(id));
        })();
        break;
      }
    }

  const clearSelection = () => {
    selectedResources.value = [];
    allResourcesSelected.value = false;
  };

  return {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  };
}
