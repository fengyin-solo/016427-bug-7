import { ElMessage } from 'element-plus'

/**
 * 统一的“入口暂不可用”反馈。
 *
 * 全站所有无法打开实际内容的入口都走这里，避免各处使用
 * 千篇一律的“功能开发中”。调用方必须给出与该入口相关的
 * 具体原因，保证同一入口在任何页面的表现一致。
 *
 * @param reason 该入口不可用的具体原因及可行的替代路径
 */
export const notifyUnavailable = (reason: string) => {
  ElMessage({
    type: 'warning',
    message: reason,
    duration: 4000,
    showClose: true
  })
}

/**
 * 复制文本到剪贴板，带降级方案（非安全上下文 / 旧浏览器）。
 * 成功或失败均给出明确反馈，而不是静默无效。
 */
export const copyText = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(textarea)
      if (!ok) throw new Error('execCommand copy failed')
    }
    ElMessage.success('链接已复制，快去分享吧')
    return true
  } catch {
    ElMessage.error('复制失败，请手动复制浏览器地址栏中的链接')
    return false
  }
}
