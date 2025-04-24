// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /user/common/upload */
// export async function upload(
//   // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
//   params: API.uploadParams,
//   options?: { [key: string]: any },
// ) {
//   return request<API.ResultString>('/user/common/upload', {
//     method: 'POST',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

// src/services/upload.ts
export async function upload(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return request<API.ResultString>('/user/common/upload', {
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
