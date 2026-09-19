<template>
  <div class="legal-page">
    <header class="legal-hero">
      <div class="hero-content">
        <h1>{{ doc.title }}</h1>
        <p class="updated">最近更新：{{ doc.updatedAt }}</p>
      </div>
    </header>

    <div class="legal-container">
      <div class="back-nav">
        <el-button text @click="router.back()">
          <el-icon><ArrowLeft /></el-icon> 返回上页
        </el-button>
      </div>

      <article class="legal-article">
        <p class="legal-intro">{{ doc.intro }}</p>

        <section v-for="section in doc.sections" :key="section.heading" class="legal-section">
          <h2>{{ section.heading }}</h2>
          <p v-for="(text, i) in section.paragraphs" :key="i">{{ text }}</p>
        </section>
      </article>

      <footer class="legal-footer">
        <p>相关文档：</p>
        <router-link v-if="doc.key === 'privacy'" to="/terms">服务条款</router-link>
        <router-link v-else to="/privacy">隐私政策</router-link>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { legalDocuments } from '@/config/legal'

const route = useRoute()
const router = useRouter()

const doc = computed(() => {
  const key = route.meta.legalKey as string
  return legalDocuments.find(item => item.key === key) ?? legalDocuments[0]
})
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

  h1 {
    font-size: $font-size-3xl;
    color: white;
    margin-bottom: $spacing-sm;
  }

  .updated {
    font-size: $font-size-sm;
    color: rgba(255, 255, 255, 0.6);
  }
}

.legal-container {
  max-width: 820px;
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

.legal-article {
  background: white;
  border-radius: $border-radius-xl;
  padding: $spacing-3xl;
  box-shadow: $shadow-md;
}

.legal-intro {
  font-size: $font-size-md;
  color: $text-color-regular;
  line-height: $line-height-loose;
  margin-bottom: $spacing-xl;
  padding-bottom: $spacing-lg;
  border-bottom: 1px solid $border-color-light;
}

.legal-section {
  margin-bottom: $spacing-xl;

  h2 {
    font-size: $font-size-lg;
    color: $text-color-primary;
    margin-bottom: $spacing-md;
  }

  p {
    font-size: $font-size-md;
    color: $text-color-regular;
    line-height: 1.9;
    margin-bottom: $spacing-md;
  }
}

.legal-footer {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  margin-top: $spacing-xl;
  font-size: $font-size-sm;
  color: $text-color-secondary;

  a {
    color: $primary-color;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .legal-article {
    padding: $spacing-xl;
  }
}
</style>
