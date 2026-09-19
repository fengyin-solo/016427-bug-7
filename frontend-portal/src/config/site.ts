// 站点级配置：联系方式、社交账号、备案等信息统一在此维护，
// 保证页脚、文章详情、团队卡片等入口在任何页面的表现一致。

export interface SocialLink {
  /** 渠道名称，用于 aria-label 与提示文案 */
  name: string
  /** 图标组件名（全局注册的 Element Plus 图标） */
  icon: string
  /** 可访问的外链地址；为空表示该渠道暂未开通 */
  url?: string
  /** 暂未开通时向用户说明的原因 */
  unavailableReason: string
  /** 微信类渠道：点击后可复制的账号（账号公布后即可使用） */
  copyable?: {
    label: string
    value: string
    tip: string
  }
}

export const siteConfig = {
  name: 'Portal',
  contact: {
    phone: '400-888-8888',
    email: 'hello@portal.com',
    address: '北京市朝阳区科技园区',
    workTime: '工作日 9:00-18:00'
  },
  socials: [
    {
      name: '微信公众号',
      icon: 'ChatDotRound',
      // 公众号暂无网页版主页，通过复制账号关注
      copyable: {
        label: '微信公众号',
        value: 'Portal-Official',
        tip: '微信公众号尚未完成认证，暂无法扫码关注；可先复制账号，认证完成后即可搜索关注。'
      },
      unavailableReason: '微信公众号尚未完成认证，暂无法直接关注。'
    },
    {
      name: '微博',
      icon: 'Share',
      // 官方微博尚未开通
      unavailableReason: '官方微博尚未开通，关注渠道开通后会在此更新。'
    },
    {
      name: 'GitHub',
      icon: 'Link',
      // 开源组织尚未公开
      unavailableReason: '开源组织主页尚未公开，代码仓库整理完成后会在此放出链接。'
    }
  ] as SocialLink[],
  icp: {
    // 网站仍处于备案审核阶段，暂未取得备案号
    number: '',
    displayText: '网站备案办理中',
    queryUrl: 'https://beian.miit.gov.cn/',
    tip: '网站目前正在向工信部提交 ICP 备案申请，尚未取得正式备案号。备案通过后会在此展示备案号并链接至工信部备案查询平台。'
  },
  legal: {
    updatedAt: '2024-03-15'
  }
}

export type SiteConfig = typeof siteConfig
