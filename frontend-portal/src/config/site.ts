// 站点级配置：联系方式、社交入口、备案信息等
// 统一在此维护，确保各页面同一入口的行为保持一致

export interface SocialLink {
  /** 渠道标识，用于图标与无障碍标签 */
  key: 'wechat' | 'weibo' | 'github'
  label: string
  /** 已开通时的外部地址；未开通时为 null，点击会给出具体原因 */
  url: string | null
  /** 未开通或暂不可用时，向用户说明的具体原因 */
  unavailableReason: string
}

export const siteConfig = {
  name: 'Portal',
  contact: {
    phone: '400-888-8888',
    email: 'hello@portal.com',
    address: '北京市朝阳区科技园区',
    workTime: '工作日 9:00-18:00'
  },
  social: [
    {
      key: 'wechat',
      label: '微信公众号',
      url: null,
      unavailableReason: '微信公众号尚未开通，您可拨打 400-888-8888 或发送邮件至 hello@portal.com 与我们联系'
    },
    {
      key: 'weibo',
      label: '官方微博',
      url: null,
      unavailableReason: '官方微博暂未开通，最新动态请关注本站「新闻动态」栏目，或通过邮件 hello@portal.com 咨询'
    },
    {
      key: 'github',
      label: 'GitHub',
      url: null,
      unavailableReason: '暂未开设公开的 GitHub 组织主页，技术相关问题欢迎通过邮件 hello@portal.com 交流'
    }
  ] as SocialLink[],
  /** ICP 备案号：点击跳转工信部备案查询系统（本站为演示项目，备案号为占位信息） */
  icp: {
    text: '京ICP备xxxxxxxx号',
    queryUrl: 'https://beian.miit.gov.cn/'
  }
}
