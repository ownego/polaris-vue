<template lang="pug">
</template>

<script setup lang="ts">
import { unstyled } from '@/components/shared';
import { LinkLikeComponentProps, useLink } from '@/utilities/link';


// The script in the style guide that generates the Props Explorer data expects
// that the interface defining the props is defined in this file, not imported
// from elsewhere. This silly workaround ensures that the Props Explorer table
// is generated correctly.
export interface UnstyledLinkProps extends LinkLikeComponentProps {}
</script>
