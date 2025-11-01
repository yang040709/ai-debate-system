<script lang="ts" setup>
import { ref } from 'vue'
const isDarkMode = ref(false)

const getThemePreference = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}
const applyTheme = () => { }
const toggleTheme = () => { }

// export default {
//   name: 'DebateResult',
//   data() {
//     return {
//       isDarkMode: false
//     }
//   },
//   mounted() {
//     // 从localStorage获取主题偏好，或使用系统偏好
//     this.applyTheme(this.getThemePreference());
//   },
//   methods: {
//     getThemePreference() {
//       const savedTheme = localStorage.getItem('theme');
//       if (savedTheme) {
//         return savedTheme === 'dark';
//       }
//       return window.matchMedia('(prefers-color-scheme: dark)').matches;
//     },
//     applyTheme(isDark) {
//       this.isDarkMode = isDark;
//       localStorage.setItem('theme', isDark ? 'dark' : 'light');
//     },
//     toggleTheme() {
//       this.applyTheme(!this.isDarkMode);
//     }
//   }
// }

</script>
<template>
  <div :class="['app', { 'dark-mode': isDarkMode }]">
    <!-- 主要内容区域 -->
    <div class="main-container">
      <!-- 头部区域 -->
      <header class="header">
        <div class="header-overlay"></div>
        <div class="header-content">
          <div class="header-main fade-in" style="animation-delay: 0.2s">
            <div class="status-badge">
              <span class="status-dot"></span>
              辩论完成
            </div>
            <h1 class="title">全面推行四天工作制是否会影响经济发展？</h1>
            <p class="subtitle">部分国家试点四天工作制后生产力未降反升，但企业运营成本可能增加，引发对经济模式的讨论。</p>

            <div class="meta-info">
              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
                  </path>
                </svg>
                <span>王五</span>
              </div>
              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>2025年10月31日</span>
              </div>
              <div class="meta-item">
                <svg class="meta-icon" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"></path>
                </svg>
                <span>简单难度</span>
              </div>
            </div>
          </div>

          <!-- 立场标识 -->
          <div class="position-card fade-in" style="animation-delay: 0.4s">
            <div class="position-content">
              <div class="position-label">您的立场</div>
              <div class="position-value">反方</div>
              <div class="position-desc">(反对四天工作制全面推行)</div>
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
                <div class="result-value">胜利</div>
                <div class="result-label">成功战胜初级AI辩手</div>
              </div>

              <!-- 综合得分 -->
              <div class="score-container">
                <div class="score-ring-wrapper">
                  <svg class="score-ring-svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" class="score-ring-bg"></circle>
                    <circle cx="50" cy="50" r="45" class="score-ring-fill" :style="{ '--score-percent': 0.623 }">
                    </circle>
                  </svg>
                  <div class="score-text">
                    <span class="score-value">62.3</span>
                    <span class="score-label">综合得分</span>
                  </div>
                </div>
              </div>

              <!-- 数据统计 -->
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
              </div>
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
                <div class="point-item highlight-item">
                  <svg class="point-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <div class="point-content">
                    <h3 class="point-title">情感共鸣的精准切入点</h3>
                    <p class="point-desc">您提出的"情感共鸣是AI无法替代的核心"被判定为关键优势，在第三轮成功瓦解了AI的核心论点</p>
                  </div>
                </div>

                <div class="point-item highlight-item">
                  <svg class="point-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <div class="point-content">
                    <h3 class="point-title">法律案例的及时引用</h3>
                    <p class="point-desc">在第二轮回应中及时引用欧盟《AI法案》草案条款，有力支撑了责任归属论点</p>
                  </div>
                </div>

                <div class="point-item highlight-item">
                  <svg class="point-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <div class="point-content">
                    <h3 class="point-title">比喻修辞的巧妙运用</h3>
                    <p class="point-desc">将AI人格比喻为"会说话的锤子"获得系统额外加分，增强了论点说服力</p>
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
                <div class="point-item improvement-item">
                  <svg class="point-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <div class="point-content">
                    <h3 class="point-title">数据支撑不足</h3>
                    <p class="point-desc">"青少年自律性不足"的推论缺乏实证数据，被AI标记为弱点，建议补充相关研究数据</p>
                  </div>
                </div>

                <div class="point-item improvement-item">
                  <svg class="point-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <div class="point-content">
                    <h3 class="point-title">语言重复冗余</h3>
                    <p class="point-desc">"责任归属是核心问题"在四轮辩论中重复出现7次，应尝试多样化表达或深入拆分论点</p>
                  </div>
                </div>

                <div class="point-item improvement-item">
                  <svg class="point-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <div class="point-content">
                    <h3 class="point-title">忽视对方重要论据</h3>
                    <p class="point-desc">未回应AI提出的"自动驾驶责任归属案例"，损失12%逻辑连贯性评分</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- AI教练评论 -->
          <div class="coach-comment slide-up" style="animation-delay: 0.6s">
            <h2 class="section-title">
              <svg class="section-icon coach-icon" viewBox="0 0 20 20">
                <path
                  d="M2.5 3.5a1 1 0 00-1 1v9a1 1 0 001 1h.618l1.33 2.66A1 1 0 005.5 17h9a1 1 0 00.868-1.496l-1.33-2.66h.618a1 1 0 001-1v-9a1 1 0 00-1-1h-15zM15 5.5V12H5V5.5h10z">
                </path>
              </svg>
              AI教练评论
            </h2>

            <div class="comments-list">
              <div class="comment-item">
                <div class="comment-avatar">
                  <svg class="comment-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="comment-content">
                  <p>在情感共鸣方面表现出色，但要注意第二轮的滑坡谬误：从"青少年自律不足"推导"AI人格危险"存在逻辑跳跃，建议加入阶梯论证</p>
                </div>
              </div>

              <div class="comment-item">
                <div class="comment-avatar">
                  <svg class="comment-icon" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z"
                      clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div class="comment-content">
                  <p>优化策略：当讨论责任归属时，可以引用具体法律案例（如特斯拉自动驾驶事故判决）取代重复表述，使论据更具说服力</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部操作区 -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-info">
              辩论ID: Aceef26b-6198-2F85-aE72-1ae49ffE995C
            </div>
            <div class="footer-actions">
              <button class="btn btn-secondary">分享结果</button>
              <button class="btn btn-primary">再辩一次</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// 导入字体
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');



