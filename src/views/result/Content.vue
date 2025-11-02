<script setup lang='ts'>
import { computed, useTemplateRef } from 'vue'
import type { DebateHistory } from '@/types/history'
import { POSITION_MAP, DIFFICULTY_MAP } from '@/constant/debate';
import { useUserStore } from '@/stores/user';
import dayjs from 'dayjs'


interface Props {
  data: DebateHistory
}
const props = defineProps<Props>()
const userStore = useUserStore()
const positionLabel = computed(() => {
  return POSITION_MAP[props.data.info.position]
})
const difficultyLabel = computed(() => {
  return DIFFICULTY_MAP[props.data.info.difficulty]
})


const dateTime = computed(() => {
  return dayjs(props.data.info.created_at).format('YYYY-MM-DD HH:mm:ss')
})

const score = computed(() => {
  return props.data.result.info.comprehensiveScore / 100
})

// console.log(s);


const contentRef = useTemplateRef("content")

defineExpose({
  contentRef
})

</script>

<template>
  <div class='content-container' ref="content">
    <!-- 头部区域 -->
    <header class="header">
      <div class="header-content">
        <div class="header-main fade-in" style="animation-delay: 0.2s">
          <div class="status-badge">
            <span class="status-dot"></span>
            辩论完成
          </div>
          <h1 class="title">{{ data.info.topic.title }}</h1>
          <p class="subtitle">{{ data.info.topic.desc }}</p>

          <div class="meta-info">
            <div class="meta-item">
              <svg class="meta-icon" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
                </path>
              </svg>
              <span>{{ userStore.userInfo.nickname }}</span>
            </div>
            <div class="meta-item">
              <svg class="meta-icon" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"></path>
              </svg>
              <span>{{ dateTime }}</span>
            </div>
            <div class="meta-item">
              <svg class="meta-icon" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"></path>
              </svg>
              <span>{{ difficultyLabel }}</span>
            </div>
          </div>
        </div>

        <!-- 立场标识 -->
        <div class="position-card fade-in" style="animation-delay: 0.4s">
          <div class="position-content">
            <div class="position-label">您的立场</div>
            <div class="position-value">{{ positionLabel }}</div>
            <!-- <div class="position-desc">(反对四天工作制全面推行)</div> -->
          </div>
        </div>
      </div>
    </header>

    <!-- 结果概览 -->
    <section class="overview-section">
      <div class="container">
        <div class="overview-card slide-up">
          <h2 class="section-title">
            <svg class="section-icon" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"></path>
            </svg>
            辩论结果概览
          </h2>

          <div class="overview-grid">
            <!-- 胜负结果 -->
            <div class="result-card win-card">
              <div class="result-value">{{ data.result.info.isWin ? '胜利' : '失败' }}</div>
              <div class="result-label">成功战胜{{ difficultyLabel }}难度下的AI辩手</div>
            </div>

            <!-- 综合得分 -->
            <div class="score-container">
              <div class="score-ring-wrapper">
                <svg class="score-ring-svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" class="score-ring-bg"></circle>
                  <circle cx="50" cy="50" r="45" class="score-ring-fill" :style="{ '--score-percent': score }">
                  </circle>
                </svg>
                <div class="score-text">
                  <span class="score-value">{{ data.result.info.comprehensiveScore }}</span>
                  <span class="score-label">综合得分</span>
                </div>
              </div>
            </div>

            <!-- 数据统计
              <div class="stats-card">
                <div class="stats-list">
                  <div class="stat-item">
                    <span class="stat-label">参与人数</span>
                    <span class="stat-value">250人</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">评论数量</span>
                    <span class="stat-value">320条</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">胜率预测</span>
                    <span class="stat-value win-rate">80%</span>
                  </div>
                </div>
              </div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- 亮点与改进点 -->
    <section class="details-section">
      <div class="container">
        <div class="details-grid stagger-animation">
          <!-- 亮点 -->
          <div class="detail-card">
            <h2 class="section-title">
              <svg class="section-icon highlight-icon" viewBox="0 0 20 20">
                <path
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z">
                </path>
              </svg>
              辩论亮点
            </h2>

            <div class="points-list">
              <div class="point-item highlight-item" v-for="item in data.result.highlights" :key="item.title">
                <svg class="point-icon" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                <div class="point-content">
                  <h3 class="point-title">{{ item.title }}</h3>
                  <p class="point-desc">{{ item.desc }}</p>
                </div>
              </div>

            </div>
          </div>

          <!-- 改进点 -->
          <div class="detail-card">
            <h2 class="section-title">
              <svg class="section-icon improvement-icon" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"></path>
              </svg>
              改进建议
            </h2>

            <div class="points-list">
              <div class="point-item improvement-item" v-for="item in data.result.improvementPoints" :key="item.title">
                <svg class="point-icon" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"></path>
                </svg>
                <div class="point-content">
                  <h3 class="point-title">{{ item.title }}</h3>
                  <p class="point-desc">{{ item.desc }}</p>
                </div>
              </div>


            </div>
          </div>
        </div>

        <!-- AI教练评论 -->
        <div class="coach-comment slide-up" style="animation-delay: 0.6s">
          <h2 class="section-title coach-comment-title">
            <svg class="section-icon coach-icon" viewBox="0 0 20 20">
              <path
                d="M2.5 3.5a1 1 0 00-1 1v9a1 1 0 001 1h.618l1.33 2.66A1 1 0 005.5 17h9a1 1 0 00.868-1.496l-1.33-2.66h.618a1 1 0 001-1v-9a1 1 0 00-1-1h-15zM15 5.5V12H5V5.5h10z">
              </path>
            </svg>
            AI教练评论
          </h2>

          <div class="comments-list">
            <div class="comment-item" v-for="item in data.result.coachingComments" :key="item.title">
              <div class="comment-avatar">
                <svg class="comment-icon" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="comment-content">
                <h3 class="comment-title">{{ item.title }}</h3>
                <p class="comment-desc">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
