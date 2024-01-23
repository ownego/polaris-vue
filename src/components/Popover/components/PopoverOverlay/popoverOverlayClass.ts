import { computed } from 'vue';
import styles from '@polaris/components/Popover/Popover.module.scss';
import { classNames } from '@/utilities/css';
import { overlayDetails, props } from './PopoverOverlay.vue';

export const popoverOverlayClass = computed(() => {
return classNames(
styles.Popover,
overlayDetails.value.positioning === 'above' && styles.positionedAbove,
props.fullWidth && styles.fullWidth,
overlayDetails.value.measuring && styles.measuring,
props.hideOnPrint && styles['PopoverOverlay-hideOnPrint']
);
});
