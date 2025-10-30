<script setup lang='ts'>
import ToggleDark from '@/components/ToggleDark/ToggleDark.vue'
import { useRouter } from 'vue-router';
import { useVisible } from '@/composables/useVisible';
import type { ChildTopBarProps } from '../Debate';
import { computed } from 'vue';
const router = useRouter();
const returnHome = () => {
  router.push({ name: 'home' })
}

const props = defineProps<ChildTopBarProps>()

const { visible, openModal, closeModal } = useVisible()

const difficultyMap = computed(() => {
  const map = {
    '简单': "easy",
    '中等': "medium",
    '困难': "hard",
  }
  return map[props.difficulty as keyof typeof map]
})

</script>




<template>
  <div class="top-bar-phone-container">
    <!-- 顶部栏主体 -->
    <div class="top-bar-main">
      <div class="top-bar-left">
        <icon-menu-unfold :size="30" @click="openModal" class="component-icon" />
        <!-- <icon-menu-unfold :size="24" class="menu-icon" @click="openModal" /> -->
      </div>

      <div class="top-bar-center">
        <div class="debate-title">
          <h2>{{ props.title }}</h2>
        </div>
      </div>

      <div class="top-bar-right">
        <div class="debate-info">
          <div class="info-item">
            <span class="label">难度</span>
            <span class="value stage">{{ props.difficulty }}</span>
          </div>
          <div class="info-item">
            <span class="label">环节</span>
            <span class="value stage">{{ props.currentStage }}/{{ props.totalStage }}</span>
          </div>
          <div class="info-item">
            <span class="label">倒计时</span>
            <template v-if="props.isTimeout">
              <span class="value countdown error">
                已超时
              </span>
            </template>
            <template v-else>
              <span class="value countdown" :class="{ 'warning': props.countDown <= 10 }">
                {{ props.countDown }}s
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 侧边抽屉 -->
    <a-drawer :width="320" :footer="false" :mask-closable="true" :visible="visible" placement="left"
      class="custom-drawer" @cancel="closeModal">

      <template #title>
        <div class="drawer-title">
          <!-- <icon-debate :size="20" /> -->
          <span>辩论控制台</span>
        </div>
      </template>

      <div class="drawer-content">
        <!-- 用户操作区域 -->
        <div class="action-section">
          <h3 class="section-title">
            <!-- <icon-operation :size="16" /> -->
            操作菜单
          </h3>
          <div class="action-grid">
            <button class="action-card" @click="returnHome">
              <div class="action-icon">
                <!-- <icon-home :size="24" /> -->
                <icon-import :size="20" class="component-icon" />
              </div>
              <span class="action-text">返回首页</span>
            </button>

            <button class="action-card">
              <div class="action-icon">
                <toggle-dark trigger="click" />
              </div>
              <span class="action-text">切换主题</span>
            </button>
          </div>
        </div>

        <!-- 辩论信息区域 -->
        <div class="info-section">
          <h3 class="section-title">
            <!-- <icon-info :size="16" /> -->
            辩论信息
          </h3>
          <div class="info-cards">
            <div class="info-card">
              <div class="info-header">
                <!-- <icon-topic :size="14" /> -->
                <span>辩题</span>
              </div>
              <p class="info-content">{{ props.title }}</p>
            </div>

            <div class="info-card">
              <div class="info-header">
                <!-- <icon-team :size="14" /> -->
                <span>我的立场</span>
              </div>
              <div class="stance-info">
                <span class="stance-badge" :class="props.userSide">
                  {{ props.userSide === 'positive' ? '正方' : '反方' }}
                </span>
              </div>
            </div>

            <div class="info-card">
              <div class="info-header">
                <!-- <icon-difficulty :size="14" /> -->
                <span>难度</span>
              </div>
              <div class="difficulty-badge" :class="difficultyMap">
                {{ props.difficulty }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<style scoped lang="scss">
.component-icon {
  color: var(--color-text-secondary);
}

.top-bar-phone-container {
  display: none;
  background: var(--theme-background);
  border-bottom: 1px solid var(--color-border-light);
  box-shadow: 0 2px 8px var(--theme-shadow);
  position: relative;
  z-index: 1000;

}

.top-bar-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 20px;
  gap: 16px;
  max-width: 100%;
}

.top-bar-left {
  flex-shrink: 0;

  .menu-icon {
    color: var(--theme-primary);
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: var(--theme-primary-light);
      transform: scale(1.1);
    }
  }
}

.top-bar-center {
  flex: 1;
  min-width: 0;
  max-width: 50vw;

  .debate-title {
    display: flex;
    align-items: center;
    gap: 12px;

    h2 {
      margin: 0;
      color: var(--theme-text-primary);
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .debate-tag {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;

      &.easy {
        background: var(--theme-success-light);
        color: var(--theme-success);
      }

      &.medium {
        background: var(--theme-warning-light);
        color: var(--theme-warning);
      }

      &.hard {
        background: var(--theme-error-light);
        color: var(--theme-error);
      }
    }
  }
}

.top-bar-right {
  flex-shrink: 0;

  .debate-info {
    display: flex;
    gap: 20px;

    .info-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      .label {
        font-size: 12px;
        color: var(--theme-text-secondary);
      }

      .value {
        font-size: 14px;
        font-weight: 600;

        &.stage {
          color: var(--theme-primary);
        }

        &.countdown {
          color: var(--theme-success);

          &.warning {
            color: var(--theme-error);
            animation: pulse 1s infinite;
          }

          &.error {
            color: var(--theme-error);
          }
        }
      }
    }
  }
}

/* 抽屉样式 */
.custom-drawer {
  :deep(.arco-drawer-header) {
    border-bottom: 1px solid var(--color-border-light);
    padding: 20px 24px;

    .drawer-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--theme-text-primary);
      font-weight: 600;
    }
  }

  :deep(.arco-drawer-body) {
    padding: 0;
  }
}

.drawer-content {
  padding: 0 24px 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px 0 16px 0;
  color: var(--theme-text-primary);
  font-size: 16px;
  font-weight: 600;
}

/* 操作区域 */
.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  // background: var(--theme-background-light);
  border: 1px solid var(--color-border-base);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--color-text-primary);

  &:hover {
    border-color: var(--theme-primary);
    transform: translateY(-2px);
  }

  .action-icon {
    width: 48px;
    height: 48px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // background: var(--theme-background);
    border-radius: 8px;
  }

  .action-text {
    font-size: 14px;
    // color: var(--theme-text-primary);
    font-weight: 500;
  }
}

/* 信息卡片 */
.info-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-card {
  // background: var(--theme-background-light);
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  padding: 16px;

  .info-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    font-size: 14px;
    color: var(--theme-text-secondary);
  }

  .info-content {
    margin: 0;
    color: var(--color-text-primary);
    font-weight: 500;
    line-height: 1.4;
  }

  .stance-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stance-badge {
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;

    &.positive {
      background: var(--theme-primary-light);
      color: var(--theme-primary);
    }

    &.negative {
      background: var(--theme-error-light);
      color: var(--theme-error);
    }
  }

  .role-text {
    font-size: 14px;
    color: var(--theme-text-secondary);
  }

  .difficulty-badge {
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    display: inline-block;

    &.easy {
      background: var(--theme-success-light);
      color: var(--theme-success);
    }

    &.medium {
      background: var(--theme-warning-light);
      color: var(--theme-warning);
    }

    &.hard {
      background: var(--theme-error-light);
      color: var(--theme-error);
    }
  }
}

/* 动画 */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }
}
</style>