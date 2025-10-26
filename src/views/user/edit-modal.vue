<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import { Message } from '@arco-design/web-vue'
import { useVisible } from '@/composables/useVisible'

// 处理可见性
const { visible, openModal, closeModal } = useVisible()


// 回显数据
const userStore = useUserStore()

const form = reactive({
  nickname: userStore.userInfo.nickname,
  avatar: userStore.userInfo.avatar,
})

/* 
防止修改后数据不更新的问题
*/

watchEffect(() => {
  form.nickname = userStore.userInfo.nickname || ''
  form.avatar = userStore.userInfo.avatar || ''
})



//处理上传文件
const file = ref()

const uploadAvatar = (option: any) => {
  const { onProgress, onError, onSuccess, fileItem, name } = option
  const xhr = new XMLHttpRequest()
  if (xhr.upload) {
    xhr.upload.onprogress = function (event) {
      let percent
      if (event.total > 0) {
        // 0 ~ 1
        percent = event.loaded / event.total
      }
      onProgress(percent, event)
    }
  }
  xhr.onerror = function error(e) {
    onError(e)
  }
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError(xhr.responseText)
    }
    const res = JSON.parse(xhr.response)
    form.avatar = res?.data?.url || ''
    onSuccess(xhr.response)
  }

  const formData = new FormData()
  formData.append(name || 'file', fileItem.file)
  xhr.open('post', '/api/oss/upload', true)
  xhr.send(formData)

  return {
    abort() {
      xhr.abort()
    },
  }
}

const onChange = (_: any, currentFile: any) => {
  file.value = {
    ...currentFile,
  }
}


// 提交数据

const handleBeforeOk = async () => {
  const res = await userStore.updateUserInfo({
    nickname: form.nickname,
    avatar: form.avatar,
  })
  if (!res) {
    return false
  }
  Message.success('修改成功')
  return true
}
</script>

<template>
  <div class="edit-modal-container">
    <a-button type="outline" @click="openModal">编辑资料</a-button>
    <a-modal v-model:visible="visible" @cancel="closeModal" @ok="openModal" :on-before-ok="handleBeforeOk"
      unmountOnClose ok-text="修改">
      <template #title> 修改资料 </template>
      <a-form :model="form">
        <a-form-item field="name" label="呢称">
          <a-input v-model="form.nickname" />
        </a-form-item>
        <a-form-item field="avatar" label="头像">
          <a-upload :custom-request="uploadAvatar" :fileList="file ? [file] : []" :show-file-list="false"
            @change="onChange">
            <template #upload-button>
              <div :class="`arco-upload-list-item${file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
                }`">
                <div class="arco-upload-list-picture custom-upload-avatar" v-if="form.avatar">
                  <img v-placeholder-img :data-src="form.avatar" />
                  <div class="arco-upload-list-picture-mask">
                    <IconEdit />
                  </div>
                </div>
                <div class="arco-upload-picture-card" v-else>
                  <div class="arco-upload-picture-card-text">
                    <IconPlus />
                    <div style="margin-top: 10px; font-weight: 600">Upload</div>
                  </div>
                </div>
              </div>
            </template> </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped></style>
