import { Ref, ref } from 'vue';
import { SelectionType, type Range } from '@/components/IndexProvider/types';

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
  resources: Ref<T[]>,
  {
    selectedResources: initSelectedResources = [],
    allResourcesSelected: initAllResourcesSelected = false,
    resourceIDResolver = defaultResourceIDResolver,
    resourceFilter = undefined,
  }: {
    selectedResources?: string[];
    allResourcesSelected?: boolean;
    resourceIDResolver?: ResourceIDResolver<T>;
    resourceFilter?: (value: T, index: number) => boolean;
  } = {
    selectedResources: [],
    allResourcesSelected: false,
    resourceIDResolver: defaultResourceIDResolver,
    resourceFilter: undefined,
  },
) {
  const tmpSelectedResources = ref(initSelectedResources);
  const tmpAllResourcesSelected = ref(initAllResourcesSelected);

  const handleSelectionChange = (
    selectionType: SelectionType,
    isSelecting: boolean,
    selection?: string | Range,
    // This is not used in the function, but needed to keep the type compatible with IndexProviderProps onSelectionChange
    _position?: number,
  ) => {
    if (selectionType === SelectionType.All) {
      tmpAllResourcesSelected.value = isSelecting;
    } else if (tmpAllResourcesSelected.value) {
      tmpAllResourcesSelected.value = false;
    }

    switch (selectionType) {
      case SelectionType.Single:
        tmpSelectedResources.value = isSelecting
            ? [...tmpSelectedResources.value, selection as string]
            : tmpSelectedResources.value.filter((id) => id !== selection);
        break;
      case SelectionType.All:
      case SelectionType.Page:
        if (resourceFilter) {
          const filteredResources = resources.value.filter(resourceFilter);
          tmpSelectedResources.value = isSelecting && tmpSelectedResources.value.length < filteredResources.length
            ? filteredResources.map(resourceIDResolver)
            : [];
        } else {
          tmpSelectedResources.value = isSelecting ? resources.value.map(resourceIDResolver) : [];
        }

        break;
      case SelectionType.Multi:
        if (!selection) break;

        tmpSelectedResources.value = (() => {
          const ids: string[] = [];
          const filteredResources = resourceFilter
            ? resources.value.filter(resourceFilter)
            : resources.value;
          for (
            let i = selection[0] as number;
            i <= (selection[1] as number);
            i++
          ) {
            if (filteredResources.includes(resources.value[i])) {
              const id = resourceIDResolver(resources.value[i]);

              if (
                (isSelecting && !tmpSelectedResources.value.includes(id)) ||
                (!isSelecting && tmpSelectedResources.value.includes(id))
              ) {
                ids.push(id);
              }
            }
          }

          return isSelecting
            ? [...tmpSelectedResources.value, ...ids]
            : tmpSelectedResources.value.filter((id) => !ids.includes(id));
        })();

        break;
      case SelectionType.Range:
        if (!selection) break;

        tmpSelectedResources.value = (() => {
          const filteredResources = resourceFilter
            ? resources.value.filter(resourceFilter)
            : resources.value;

          const resourceIds = filteredResources.map(resourceIDResolver);

          const selectedIds = resourceIds.slice(
            Number(selection[0]),
            Number(selection[1]) + 1,
          );

          const isIndeterminate = selectedIds.some((id) => {
            return tmpSelectedResources.value.includes(id);
          });

          const isChecked = selectedIds.every((id) => {
            return tmpSelectedResources.value.includes(id);
          });

          const isSelectingAllInRange =
            !isChecked && (isSelecting || isIndeterminate);

          const nextSelectedResources = isSelectingAllInRange
            ? [
                ...new Set([
                  ...tmpSelectedResources.value,
                  ...selectedIds,
                ]).values(),
              ]
            : tmpSelectedResources.value.filter(
                (id) => !selectedIds.includes(id),
              );

          return nextSelectedResources;
        })();
        break;
    }
  };

  const clearSelection = () => {
    tmpSelectedResources.value = [];
    tmpAllResourcesSelected.value = false;
  };

  const removeSelectedResources = (removeResources: string[]) => {
    const selectedResourcesCopy = [...tmpSelectedResources.value];

    const newSelectedResources = selectedResourcesCopy.filter(
      (resource) => !removeResources.includes(resource),
    );

    tmpSelectedResources.value = newSelectedResources;

    if (newSelectedResources.length === 0) {
      tmpAllResourcesSelected.value = false;
    }
  };

  return {
    selectedResources: tmpSelectedResources,
    allResourcesSelected: tmpAllResourcesSelected,
    handleSelectionChange,
    clearSelection,
    removeSelectedResources,
  };
}
