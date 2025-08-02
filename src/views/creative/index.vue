<script setup lang='ts'>
import { Message } from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import ReturnHome from '@/components/ReturnHome/ReturnHome.vue';
import { useRouter } from 'vue-router';



interface CreativeTopicForm {
  title: string;
  desc: string;
  tags: string[];
  difficulty: string
}


const form = reactive<CreativeTopicForm>({
  title: '',
  desc: '',
  difficulty: '',
  tags: [],
});

const rules = {
  title: [
    {
      required: true,
      message: '请输入话题标题',
    },
  ],
  desc: [
    {
      required: true,
      message: '请输入话题描述',
    },
  ],
  difficulty: [
    {
      required: true,
      message: '请选择话题难度',
    },
  ],
  tags: [
    {
      required: true,
      message: '请选择话题标签',
    },
  ],
}

const options = [
  { label: '简单', value: 'easy' },
  { label: '中等', value: 'medium' },
  { label: '困难', value: 'difficult' },
];


const options2 = [
  { label: '社会', value: '社会' },
  { label: '伦理', value: '伦理' },
  { label: '科技', value: '科技' },
  { label: '环境', value: '环境' },
  { label: '经济', value: '经济' },
  { label: '商业', value: '商业' },
  { label: '教育', value: '教育' },
  { label: '文化', value: '文化' },
  { label: '艺术', value: '艺术' }
];




const router = useRouter();

const handleSubmit = ({ values, errors }: any) => {
  // console.log('values:', values, '\nerrors:', errors)
  if (errors) {
    Message.warning('请检查辩论话题表单填写是否完整');
  }
  else {
    console.log(values);
    /* 
    如果是真正的创建，那么
    1. 发送请求创建话题
    2. 等待请求返回
    3. 提示创建成功
    4. 跳转到首页
    */
    Message.success('辩论话题创建成功！');
    setTimeout(() => {
      router.push({
        name: "home"
      })
    }, 1000);
  }
}

</script>

<template>
  <div class='creative-container'>
    <return-home />
    <div class="form-title">
      <h2>创建辩论话题</h2>
      <p>请填写以下信息，创建一个新的辩论话题。</p>
    </div>
    <a-form class="creative-form" size="large" ref="formRef" :rules="rules" :model="form" @submit="handleSubmit">
      <span>话题</span>
      <a-form-item field="title" label="话题" validate-trigger="blur">
        <a-input v-model="form.title" placeholder="请输入您要创建的话题" />
      </a-form-item>
      <span>描述</span>
      <a-form-item field="desc" label="描述" validate-trigger="blur">
        <a-input v-model="form.desc" placeholder="请输入您要创建的话题描述" />
      </a-form-item>
      <span>难度</span>
      <a-form-item field="difficulty" label="难度" validate-trigger="blur">
        <a-radio-group v-model="form.difficulty" :options="options" />
      </a-form-item>
      <span>标签</span>
      <a-form-item field="tags" label="标签" validate-trigger="blur">
        <a-checkbox-group v-model="form.tags" :options="options2" />
      </a-form-item>
      <a-form-item>
        <a-button size="large" class="submit-btn" type="primary" shape="round" html-type="submit">创建辩论话题</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.creative-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;

  .form-title {
    margin-bottom: 50px;
    text-align: center;

    h2 {
      margin: 15px 0;
      font-size: 25px;
    }

  }

  .creative-form {

    // max-width: 800px;
    // width: 500px;
    &>span {
      display: block;
      margin-bottom: 10px;
      font-size: 16px;
      color: var(--color-text-secondary);
    }

    :deep(.arco-form-item-label-col) {
      display: none;
    }

    :deep(.arco-form-item-wrapper-col) {
      flex: 0 0 auto;
    }
  }
}

.submit-btn {
  margin-top: 20px;
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