// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /admin/user */
export async function add(body: API.UserRegisterDTO, options?: { [key: string]: any }) {
  return request<API.Result>('/admin/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/user/${param0} */
export async function getById1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getById1Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResultUser>(`/admin/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /admin/user/page */
export async function page2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.page2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageResult>('/admin/user/page', {
    method: 'GET',
    params: {
      ...params,
      userPageQueryDTO: undefined,
      ...params['userPageQueryDTO'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /admin/user/status/${param0} */
export async function startOrStop(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.startOrStopParams,
  options?: { [key: string]: any },
) {
  const { status: param0, ...queryParams } = params;
  return request<API.Result>(`/admin/user/status/${param0}`, {
    method: 'POST',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /user/user */
export async function update(body: API.UserUpdateDTO, options?: { [key: string]: any }) {
  return request<API.Result>('/user/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/user/delete/${param0} */
export async function deleteUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUsingGETParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Result>(`/user/user/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/user/get/login */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.ResultUserLoginVO>('/user/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/user/login */
export async function login(body: API.UserLoginDTO, options?: { [key: string]: any }) {
  return request<API.ResultUserLoginVO>('/user/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.ResultBoolean>('/user/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/user/register */
export async function register(body: API.UserRegisterDTO, options?: { [key: string]: any }) {
  return request<API.Result>('/user/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/user/changePassword */
export async function changePassword(
  body: API.ChangePasswordDTO,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/user/user/changePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