// 头部区域
.header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 3rem 1rem;
  position: relative;
  overflow: hidden;

  .dark-mode & {
    background: linear-gradient(135deg, var(--secondary-color) 0%, var(--secondary-dark) 100%);
  }
}

// 容器样式
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.1);
}

.header-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.header-main {
  flex: 1;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #34d399;
  margin-right: 0.5rem;
}

.title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
  max-width: 42rem;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.meta-item {
  display: flex;
  align-items: center;

  svg {
    fill: white;
  }
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
}

.position-card {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.position-content {
  text-align: center;
}

.position-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.position-value {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.position-desc {
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

// 结果概览区域
.overview-section {
  padding: 2rem 1rem;
  // border: 1px solid var(--color-border-base);

  // background-color: var(--gray-50);
  background-color: var(--theme-gray-3);

  .dark-mode & {
    background-color: rgba(31, 41, 55, 0.5);
  }
}

.overview-card {
  background-color: var(--bg-light);
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  padding: 1.5rem;

  .dark-mode & {
    background-color: var(--gray-800);
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.section-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;

  &.highlight-icon {
    color: var(--yellow-500);
  }

  &.improvement-icon {
    color: var(--blue-500);
  }

  &.coach-icon {
    color: var(--purple-500);
  }
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.result-card {
  border-radius: 0.75rem;
  padding: 1.25rem;
  text-align: center;

  &.win-card {
    background: linear-gradient(to right, var(--green-50), #d1fae5);
    border: 1px solid var(--green-200);

    .dark-mode & {
      background: linear-gradient(to right, rgba(6, 95, 70, 0.2), rgba(16, 185, 129, 0.2));
      border-color: var(--green-800);
    }
  }
}

.result-value {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--green-600);

  .dark-mode & {
    color: var(--green-400);
  }
}

.result-label {
  font-size: 0.875rem;
  color: var(--gray-600);

  .dark-mode & {
    color: var(--gray-300);
  }
}

.score-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.score-ring-wrapper {
  position: relative;
  width: 8rem;
  height: 8rem;
  margin: 0 auto;
}

.score-ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.score-ring-bg {
  fill: none;
  stroke: var(--gray-200);
  stroke-width: 8;

  .dark-mode & {
    stroke: var(--gray-700);
  }
}

.score-ring-fill {
  fill: none;
  stroke: var(--blue-500);
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 283;
  // stroke-dashoffset: 283;
  stroke-dashoffset: calc(283 - (283 * var(--score-percent, 0.623)));
  // animation: fillRing 1.5s ease-in-out forwards;
  // animation-delay: 0.5s;
}

// @keyframes fillRing {
//   to {
//     stroke-dashoffset: calc(283 - (283 * var(--score-percent, 0.623)));
//   }
// }

.score-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.score-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-light);
}

.score-label {
  font-size: 0.875rem;
  color: var(--gray-500);

  .dark-mode & {
    color: var(--gray-400);
  }
}

.stats-card {
  background: linear-gradient(to right, var(--blue-50), #e0e7ff);
  border-radius: 0.75rem;
  padding: 1.25rem;
  border: 1px solid var(--blue-200);

  .dark-mode & {
    background: linear-gradient(to right, rgba(30, 64, 175, 0.2), rgba(79, 70, 229, 0.2));
    border-color: var(--blue-800);
  }
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
}

.stat-label {
  color: var(--gray-600);

  .dark-mode & {
    color: var(--gray-300);
  }
}

.stat-value {
  font-weight: 500;

  &.win-rate {
    color: var(--green-600);

    .dark-mode & {
      color: var(--green-400);
    }
  }
}

// 详情区域
.details-section {
  padding: 3rem 1rem;
  flex: 1;
  background-color: var(--theme-gray-3);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.detail-card {
  background-color: var(--bg-light);
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  padding: 1.5rem;

  .dark-mode & {
    background-color: var(--gray-800);
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.points-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.point-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid;

  &.highlight-item {
    background-color: var(--green-50);
    border-color: var(--green-200);

    .dark-mode & {
      background-color: rgba(6, 95, 70, 0.2);
      border-color: var(--green-800);
    }
  }

  &.improvement-item {
    background-color: var(--blue-50);
    border-color: var(--blue-200);

    .dark-mode & {
      background-color: rgba(30, 64, 175, 0.2);
      border-color: var(--blue-800);
    }
  }
}

.point-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
  margin-right: 0.75rem;
  flex-shrink: 0;

  .highlight-item & {
    color: var(--green-500);
  }

  .improvement-item & {
    color: var(--blue-500);
  }
}

.point-content {
  flex: 1;
}

.point-title {
  font-weight: 500;

  .highlight-item & {
    color: var(--green-700);

    .dark-mode & {
      color: var(--green-300);
    }
  }

  .improvement-item & {
    color: var(--blue-700);

    .dark-mode & {
      color: var(--blue-300);
    }
  }
}

.point-desc {
  font-size: 0.875rem;
  margin-top: 0.25rem;
  color: var(--gray-600);

  .dark-mode & {
    color: var(--gray-300);
  }
}

// AI教练评论
.coach-comment {
  margin-top: 2rem;
  background: linear-gradient(to right, var(--purple-50), #fce7f3);
  // background: linear-gradient(to right, rgba(107, 33, 168, 0.2), rgba(190, 24, 93, 0.2));
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  padding: 1.5rem;
  border: 1px solid var(--purple-200);

  @media (min-width: 768px) {
    padding: 2rem;
  }

  &>.coach-comment-title {
    color: var(--gray-900);
  }
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background-color: var(--bg-light);
  border-radius: 0.5rem;
  border: 1px solid var(--purple-100);
  color: var(--color-text-primary);
  // .dark-mode & {
  //   background-color: var(--gray-800);
  //   border-color: var(--purple-900);
  // }
}

.comment-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--purple-100);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  flex-shrink: 0;

  .dark-mode & {
    background-color: var(--purple-900);
  }
}

.comment-icon {
  width: 1rem;
  height: 1rem;
  color: var(--purple-600);

  .dark-mode & {
    color: var(--purple-300);
  }
}

.comment-content {
  flex: 1;

  p {
    color: var(--color-text-primary);
  }

  .comment-title {
    font-weight: 500;
    color: var(--theme-purple-1);
  }

  .comment-desc {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }
}

// 动画样式
.fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.slide-up {
  transform: translateY(20px);
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

@keyframes slideUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.stagger-animation>* {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.5s ease-out forwards;
}

.stagger-animation>*:nth-child(1) {
  animation-delay: 0.1s;
}

.stagger-animation>*:nth-child(2) {
  animation-delay: 0.2s;
}

.stagger-animation>*:nth-child(3) {
  animation-delay: 0.3s;
}

.stagger-animation>*:nth-child(4) {
  animation-delay: 0.4s;
}
</style>