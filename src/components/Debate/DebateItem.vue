<script setup lang='ts'>
import { computed } from "vue";
import DOMPurify from "dompurify";
import md from '@/utils/markdown';
import type { DebateItem } from '@/types/debate';

interface DebateItemProps {
  item: DebateItem,
}

const props = defineProps<DebateItemProps>()

// 1. 优化：MarkdownIt 实例可以使用 shallowRef 或放在外部，减少响应式开销
// 标签闭合映射
const TAG_MAP: Record<string, string> = {
  '```': '```',
  '**': '**',
  '__': '__',
  '*': '*',
  '_': '_',
  '~~': '~~',
  '==': '==',
};

/**
 * 核心优化：轻量级未闭合标签检测
 * 采用倒序查找，优先处理最可能影响渲染结构的标签
 */
function autoCloseMarkdown(content: string): string {
  let completion = '';

  // 1. 处理代码块 (优先级最高)
  const codeBlockCount = (content.match(/```/g) || []).length;
  if (codeBlockCount % 2 !== 0) {
    return content + '\n```'; // 代码块未闭合直接封底并返回
  }

  // 2. 处理行内样式 (粗体、斜体等)
  // 我们从后往前找最近的一个可能未闭合的标签
  const tags = Object.keys(TAG_MAP).filter(t => t !== '```');

  // 记录每个标签出现的次数
  for (const tag of tags) {
    const occurrences = content.split(tag).length - 1;
    if (occurrences % 2 !== 0) {
      // 简单检查最后一次出现是否被转义
      const lastIdx = content.lastIndexOf(tag);
      if (lastIdx > 0 && content[lastIdx - 1] !== '\\') {
        completion += TAG_MAP[tag];
      }
    }
  }

  return content + completion;
}

// 2. 真正有意义的“缓冲区”：利用 computed 的缓存特性
// 只有当 content 变化时才重新计算
const renderedHtml = computed(() => {
  const rawContent = props.item.content || '';

  // 如果内容为空，直接返回
  if (!rawContent) return '';

  // 自动补全逻辑
  const safeContent = autoCloseMarkdown(rawContent);

  try {
    const html = md.render(safeContent);
    return DOMPurify.sanitize(html, {
      ADD_TAGS: ["input"],
      ADD_ATTR: ["class", "style", "checked", "disabled", "type"],
    });
  } catch (e) {
    return rawContent; // 降级处理
  }
});

const isUser = computed(() => props.item.role === 'user');

</script>

<template>
  <div class='debate-item-container' :class="[isUser ? 'right' : 'left']">
    <div class="avatar-wrapper">
      <img :src="props.item.avatar" :alt="props.item.name">
    </div>

    <div class="content-wrapper">
      <div class="meta-info">
        <span class="role">{{ props.item.name }}</span>
        <span class="time">{{ props.item.datetime }}</span>
      </div>

      <div class="message-body">
        <div class="markdown-content markdown-body" v-html="renderedHtml"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.debate-item-container {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  width: 100%;

  .avatar-wrapper {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    margin-top: 4px;

    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      background: #f0f0f0;
    }
  }

  .content-wrapper {
    flex: 1;
    max-width: calc(100% - 48px);

    .meta-info {
      margin-bottom: 4px;
      font-size: 12px;
      color: var(--color-text-secondary);
      display: flex;
      gap: 8px;
    }

    .message-body {
      display: flex;

      .markdown-content {
        padding: 12px 16px;
        background: var(--theme-chat-assistant);
        border-radius: 4px 12px 12px 12px;
        color: var(--color-text-primary);
        font-size: 14px;
        line-height: 1.6;
        word-break: break-word; // 比 break-all 更智能，尽量按单词换行
        overflow-wrap: break-word;
        min-height: 40px;
        min-width: 36px;



        // 深度作用选择器处理渲染出的 markdown 样式
        :deep(pre) {
          background-color: #f6f8fa;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
        }
      }
    }
  }

  // 靠右布局优化
  &.right {
    flex-direction: row-reverse;

    .meta-info {
      flex-direction: row-reverse;
      text-align: right;
    }

    .message-body {
      flex-direction: row-reverse;

      .markdown-content {
        background-color: var(--theme-chat-user);
        border-radius: 12px 4px 12px 12px;
        color: #fff; // 假设用户背景较深
      }
    }
  }
}
</style>