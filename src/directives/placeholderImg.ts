import AppConfig from '@/config/app.config'

export default {
  mounted(el: HTMLImageElement) {
    // 先设置占位图
    el.src = AppConfig.placeholderImgSrc

    const src = el.dataset.src

    // 1. 验证src是否有效
    if (!src || typeof src !== 'string' || src.trim() === '') {
      console.warn('Invalid image src:', src)
      return
    }

    const image = new Image()

    // 2. 设置超时处理
    const loadTimeout = setTimeout(() => {
      handleError(new Error('Image load timeout'))
      cleanup()
    }, 10000) // 10秒超时

    // 3. 统一清理函数
    const cleanup = () => {
      clearTimeout(loadTimeout)
      image.onload = null
      image.onerror = null
    }

    // 4. 错误处理函数
    const handleError = (err: unknown) => {
      console.error('Image load failed:', err, 'src:', src)
      el.src = '/avatar.png' // 回退到默认头像
    }

    image.onload = () => {
      cleanup()
      // 5. 验证图片是否有效
      if (image.naturalWidth === 0 || image.naturalHeight === 0) {
        handleError(new Error('Invalid image dimensions'))
        return
      }

      // 6. 确保元素仍在DOM中
      if (document.body.contains(el)) {
        el.src = src
      }
    }

    image.onerror = (err) => {
      cleanup()
      handleError(err)
    }

    // 7. 开始加载（放在最后确保事件监听器已设置）
    image.src = src
  },

  // 8. 添加卸载处理
  unmounted(el: HTMLImageElement) {
    el.src = '' // 清除可能正在进行的加载
  },
}

// import AppConfig from '@/config/app.config'

// export default {
//   mounted(el: HTMLImageElement) {
//     // el.addEventListener("load")
//     el.src = AppConfig.placeholderImgSrc
//     const src = el.dataset.src as string
//     const image = new Image()
//     image.onload = () => {
//       el.src = src
//     }
//     // image.onerror = (err) => {
//     //   console.log(err)

//     //   el.src = '/avatar.png'
//     // }
//     image.src = src
//   },
// }
