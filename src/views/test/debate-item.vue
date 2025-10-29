<script setup lang='ts'>
import MarkdownIt from 'markdown-it';
import { computed } from "vue";
import highlight from "markdown-it-highlightjs";
import DOMPurify from "dompurify";


// interface DebateItem {
//   avatar: string,
//   name: string,
//   datetime: string,
//   content: string,
//   role: string,
// }

// interface DebateItemProps {
//   right: boolean,
//   item: DebateItem,
// }

const props = defineProps({
  right: Boolean, content: {
    type: String,
    default: 'item'
  }
})

const md = new MarkdownIt({
  html: true
});
md.use(highlight)

const compileMarkdown = computed(() => {
  const content = md.render(props.content);
  console.log(content, "<==content");

  return DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["input"], // 用于任务列表
    ADD_ATTR: ["class", "style", "checked", "disabled", "type"], // 任务列表需要
  });
})


</script>

<template>
  <div class='debate-item-container' :class="{ right }">
    <div class="left">
      <img src="/referee.png" alt="">
    </div>
    <div class="right">
      <div class="top">
        <span class="role">AI</span>
        <span class="time">2025年10月29日</span>
      </div>
      <div class="content markdown-body" v-html="compileMarkdown"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.debate-item-container {
  width: 100%;
  height: 100px;
  display: flex;
  // flex-wrap: wrap;
  gap: 6px;

  .left {
    width: 32px;
    height: 32px;
    margin-top: 32px;

    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right {
    flex: 1;


    .top {
      margin: 0 20px;
      margin-bottom: 6px;
      color: var(--color-text-secondary);

      span.role {
        padding-right: 5px;
      }
    }

    .content {
      padding: 20px;
      background: var(--theme-chat-assistant);
      border-radius: 10px;
      width: fit-content;
      /* 解决不换行的问题 */
      // text-wrap: wrap;
      // white-space: pre-wrap;
      max-width: 100%;
      word-break: break-all;
      // height: fit-content;
    }
  }

  &.left {
    .right {
      margin-right: 38px;
    }
  }

  &.right {
    .right {
      order: -1;
      margin-left: 38px;

      .top {
        text-align: right;
      }

      .content {
        background-color: var(--theme-chat-user);
      }
    }
  }
}
</style>
