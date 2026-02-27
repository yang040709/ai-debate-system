<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { debounce } from '@/utils/index'
import { IconDown } from '@arco-design/web-vue/es/icon'

interface MenuItem {
  text: string
  href: string
}

const props = defineProps<{
  items: MenuItem[]
  activeIndex?: number
}>()

const emit = defineEmits(['item-click'])

const switchRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const isShrink = ref(false)
const visibleItems = ref<MenuItem[]>([])
const hiddenItems = ref<MenuItem[]>([])
const itemWidths = ref<number[]>([])
const lastCalculationTime = ref(0)

// 缓存菜单项宽度
const cacheItemWidths = () => {
  if (!switchRef.value) return

  const children = switchRef.value.children
  itemWidths.value = []

  for (let i = 0; i < children.length - 1; i++) {
    const item = children[i] as HTMLElement
    itemWidths.value.push(item.offsetWidth)
  }
}

// 优化后的布局计算
const calculateLayout = () => {
  const startTime = performance.now()

  if (!switchRef.value || !containerRef.value || itemWidths.value.length === 0) {
    return
  }

  // 计算可用空间（减去下拉菜单所需空间）
  const containerWidth = containerRef.value.offsetWidth
  const moreBtnWidth = 90 // 下拉按钮的宽度
  const availableWidth = containerWidth - moreBtnWidth - 30 // 30为安全边距

  // 重置状态
  visibleItems.value = []
  hiddenItems.value = []
  isShrink.value = false

  let totalWidth = 0
  let visibleCount = 0

  // 计算可见项
  for (let i = 0; i < props.items.length; i++) {
    const itemWidth = itemWidths.value[i]

    // 考虑项目之间的间距（25px）
    const nextWidth = totalWidth + itemWidth + (visibleCount > 0 ? 25 : 0)

    if (nextWidth <= availableWidth) {
      totalWidth = nextWidth
      visibleCount++
      visibleItems.value.push(props.items[i])
    } else {
      hiddenItems.value.push(props.items[i])
    }
  }

  // 如果有隐藏项，则显示下拉菜单
  if (hiddenItems.value.length > 0) {
    isShrink.value = true
  }

  lastCalculationTime.value = Math.round(performance.now() - startTime)
}

// 处理菜单项点击
const handleItemClick = (item: MenuItem, index: number) => {
  emit('item-click', { item, index })
}

// 使用ResizeObserver监听容器变化
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  // 初始计算
  cacheItemWidths()
  calculateLayout()

  // 使用ResizeObserver替代window.resize
  resizeObserver = new ResizeObserver(debounce(() => {
    cacheItemWidths()
    calculateLayout()
  }, 100))

  if (containerRef.value) {
    resizeObserver.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

// 监听items变化
watchEffect(() => {
  // 等待DOM更新后重新计算
  setTimeout(() => {
    cacheItemWidths()
    calculateLayout()
  }, 50)
})
</script>

<template>
  <div class="switch-container" ref="containerRef">
    <ul ref="switchRef">
      <li v-for="(item, index) in visibleItems" :key="item.href" :class="{ active: activeIndex === index }"
        @click="handleItemClick(item, index)">
        {{ item.text }}
      </li>

      <a-dropdown v-if="isShrink" trigger="hover" position="bottom" class="more-dropdown">
        <li class="switch-more">
          <span>...</span>
          <icon-down />
        </li>
        <template #content>
          <a-doption v-for="(item, index) in hiddenItems" :key="item.href"
            @click="handleItemClick(item, visibleItems.length + index)">
            {{ item.text }}
          </a-doption>
        </template>
      </a-dropdown>
    </ul>

    <!-- <div class="performance-info" v-if="process.env.NODE_ENV === 'development'">
      计算耗时: {{ lastCalculationTime }}ms | 
      显示: {{ visibleItems.length }} | 
      隐藏: {{ hiddenItems.length }}
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.switch-container {
  position: relative;
  background: var(--header-bg);
  border-bottom: 1px solid var(--color-border-light);
  padding: 0 20px;

  ul {
    display: flex;
    gap: 25px;
    height: $switch-height;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }

  li {
    line-height: 30px;
    font-size: 16px;
    padding: 0 15px;
    cursor: pointer;
    color: var(--color-text-secondary);
    flex: 0 0 auto;
    white-space: nowrap;
    transition: all 0.3s ease;
    border-radius: 30px;

    &:hover:not(.active) {
      background: rgba(22, 93, 255, 0.1);
      color: var(--theme-blue-1);
    }

    &.active {
      background: var(--theme-blue-1);
      color: #fff;
      font-weight: 500;
      box-shadow: 0 4px 8px rgba(22, 93, 255, 0.2);
    }

    &.switch-more {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: var(--header-bg);
      padding: 0 15px;
      position: relative;
      z-index: 2;
      cursor: pointer;

      &:hover {
        color: var(--theme-blue-1);
      }
    }
  }

  .more-dropdown {
    margin-left: auto;
  }

  .performance-info {
    position: absolute;
    bottom: 2px;
    right: 20px;
    font-size: 10px;
    color: #999;
    background: rgba(255, 255, 255, 0.8);
    padding: 2px 6px;
    border-radius: 4px;
    z-index: 10;
  }
}

@media (max-width: 768px) {
  .switch-container {
    padding: 0 10px;

    ul {
      gap: 15px;
    }

    li {
      padding: 0 10px;
      font-size: 14px;
    }
  }
}
</style>