import { c as SelectionType } from "./Preview.vue_vue_type_style_index_0_lang.a_K4ko6J.js";
import { h as ref } from "./framework.1qnja6qJ.js";
function defaultResourceIDResolver(resource) {
  if ("id" in resource) {
    return resource.id;
  }
  throw new Error(
    "Your resource does not directly contain an `id`. Pass a `resourceIDResolver` to `useIndexResourceState`"
  );
}
function useIndexResourceState(resources, {
  selectedResources: initSelectedResources = [],
  allResourcesSelected: initAllResourcesSelected = false,
  resourceIDResolver = defaultResourceIDResolver,
  resourceFilter = void 0
} = {
  selectedResources: [],
  allResourcesSelected: false,
  resourceIDResolver: defaultResourceIDResolver,
  resourceFilter: void 0
}) {
  const tmpSelectedResources = ref(initSelectedResources);
  const tmpAllResourcesSelected = ref(initAllResourcesSelected);
  const handleSelectionChange = (selectionType, isSelecting, selection, _position) => {
    if (selectionType === SelectionType.All) {
      tmpAllResourcesSelected.value = isSelecting;
    } else if (tmpAllResourcesSelected.value) {
      tmpAllResourcesSelected.value = false;
    }
    switch (selectionType) {
      case SelectionType.Single:
        tmpSelectedResources.value = isSelecting ? [...tmpSelectedResources.value, selection] : tmpSelectedResources.value.filter((id) => id !== selection);
        break;
      case SelectionType.All:
      case SelectionType.Page:
        if (resourceFilter) {
          const filteredResources = resources.filter(resourceFilter);
          tmpSelectedResources.value = isSelecting && tmpSelectedResources.value.length < filteredResources.length ? filteredResources.map(resourceIDResolver) : [];
        } else {
          tmpSelectedResources.value = isSelecting ? resources.map(resourceIDResolver) : [];
        }
        break;
      case SelectionType.Multi:
        if (!selection)
          break;
        tmpSelectedResources.value = (() => {
          const ids = [];
          const filteredResources = resourceFilter ? resources.filter(resourceFilter) : resources;
          for (let i = selection[0]; i <= selection[1]; i++) {
            if (filteredResources.includes(resources[i])) {
              const id = resourceIDResolver(resources[i]);
              if (isSelecting && !tmpSelectedResources.value.includes(id) || !isSelecting && tmpSelectedResources.value.includes(id)) {
                ids.push(id);
              }
            }
          }
          return isSelecting ? [...tmpSelectedResources.value, ...ids] : tmpSelectedResources.value.filter((id) => !ids.includes(id));
        })();
        break;
      case SelectionType.Range:
        if (!selection)
          break;
        tmpSelectedResources.value = (() => {
          const filteredResources = resourceFilter ? resources.filter(resourceFilter) : resources;
          const resourceIds = filteredResources.map(resourceIDResolver);
          const selectedIds = resourceIds.slice(
            Number(selection[0]),
            Number(selection[1]) + 1
          );
          const isIndeterminate = selectedIds.some((id) => {
            return tmpSelectedResources.value.includes(id);
          });
          const isChecked = selectedIds.every((id) => {
            return tmpSelectedResources.value.includes(id);
          });
          const isSelectingAllInRange = !isChecked && (isSelecting || isIndeterminate);
          const nextSelectedResources = isSelectingAllInRange ? [
            ...(/* @__PURE__ */ new Set([
              ...tmpSelectedResources.value,
              ...selectedIds
            ])).values()
          ] : tmpSelectedResources.value.filter(
            (id) => !selectedIds.includes(id)
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
  const removeSelectedResources = (removeResources) => {
    const selectedResourcesCopy = [...tmpSelectedResources.value];
    const newSelectedResources = selectedResourcesCopy.filter(
      (resource) => !removeResources.includes(resource)
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
    removeSelectedResources
  };
}
export {
  useIndexResourceState as u
};
