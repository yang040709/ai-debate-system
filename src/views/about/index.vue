<script setup lang='ts'>
</script>

<template>
  <div class='about-container'>
    <div class="header-section">
      <div class="title">
        <h1>关于思弈阁</h1>
      </div>
      <p class="subtitle">在思辨中探索真理，在交流中收获成长</p>
    </div>

    <div class="content-grid">
      <div class="text-content">
        <div class="intro-section">
          <p>
            思弈阁是一个专注于<strong>AI赋能辩论与思辨交流</strong>的创新平台。我们致力于为用户打造一个充满思辨乐趣的辩论空间，在这里，你可以与AI展开精彩辩论，提升逻辑表达能力，参与多元话题讨论，并与志同道合的伙伴分享观点、碰撞思维火花。
          </p>
        </div>

        <div class="features-section">
          <h2>平台特色</h2>
          <div class="features-grid">
            <div class="feature-item">
              <!-- <div class="feature-icon">💡</div> -->
              <h3>AI智能辩论</h3>
              <p>与多个人工智能辩手展开实时辩论，锻炼你的逻辑思维和应变能力</p>
            </div>
            <div class="feature-item">
              <!-- <div class="feature-icon">🌊</div> -->
              <h3>多元话题海洋</h3>
              <p>涵盖科技、社会、文化等丰富议题，满足不同兴趣用户的思辨需求</p>
            </div>
            <div class="feature-item">
              <!-- <div class="feature-icon">👥</div> -->
              <h3>活跃社区交流</h3>
              <p>加入主题讨论室，与观点各异的伙伴进行深度交流，拓展视野</p>
            </div>
          </div>
        </div>

        <div class="vision-section">
          <h2>我们的愿景</h2>
          <p>
            在信息爆炸的时代，思弈阁希望成为理性思考的避风港。我们相信，<strong>高质量的辩论和交流</strong>是促进个人成长和社会进步的重要力量。未来，我们将持续优化平台功能，拓展更多辩论场景，努力营造更加活跃、包容、有价值的思辨社区。
          </p>
        </div>
      </div>
    </div>

    <div class="cta-section">
      <p>立即加入思弈阁，开启你的思辨之旅！</p>
      <button class="cta-button" @click="$router.push({ name: 'home' })">开始辩论</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about-container {
  max-width: 1200px;
  min-height: 80vh;
  margin: 40px auto;
  padding: 40px;
  background: var(--theme-white-2);
  color: var(--color-text-primary);
  border: 1px solid rgba(0, 0, 0, 0.1);
  // background: linear-gradient(135deg, var(--theme-gradient-start, #f8f9ff) 0%, var(--theme-gradient-end, #e8f0ff) 100%);
  // box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;

  .header-section {
    text-align: center;
    margin-bottom: 50px;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 15px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      h1 {
        font-size: 2.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, var(--theme-blue-12) 0%, #3498db 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
      }
    }

    .subtitle {
      font-size: 1.3rem;
      // color: #7f8c8d;
      color: var(--color-text-secondary);
      font-weight: 300;
      letter-spacing: 1px;
    }
  }

  .content-grid {
    .text-content {
      .intro-section {
        margin-bottom: 40px;

        p {
          font-size: 1.2rem;
          line-height: 1.8;
          // color: #2c3e50;
          color: var(--color-text-primary);
          text-align: justify;
        }
      }

      .features-section {
        margin-bottom: 40px;

        h2 {
          font-size: 1.8rem;
          // color: #2c3e50;
          color: var(--color-text-primary);
          margin-bottom: 30px;
          position: relative;
          padding-bottom: 10px;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #3498db, #2c3e50);
            border-radius: 2px;
          }
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;

          .feature-item {
            // background: white;
            background-color: var(--theme-white-2);
            padding: 25px;
            border-radius: 16px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;

            &:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }

            .feature-icon {
              font-size: 2.5rem;
              margin-bottom: 15px;
            }

            h3 {
              font-size: 1.3rem;
              // color: #2c3e50;
              color: var(--color-text-primary);
              margin-bottom: 12px;
            }

            p {
              // color: #7f8c8d;
              color: var(--color-text-secondary);
              line-height: 1.6;
              font-size: 1rem;
            }
          }
        }
      }

      .vision-section {
        h2 {
          font-size: 1.8rem;
          // color: #2c3e50;
          color: var(--color-text-primary);
          margin-bottom: 20px;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.7;
          // color: #2c3e50;
          color: var(--color-text-primary);
          text-align: justify;
        }
      }
    }

  }

  .cta-section {
    text-align: center;
    margin-top: 50px;
    padding: 30px;
    // background: var(--theme-gradient-end);
    background: var(--theme-blue-11);
    border-radius: 16px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

    p {
      font-size: 1.3rem;
      color: var(--theme-white-2);
      margin-bottom: 20px;
    }

    .cta-button {
      background-color: var(--theme-gray-7);
      color: var(--color-text-primary);
      font-weight: 700;
      border: none;
      padding: 12px 35px;
      font-size: 1.1rem;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
      }
    }
  }
}

// 响应式设计
@media (max-width: 968px) {
  .about-container {
    margin: 20px;
    padding: 30px 20px;

    .content-grid {
      .visual-element {
        height: 300px;
        order: -1;
      }
    }

    .header-section .title {
      flex-direction: column;
      gap: 15px;

      h1 {
        font-size: 2.2rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .about-container {
    .features-section .features-grid {
      grid-template-columns: 1fr;
    }

    .header-section .title h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1.1rem;
    }
  }
}
</style>