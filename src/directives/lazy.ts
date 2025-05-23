// export default
import placeholder from '@/assets/placeholder.gif'
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLImageElement
      target.src = placeholder
      if (entry.isIntersecting) {
        const img = new Image()
        img.addEventListener('load', () => {
          target.src = img.src
          intersectionObserver.unobserve(entry.target)
        })
        img.src = target.dataset.src || ''
      }
    })
  },
  {
    // rootMargin是一个偏移量，当元素进入视口时，会在这个偏移量范围内触发回调函数
    rootMargin: '0px 0px 100px 0px',
  },
)

export default {
  mounted(el: HTMLImageElement) {
    intersectionObserver.observe(el)
  },
}
