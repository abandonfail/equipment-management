// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 PUT /user/category */
export async function update2(body: API.CategoryDTO, options?: { [key: string]: any }) {
  return request<API.ResultString>('/user/category', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/category */
export async function save(body: API.CategoryDTO, options?: { [key: string]: any }) {
  return request<API.Result>('/user/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/category/all */
export async function getAllCategory(options?: { [key: string]: any }) {
  return request<API.ResultListCategory>('/user/category/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/category/delete/${param0} */
export async function deleteById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultString>(`/user/category/delete/${param0}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/category/page */
export async function page1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageResult>('/user/category/page', {
    method: 'GET',
    params: {
      ...params,
      categoryPageQueryDTO: undefined,
      ...params['categoryPageQueryDTO'],
    },
    ...(options || {}),
  });
}
