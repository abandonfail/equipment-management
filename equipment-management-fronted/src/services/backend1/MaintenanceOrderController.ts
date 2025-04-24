// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /user/maintenanceOrder/page */
export async function pageOfMaintenanceOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.pageOfMaintenanceOrderParams,
  options?: { [key: string]: any },
) {
  return request<API.ResultPageResult>('/user/maintenanceOrder/page', {
    method: 'GET',
    params: {
      ...params,
      maintenanceOrderPageQueryDTO: undefined,
      ...params['maintenanceOrderPageQueryDTO'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/maintenanceOrder/updateStatus */
export async function changeStatus(
  body: API.MaintenanceOrderChangeStatusDTO,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/user/maintenanceOrder/updateStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}