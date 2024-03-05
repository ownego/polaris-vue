import { I as IndexFiltersMode } from "./Preview.vue_vue_type_style_index_0_lang.w_jMciSf.js";
import { h as ref } from "./framework.2IsXxFXf.js";
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
