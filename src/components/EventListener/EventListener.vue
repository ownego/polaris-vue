<script lang="ts">
import {
  defineComponent, onBeforeMount, onMounted, watch,
} from 'vue';

interface BaseEventProps {
  event: string;
  capture?: boolean,
  passive?: boolean;
  handler(event: Event): void,
}

export default defineComponent({
  props: {
    event: { type: String, required: true },
    capture: { type: Boolean },
    passive: { type: Boolean },
    handler: { type: Object as () => BaseEventProps['handler'], required: true },
  },

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  },

  setup(props) {
    function attachListener() {
      const {
        event, capture, passive, handler,
      } = props;
      window.addEventListener(event, handler, { capture, passive });
    }

    function detachListener(prevProps?: BaseEventProps) {
      const { event, handler, capture } = prevProps || props;
      window.removeEventListener(event, handler, capture);
    }

    onMounted(() => attachListener());

    onBeforeMount(() => detachListener());

    watch(() => ({ ...props }), (newProps, oldProps) => {
      if (newProps !== oldProps) {
        detachListener(oldProps);
        attachListener();
      }
    });
  },
});
</script>
