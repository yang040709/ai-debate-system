<script setup lang='ts'>
import { useDebateStore } from '@/stores/debate';
import { storeToRefs } from 'pinia';


const store = useDebateStore();
const { isStreamLoad, chatList, loading, disabled, inputVal, isDebateEnd } = storeToRefs(store);


</script>

<template>
  <div class="chat-box chat-container">
    <!-- <t-chat-item content="模型由 <span>hunyuan</span> 变为 <span>GPT4</span>" variant="base"
      role="model-change"></t-chat-item> -->
    <t-chat ref="chatRef" class="chat-content" :clear-history="false" :data="chatList" :text-loading="loading"
      :is-stream-load="isStreamLoad" style="height: 100%">
      <template #content="{ item, index }">
        <t-chat-content v-if="item.content.length > 0" :content="item.content" />
        <!-- <p>123123123123123123123</p> -->
      </template>
      <template #footer>
        <t-chat-sender :textarea-props="{
          placeholder: '请输入辩论论点...',
        }" :loading="loading" @send="store.handleSend" :disabled="disabled" v-model="inputVal">
          <!-- 自定义操作区域的内容，默认支持图片上传、附件上传和发送按钮 -->
          <template #suffix="{ renderPresets }">
            <component :is="renderPresets([])" />
          </template>
        </t-chat-sender>
        <div class="debate-input-mask" v-if="isDebateEnd">
          <div class="to-result-page" @click="store.toResultPage">
            前往辩论结果页
          </div>
        </div>
      </template>
    </t-chat>
  </div>
</template>

<style scoped lang="scss">
.chat-content {
  padding: 0 20px;
}

.chat-box {
  // padding: 0 50px;
  // background: ;
  // background: var(--theme-gray-5);
  // margin-top: $header-height;
  // height: calc(100% - $header-height);
  height: calc(100% - 100px);
  // background: #F3F4F6;
}

/* 应用滚动条样式 */
::-webkit-scrollbar-thumb {
  background-color: var(--td-scrollbar-color);
}

::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: var(--td-scrollbar-hover-color);
}

::-webkit-scrollbar-track {
  background-color: var(--td-scroll-track-color);
}

.chat-box {
  position: relative;

  .bottomBtn {
    position: absolute;
    left: 50%;
    margin-left: -20px;
    bottom: 210px;
    padding: 0;
    border: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow:
      0px 8px 10px -5px rgba(0, 0, 0, 0.08),
      0px 16px 24px 2px rgba(0, 0, 0, 0.04),
      0px 6px 30px 5px rgba(0, 0, 0, 0.05);
  }

  .to-bottom {
    width: 40px;
    height: 40px;
    border: 1px solid #dcdcdc;
    box-sizing: border-box;
    background: var(--td-bg-color-container);
    border-radius: 50%;
    font-size: 24px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    .t-icon {
      font-size: 24px;
    }
  }
}

.model-select {
  display: flex;
  align-items: center;

  .t-select {
    width: 112px;
    height: 32px;
    margin-right: 8px;

    .t-input {
      border-radius: 32px;
      padding: 0 15px;
    }
  }

  .check-box {
    width: 112px;
    height: 32px;
    border-radius: 32px;
    border: 0;
    background: #e7e7e7;
    color: rgba(0, 0, 0, 0.9);
    box-sizing: border-box;
    flex: 0 0 auto;

    .t-button__text {
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin-left: 4px;
      }
    }
  }

  .check-box.is-active {
    border: 1px solid #d9e1ff;
    background: #f2f3ff;
    color: var(--td-brand-color);
  }
}


:deep(.t-chat__detail) {
  // border:1px solid #
  // background: #fff;
  // background: #F3F3F3;
  // background: #5CA1FA;
  border-radius: 10px;
}

:deep(.user .t-chat__detail) {
  background: var(--theme-chat-user);
}

:deep(.assistant .t-chat__detail) {
  background: var(--theme-chat-assistant);
}

.debate-input-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .to-result-page {
    cursor: pointer;
    width: 200px;
    height: 40px;
    background: var(--theme-blue-1);
    color: var(--theme-white-2);
    font-size: 16px;
    border-radius: 20px;
    line-height: 40px;
    text-align: center;
  }

  border-radius: 20px;
}
</style>