<script setup lang='ts'>
import { templateRef } from '@vueuse/core';
import { reactive } from 'vue';

const handleSubmit = ({ values, errors }: any) => {
  console.log('values:', values, '\nerrors:', errors)
}


interface CreativeTopicForm {
  title: string;
  desc: string;
  tags: string[];
  difficulty: string
}


/* 

{
    id: "aa45ac484cc",
    title: "人工智能是否应该拥有法律人格？",difficulty:"difficult",
    desc: "随着人工智能技术飞速发展，强AI已展现出接近人类的自主决策能力，引发其法律地位的深刻争议。",
    created_at: "2023-05-01 12:00:00",
    participant_count: 200,
    status: "open",
    creator: { name: "张三", avatar: "https://avatars.githubusercontent.com/u/12345678?v=4" },
    tags: ["人工智能", "法律", "人格"],
    // support_count: 120,
    comment_count: 248,
  },

*/


const formRef = templateRef("formRef")

const form = reactive<CreativeTopicForm>({
  title: '',
  desc: '',
  tags: [],
  difficulty: ''
});

const rules = {
  name: [
    {
      required: true,
      message: 'name is required',
    },
  ],
  password: [
    {
      required: true,
      message: 'password is required',
    },
  ]
}
</script>

<template>
  <div class='creative-container'>
    <a-form size="large" ref="formRef" :rules="rules" :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="title" label="话题" validate-trigger="blur">
        <a-input v-model="form.title" placeholder="please enter your username..." />
      </a-form-item>
      <a-form-item field="desc" label="描述" validate-trigger="blur">
        <a-input v-model="form.desc" placeholder="please enter your password..." />
      </a-form-item>
      <a-form-item field="difficulty" label="难度" validate-trigger="blur">
        <a-checkbox value="1">Option 1</a-checkbox>
        <a-checkbox value="1">Option 1</a-checkbox>
        <a-checkbox value="1">Option 1</a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button size="large" class="submit-btn" type="primary" shape="round" html-type="submit">创建辩论话题</a-button>
        <a-button @click="formRef.resetFields()">重置</a-button>
      </a-form-item>
    </a-form>
    <!-- <a-space direction="vertical" size="large"> -->
  </div>
</template>

<style scoped lang="scss">
.creative-container {

  // background: var(--color-bg);

}

.submit-btn {
  width: 100%;
}
</style>

<!-- 

// password2: [
  //   {
  //     required: true,
  //     message: 'password is required',
  //   },
  //   {
  //     validator: (value, cb) => {
  //       if (value !== form.password) {
  //         cb('two passwords do not match')
  //       } else {
  //         cb()
  //       }
  //     }
  //   }
  // ],
  // email: [
  //   {
  //     type: 'email',
  //     required: true,
  //   }
  // ],
  // ip: [
  //   {
  //     type: 'ip',
  //     required: true,
  //   }
  // ],
  // url: [
  //   {
  //     type: 'url',
  //     required: true,
  //   }
  // ],
  // match: [
  //   {
  //     required: true,
  //     validator: (value, cb) => {
  //       return new Promise((resolve) => {
  //         if (!value) {
  //           cb('Please enter match')
  //         }
  //         if (value !== 'match') {
  //           cb('match must be match!')
  //         }
  //         resolve()
  //       })
  //     }
  //   }
  // ],
-->