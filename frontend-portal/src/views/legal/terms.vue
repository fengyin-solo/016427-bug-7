<template>
  <LegalDocument :document="termsOfService" />
</template>

<script setup lang="ts">
import LegalDocument from '@/components/common/LegalDocument.vue'
import { termsOfService } from '@/config/legal'
</script>
