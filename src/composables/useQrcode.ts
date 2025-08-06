import QRCode from 'qrcode'
import { Message } from 'tdesign-vue-next'
import { onMounted, ref } from 'vue'

export const useQrcode = (text?: string) => {
  const QRcodeText = ref(text || location.href)
  const QRcodeUrl = ref('')

  const generateQRcode = async () => {
    try {
      QRcodeUrl.value = await QRCode.toDataURL(QRcodeText.value)
    } catch (error) {
      console.log(error, '<==qrcode error')
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
