<template>
  <LegalDocument :document="privacyPolicy" />
</template>

<script setup lang="ts">
import LegalDocument from '@/components/common/LegalDocument.vue'
import { privacyPolicy } from '@/config/legal'
</script>
