import AppConfig from '@/config/app.config'

export default {
  mounted(el: HTMLImageElement) {
    // el.addEventListener("load")
    el.src = AppConfig.placeholderImgSrc
    const src = el.dataset.src as string
    const image = new Image()
    image.onload = () => {
      el.src = src
    }
    image.src = src
  },
}
