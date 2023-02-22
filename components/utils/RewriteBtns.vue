<template>
  <n-button-group class="tw-grid tw-grid-cols-2 tw-gap-4">
    <n-button
      disabled
      text
      class="tw-text-3xl"
    >
      <n-icon>
        <arrow-reply-20-filled color="#ffffff" />
      </n-icon>
    </n-button>

    <n-button
      disabled
      text
      class="tw-text-3xl"
    >
      <n-icon>
        <arrow-forward-20-filled color="#ffffff" />
      </n-icon>
    </n-button>
  </n-button-group>
</template>

<script setup lang="ts">
import { NButton, NButtonGroup, NIcon } from 'naive-ui';
import { ArrowReply20Filled, ArrowForward20Filled } from '@vicons/fluent';
</script>
