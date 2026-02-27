import { request } from './request'
import { uploadFileResponse } from '@/types/oss'
import type { AxiosProgressEvent } from 'axios'
export const uploadAvatarApi = (
  formData: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
) => {
  return request({
    url: '/oss/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
    onUploadProgress,
  }) as Promise<uploadFileResponse>
}