.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// 主题切换按钮
.theme-toggle {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 20;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s;
  border: none;
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: scale(1.1);
  }

  .dark-mode & {
    background-color: rgba(31, 41, 55, 0.8);
  }
}

.theme-icon {
  width: 1.5rem;
  height: 1.5rem;

  &#sunIcon {
    color: var(--yellow-500);
  }

  &#moonIcon {
    color: #93c5fd;
  }
}

.hidden {
  display: none;
}

// 容器样式
.container {
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 1rem;
}

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
  background-color: var(--gray-50);

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
  stroke-dashoffset: 283;
  animation: fillRing 1.5s ease-in-out forwards;
  animation-delay: 0.5s;
}

@keyframes fillRing {
  to {
    stroke-dashoffset: calc(283 - (283 * var(--score-percent, 0.623)));
  }
}

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
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  padding: 1.5rem;
  border: 1px solid var(--purple-200);

  .dark-mode & {
    background: linear-gradient(to right, rgba(107, 33, 168, 0.2), rgba(190, 24, 93, 0.2));
    border-color: var(--purple-800);
  }

  @media (min-width: 768px) {
    padding: 2rem;
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

  .dark-mode & {
    background-color: var(--gray-800);
    border-color: var(--purple-900);
  }
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
    color: var(--gray-700);

    .dark-mode & {
      color: var(--gray-300);
    }
  }
}

// 底部区域
.footer {
  padding: 1.5rem 1rem;
  background-color: var(--gray-100);
  border-top: 1px solid var(--gray-200);

  .dark-mode & {
    background-color: rgba(31, 41, 55, 0.5);
    border-color: var(--gray-700);
  }
}

.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.footer-info {
  font-size: 0.875rem;
  color: var(--gray-600);

  .dark-mode & {
    color: var(--gray-400);
  }
}

.footer-actions {
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.3s;
  cursor: pointer;
  border: none;

  &.btn-secondary {
    background-color: var(--bg-light);
    border: 1px solid var(--gray-300);
    color: var(--gray-700);

    .dark-mode & {
      background-color: var(--gray-700);
      border-color: var(--gray-600);
      color: var(--gray-200);
    }

    &:hover {
      background-color: var(--gray-50);

      .dark-mode & {
        background-color: var(--gray-600);
      }
    }
  }

  &.btn-primary {
    background-color: var(--blue-600);
    color: white;

    &:hover {
      background-color: var(--blue-700);
    }
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