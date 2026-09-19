<template>
  <div class="legal-page">
    <header class="legal-hero">
      <div class="hero-content">
        <span class="hero-badge">法律信息</span>
        <h1>{{ document.title }}</h1>
        <p class="effective-date">生效日期：{{ document.effectiveDate }}</p>
      </div>
    </header>

    <div class="legal-container">
      <div class="back-nav">
        <el-button text @click="router.back()">
          <el-icon><ArrowLeft /></el-icon> 返回上页
        </el-button>
      </div>

      <article class="legal-card">
        <p class="legal-intro">{{ document.intro }}</p>

        <section v-for="(section, index) in document.sections" :key="index" class="legal-section">
          <h2>{{ section.heading }}</h2>
          <p v-for="(text, pIndex) in section.paragraphs" :key="pIndex">{{ text }}</p>
          <ul v-if="section.items?.length">
            <li v-for="(item, iIndex) in section.items" :key="iIndex">{{ item }}</li>
          </ul>
        </section>

        <footer class="legal-footer">
          <p>如本文档内容与正式签署的合同存在冲突，以双方书面合同为准。</p>
        </footer>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { LegalDocument } from '@/config/legal'

defineProps<{
  document: LegalDocument
}>()

const router = useRouter()
</script>

<style lang="scss" scoped>
.legal-page {
  padding-top: $header-height;
  background: $bg-color-light;
  min-height: 100vh;
}

.legal-hero {
  background: $bg-color-dark;
  padding: $spacing-3xl $spacing-lg;
  text-align: center;

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-badge {
    display: inline-block;
    padding: $spacing-xs $spacing-md;
    background: rgba($primary-color, 0.2);
    color: $primary-color-light;
    font-size: $font-size-sm;
    font-weight: 600;
    border-radius: $border-radius-full;
    margin-bottom: $spacing-md;
  }

  h1 {
    font-size: $font-size-3xl;
    color: white;
    margin-bottom: $spacing-sm;
  }

  .effective-date {
    font-size: $font-size-sm;
    color: rgba(255, 255, 255, 0.6);
  }
}

.legal-container {
  max-width: 860px;
  margin: 0 auto;
  padding: $spacing-xl $spacing-lg $spacing-4xl;
}

.back-nav {
  margin-bottom: $spacing-lg;

  .el-button {
    color: $text-color-secondary;

    &:hover {
      color: $primary-color;
    }
  }
}

.legal-card {
  background: white;
  border-radius: $border-radius-xl;
  padding: $spacing-3xl;
  box-shadow: $shadow-md;
}

.legal-intro {
  font-size: $font-size-md;
  color: $text-color-regular;
  line-height: 1.9;
  padding-bottom: $spacing-lg;
  margin-bottom: $spacing-lg;
  border-bottom: 1px solid $border-color-light;
}

.legal-section {
  margin-bottom: $spacing-xl;

  h2 {
    font-size: $font-size-lg;
    color: $text-color-primary;
    margin-bottom: $spacing-md;
    padding-left: $spacing-md;
    border-left: 4px solid $primary-color;
  }

  p {
    font-size: $font-size-md;
    color: $text-color-regular;
    line-height: 1.9;
    margin-bottom: $spacing-sm;
  }

  ul {
    margin: $spacing-sm 0 $spacing-sm $spacing-lg;
    padding-left: $spacing-md;

    li {
      font-size: $font-size-md;
      color: $text-color-regular;
      line-height: 1.9;
      list-style: disc;
      margin-bottom: $spacing-xs;
    }
  }
}

.legal-footer {
  margin-top: $spacing-xxl;
  padding-top: $spacing-lg;
  border-top: 1px solid $border-color-light;

  p {
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}

@media (max-width: $breakpoint-md) {
  .legal-card {
    padding: $spacing-xl;
  }
}
</style>
