<script setup lang='ts'>
import { Message } from '@arco-design/web-vue';
import { ref, computed } from 'vue';
import ReturnHome from '@/components/ReturnHome/ReturnHome.vue';
import { useRouter } from 'vue-router';
import { useTagsStore } from '@/stores/tags';
import { storeToRefs } from 'pinia';
import { useFetchData } from '@/composables/useFetchData'
import { createTopicApi } from '@/api/topic';
import { useUserStore } from '@/stores/user';
import type { Topic } from '@/types/topic';
import { delayFn } from '@/utils/index'



const userStore = useUserStore();

const form = ref<Omit<Topic, "id">>({
  title: '',
  desc: '',
  type: [],
  creator: { name: '', avatar: '' },
  created_at: '',
  participant_count: 0,
  winningRate: 0,
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
  type: [
    {
      required: true,
      message: '请选择话题标签',
    },
  ],
}


const { data, loading, fetchData } = useFetchData(createTopicApi, [form], { id: "" })


const { tagListData, tagListLoading } = storeToRefs(useTagsStore());

const typeList = computed(() => {
  return tagListData.value.tag.map((item) => {
    return { label: item.name, value: item.id }
  })
})




const router = useRouter();

const handleSubmit = ({ errors }: any) => {
  if (errors) {
    Message.warning('请检查辩论话题表单填写是否完整');
  }
  else {
    if (loading.value === true) {
      Message.warning('正在创建中，请稍后...');
      return;
    }
    form.value.created_at = Date.now().toString();
    form.value.creator.name = userStore.userInfo.nickname;
    form.value.creator.avatar = userStore.userInfo.avatar;
    fetchData().then(async () => {
      Message.success('辩论话题创建成功！');
      await delayFn(500);
      router.push({
        name: "topicDetail",
        params: {
          id: data.value.id
        }
      })
    });
  }
}

</script>

<template>
  <div class='creative-container'>
    <return-home />
    <div class="form-title">
      <h2>创建辩论话题</h2>
      <p>请填写以下信息，创建一个新的辩论话题。</p>
      {{ loading }}
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
      <span>标签</span>
      <p v-if="tagListLoading" class="await">...标签加载中,请稍等</p>
      <a-form-item field="type" label="标签" validate-trigger="blur">
        <a-checkbox-group v-model="form.type" :options="typeList" />
      </a-form-item>
      <a-form-item>
        <a-button size="large" class="submit-btn" type="primary" shape="round" html-type="submit">创建辩论话题</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss">
.creative-container {
  // width: 100vw;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 180px;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  background: var(--theme-gray-2);

  .form-title {
    margin-bottom: 50px;
    text-align: center;

    h2 {
      margin: 15px 0;
      font-size: 25px;
    }

  }

  .creative-form {

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

.await {
  color: var(--color-text-secondary);
}
</style>