import QRCode from 'qrcode'
import { onMounted, ref } from 'vue'

export const useQrcode = (text?: string) => {
  const QRcodeText = ref(text || location.href)
  const QRcodeUrl = ref('')

  const generateQRcode = async () => {
    try {
      QRcodeUrl.value = await QRCode.toDataURL(QRcodeText.value)
    } catch {
      throw new Error('生成二维码失败')
    }
  }

  onMounted(() => {
    generateQRcode()
  })

  return {
    QRcodeUrl,
    generateQRcode,
  }
}
