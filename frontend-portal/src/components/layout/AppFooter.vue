<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- 顶部 CTA -->
      <div class="footer-cta">
        <div class="cta-content">
          <h2>准备好开启数字化之旅了吗？</h2>
          <p>与我们的专家团队交流，获取专属解决方案</p>
        </div>
        <el-button class="cta-btn" size="large" round @click="router.push('/contact')">
          立即咨询
          <el-icon><Right /></el-icon>
        </el-button>
      </div>

      <!-- 主要内容 -->
      <div class="footer-main">
        <div class="footer-brand">
          <div class="brand-logo">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#footer-logo)"/>
              <path d="M10 16L14 12L18 16L22 12" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M10 20L14 16L18 20L22 16" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
              <defs>
                <linearGradient id="footer-logo" x1="0" y1="0" x2="32" y2="32">
                  <stop stop-color="#6366f1"/>
                  <stop offset="1" stop-color="#a855f7"/>
                </linearGradient>
              </defs>
            </svg>
            <span>Portal</span>
          </div>
          <p class="brand-desc">
            专注于企业数字化转型，提供全方位的技术解决方案，助力企业实现智能化升级。
          </p>
          <div class="social-links">
            <a
              v-for="social in siteConfig.socials"
              :key="social.name"
              href="#"
              class="social-link"
              :aria-label="social.name"
              :title="social.name"
              @click.prevent="handleSocialClick(social)"
            >
              <el-icon :size="20"><component :is="social.icon" /></el-icon>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div class="link-group">
            <h4>产品服务</h4>
            <router-link to="/products">企业官网</router-link>
            <router-link to="/products">电商平台</router-link>
            <router-link to="/products">移动应用</router-link>
            <router-link to="/products">数字化咨询</router-link>
          </div>

          <div class="link-group">
            <h4>关于我们</h4>
            <router-link to="/about">公司介绍</router-link>
            <router-link to="/about">发展历程</router-link>
            <router-link to="/about">团队成员</router-link>
            <router-link to="/news">新闻动态</router-link>
          </div>

          <div class="link-group">
            <h4>联系方式</h4>
            <a :href="`tel:${siteConfig.contact.phone}`">{{ siteConfig.contact.phone }}</a>
            <a :href="`mailto:${siteConfig.contact.email}`">{{ siteConfig.contact.email }}</a>
            <span>{{ siteConfig.contact.address }}</span>
            <span>{{ siteConfig.contact.workTime }}</span>
          </div>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="footer-bottom">
        <p>© {{ currentYear }} Portal. All rights reserved.</p>
        <div class="footer-legal">
          <router-link to="/privacy">隐私政策</router-link>
          <router-link to="/terms">服务条款</router-link>
          <a
            href="#"
            class="icp-link"
            title="点击查看备案说明"
            @click.prevent="showIcpInfo"
          >
            {{ siteConfig.icp.displayText }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { siteConfig, type SocialLink } from '@/config/site'
import { copyText } from '@/utils/clipboard'

const router = useRouter()
const currentYear = computed(() => new Date().getFullYear())

// 社交入口统一行为：有外链则打开；可复制（公众号）则引导复制；未开通则说明原因
const handleSocialClick = async (social: SocialLink) => {
  if (social.url) {
    window.open(social.url, '_blank', 'noopener,noreferrer')
    return
  }

  if (social.copyable) {
    const { label, value, tip } = social.copyable
    try {
      await ElMessageBox.confirm(`${tip} 账号：${value}`, label, {
        confirmButtonText: `复制${label}`,
        cancelButtonText: '关闭',
        distinguishCancelAndClose: true
      })
    } catch {
      return
    }

    const ok = await copyText(value)
    if (ok) {
      ElMessage.success(`${label}已复制：${value}`)
    } else {
      ElMessage.warning(`复制失败，请手动记录账号：${value}`)
    }
    return
  }

  ElMessageBox.alert(social.unavailableReason, social.name, {
    confirmButtonText: '我知道了'
  }).catch(() => {})
}

// 备案号尚未下发：展示办理状态与原因，并提供工信部查询入口
const showIcpInfo = () => {
  ElMessageBox.alert(
    `${siteConfig.icp.tip}<br/><br/>` +
      `<a href="${siteConfig.icp.queryUrl}" target="_blank" rel="noopener noreferrer">` +
      '前往工信部 ICP/IP 地址/域名信息备案管理系统查询 →</a>',
    '备案说明',
    {
      confirmButtonText: '我知道了',
      dangerouslyUseHTMLString: true
    }
  ).catch(() => {})
}
</script>

<style lang="scss" scoped>
.app-footer {
  background: $bg-color-dark;
  color: rgba(255, 255, 255, 0.8);
  margin-top: auto;
}

.footer-container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: $spacing-4xl $spacing-lg $spacing-xl;
}

// CTA 区域
.footer-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-xl;
  padding: $spacing-3xl;
  background: $gradient-primary;
  border-radius: $border-radius-xl;
  margin-bottom: $spacing-4xl;
  
  .cta-content {
    h2 {
      font-size: $font-size-3xl;
      color: white;
      margin-bottom: $spacing-sm;
    }
    
    p {
      font-size: $font-size-lg;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  
  .cta-btn {
    flex-shrink: 0;
    background: white;
    color: $primary-color;
    font-weight: 600;
    padding: $spacing-md $spacing-xl;
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
  }
}

// 主要内容
.footer-main {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: $spacing-4xl;
  padding-bottom: $spacing-3xl;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-brand {
  .brand-logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-lg;
    
    span {
      font-size: $font-size-xxl;
      font-weight: 700;
      color: white;
    }
  }
  
  .brand-desc {
    font-size: $font-size-md;
    line-height: $line-height-loose;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: $spacing-lg;
    max-width: 320px;
  }
}

.social-links {
  display: flex;
  gap: $spacing-sm;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: $border-radius-md;
  color: rgba(255, 255, 255, 0.8);
  transition: all $transition-fast;
  
  &:hover {
    background: $primary-color;
    color: white;
    transform: translateY(-2px);
  }
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-xl;
}

.link-group {
  h4 {
    font-size: $font-size-sm;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: $spacing-lg;
  }
  
  a, span {
    display: block;
    font-size: $font-size-sm;
    color: rgba(255, 255, 255, 0.6);
    padding: $spacing-xs 0;
    transition: color $transition-fast;
  }
  
  a:hover {
    color: white;
  }
}

// 底部版权
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: $spacing-xl;
  font-size: $font-size-sm;
  color: rgba(255, 255, 255, 0.4);
}

.footer-legal {
  display: flex;
  gap: $spacing-lg;
  
  a {
    color: rgba(255, 255, 255, 0.4);
    transition: color $transition-fast;
    
    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

@media (max-width: $breakpoint-lg) {
  .footer-cta {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-main {
    grid-template-columns: 1fr;
    gap: $spacing-xl;
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: $breakpoint-md) {
  .footer-links {
    grid-template-columns: 1fr;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: $spacing-md;
    text-align: center;
  }
}
</style>
