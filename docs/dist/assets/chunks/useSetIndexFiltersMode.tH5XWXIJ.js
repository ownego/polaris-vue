import { I as IndexFiltersMode } from "./Preview.vue_vue_type_style_index_0_lang.vIfP4F2u.js";
import { h as ref } from "./framework.1qnja6qJ.js";
function useSetIndexFiltersMode(defaultMode = IndexFiltersMode.Default) {
  const mode = ref(defaultMode);
  const setMode = (newMode) => {
    mode.value = newMode;
  };
  return { mode, setMode };
}
export {
  useSetIndexFiltersMode as u
};
