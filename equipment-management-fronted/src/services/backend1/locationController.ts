// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 PUT /user/location */
export async function updateLocation(body: API.LocationDTO, options?: { [key: string]: any }) {
  return request<API.Result>('/user/location', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/location */
export async function save(body: API.LocationDTO, options?: { [key: string]: any }) {
  return request<API.Result>('/user/location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/location/all */
export async function getAllLocation(options?: { [key: string]: any }) {
  return request<API.ResultListAllLocationVO>('/user/location/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/location/delete/${param0} */
export async function deleteByLocationId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteByLocationIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Result>(`/user/location/delete/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/location/pageOfLocation */
export async function pageOfLocation(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageOfLocationParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageResult>('/user/location/pageOfLocation', {
    method: 'GET',
    params: {
      ...params,
      locationPageQueryDTO: undefined,
      ...params['locationPageQueryDTO'],
    },
    ...(options || {}),
  });
}
