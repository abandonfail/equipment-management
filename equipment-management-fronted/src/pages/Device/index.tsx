import CreateModal from '@/pages/Admin/Device/components/CreateModal';
import UpdateModal from '@/pages/Admin/Device/components/UpdateModal';
import { delete1, page } from '@/services/backend1/deviceController';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Typography, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { getAllCategory } from '@/services/backend1/categoryController';
import StatusModal from '../Admin/Device/components/StatusModal';
import { getAllLocation } from '@/services/backend1/locationController';
import { upload } from '@/services/backend1/commonController';
import { Image } from 'antd';


// 获取分类数据的钩子
const fetchCategoriesData = async () => {
  try {
    const response = await getAllCategory();
    return response.data;
  } catch (error) {
    message.error('获取分类数据失败');
    return [];
  }
};

// 获取分类数据的钩子
const fetchLocationData = async () => {
  try {
    const response = await getAllLocation();
    return response.data ?? [];
  } catch (error) {
    message.error('获取位置数据失败');
    return [];
  }
};


/**
 * 设备管理页面
 */
const DeviceAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Device>();
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [locations, setLocations] = useState<{ id: number, name: string }[]>([]);


  const showStatusModal = (record: API.DeviceVO) => {
    setCurrentRow(record);
    setStatusModalVisible(true);
  };
  


  useEffect(() => {
    const fetchCategoriesData = async () => {
      const res = await getAllCategory(); // 引入你的接口
      if (res.code === 1) {
        setCategories(res.data??[]);
      }
    };
    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const res = await getAllLocation(); // 调用你的位置接口
        if (res.code === 1) {
          // setLocations(res.data ?? []);
          setLocations((res.data ?? []).map(item => ({ id: item.id!, name: item.name! })));
        } else {
          message.error('获取位置数据失败');
        }
      } catch (error) {
        message.error('获取位置数据异常');
      }
    };
    fetchLocationsData();
  }, []);
  


  const handleDelete = async (row: API.DeviceVO) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await delete1({ id: row.id || 0 });
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
      return false;
    }
  };

  const createColumns: ProColumns<API.DeviceVO>[] = [
    { title: 'ID', dataIndex: 'id', valueType: 'text', hideInSearch: true ,fieldProps: {
      readOnly: true, // 强制设置为只读（双重保险）
    },hideInForm: true},
    { title: '设备名称', dataIndex: 'name', valueType: 'text' ,formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入设备名称',
        },
      ],
    },},
    {
      title: '设备图片',
      dataIndex: 'imageUrl',
      hideInSearch: true,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        const imageUrl = form.getFieldValue('imageUrl');
    
        return (
          <>
            <Upload
              name="file"
              showUploadList={false}
              maxCount={1}
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const res = await upload(file as File);
                  if (res.code === 1) {
                    const url = res.data; // 确保这里是后端返回的完整 URL
                    form.setFieldsValue({ imageUrl: url });
                    message.success('上传成功');
                    onSuccess?.(undefined, file);
                  } else {
                    throw new Error(res.msg || '上传失败');
                  }
                } catch (err) {
                  message.error('上传失败');
                  onError?.(err as any);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>上传设备图片</Button>
            </Upload>
    
            {imageUrl && (
              <div style={{ marginTop: 10 }}>
                <Image
                  width={120}
                  src={imageUrl} // 这里就是使用后端传回来的 URL
                  alt="设备图片预览"
                  placeholder
                />
              </div>
            )}
          </>
        );
      },
    },
    { title: '型号', dataIndex: 'model', valueType: 'text' },
    { title: '序列号', dataIndex: 'serialNumber', valueType: 'text', hideInSearch: true },
    { title: '保修期(月)', dataIndex: 'warrantyPeriod', valueType: 'digit', hideInSearch: true },
    { title: '分类', dataIndex: 'categoryName', valueType: 'select',
      request: async () => {
        const res = await getAllCategory();
        const list = res?.data ?? []; // 如果 res.data 是 undefined，就用空数组
      
        return list.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
      },
      fieldProps: {
        placeholder: '请选择分类',
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '在用', status: 'Success' },
        1: { text: '闲置', status: 'Default' },
        // 2: { text: '故障', status: 'Error' },
        // 3: { text: '维修中', status: 'Processing' },
        // 4: { text: '报废', status: 'Warning' },
      },
    },
    { title: '维修人员', dataIndex: 'maintainerName', valueType: 'text',hideInForm: true, hideInSearch: true },
    { title: '位置', dataIndex: 'locationName', valueType: 'select',
      request: async () => {
      const res = await getAllLocation();
      const list = res?.data ?? []; // 如果 res.data 是 undefined，就用空数组
    
      return list.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
    },
    fieldProps: {
      placeholder: '请选择分类',
    }, },
    { title: '详细信息', dataIndex: 'description', valueType: 'text', hideInSearch: true },
    { title: '上次维护时间', dataIndex: 'lastMaintenanceTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '下次维护时间', dataIndex: 'nextMaintenanceTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '报废时间', dataIndex: 'discardTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true }
  ];

  const updateColumns: ProColumns<API.DeviceVO>[] = [
    { title: 'ID', dataIndex: 'id', valueType: 'text', hideInSearch: true ,fieldProps: {
      readOnly: true, // 强制设置为只读（双重保险）
    },hideInForm: true},
    { title: '设备名称', dataIndex: 'name', valueType: 'text' },
    // { title: '设备图片', dataIndex: 'imageUrl', valueType: 'image', hideInSearch: true },
    {
      title: '设备图片',
      dataIndex: 'imageUrl',
      hideInSearch: true,
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        const imageUrl = form.getFieldValue('imageUrl');
    
        return (
          <>
            <Upload
              name="file"
              showUploadList={false}
              maxCount={1}
              customRequest={async ({ file, onSuccess, onError }) => {
                try {
                  const res = await upload(file as File);
                  if (res.code === 1) {
                    const url = res.data; // 确保这里是后端返回的完整 URL
                    form.setFieldsValue({ imageUrl: url });
                    message.success('上传成功');
                    onSuccess?.(undefined, file);
                  } else {
                    throw new Error(res.msg || '上传失败');
                  }
                } catch (err) {
                  message.error('上传失败');
                  onError?.(err as any);
                }
              }}
            >
              <Button icon={<UploadOutlined />}>上传设备图片</Button>
            </Upload>
    
            {imageUrl && (
              <div style={{ marginTop: 10 }}>
                <Image
                  width={120}
                  src={imageUrl} // 这里就是使用后端传回来的 URL
                  alt="设备图片预览"
                  placeholder
                />
              </div>
            )}
          </>
        );
      },
    },
    
    
    
    { title: '型号', dataIndex: 'model', valueType: 'text' },
    { title: '序列号', dataIndex: 'serialNumber', valueType: 'text', hideInSearch: true },
    { title: '保修期(月)', dataIndex: 'warrantyPeriod', valueType: 'digit', hideInSearch: true },
    { title: '分类', dataIndex: 'categoryName', valueType: 'select',
      request: async () => {
        const res = await getAllCategory();
        const list = res?.data ?? []; // 如果 res.data 是 undefined，就用空数组
      
        return list.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
      },
      fieldProps: {
        placeholder: '请选择分类',
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '在用', status: 'Success' },
        1: { text: '闲置', status: 'Default' },
        2: { text: '故障', status: 'Error' },
        3: { text: '维修中', status: 'Processing' },
        4: { text: '报废', status: 'Warning' },
      },
      hideInForm: true
    },
    { title: '维修人员', dataIndex: 'maintainerName', valueType: 'text',hideInForm: true, hideInSearch: true },
    { title: '位置', dataIndex: 'locationName', valueType: 'select',
      request: async () => {
      const res = await getAllLocation();
      const list = res?.data ?? []; // 如果 res.data 是 undefined，就用空数组
    
      return list.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
    },
    fieldProps: {
      placeholder: '请选择分类',
    }, },
    { title: '详细信息', dataIndex: 'description', valueType: 'text', hideInSearch: true },
    { title: '上次维护时间', dataIndex: 'lastMaintenanceTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '下次维护时间', dataIndex: 'nextMaintenanceTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '报废时间', dataIndex: 'discardTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true }
  ];

  const columns: ProColumns<API.DeviceVO>[] = [
    { title: 'ID', dataIndex: 'id', valueType: 'text', hideInSearch: true ,fieldProps: {
      readOnly: true, // 强制设置为只读（双重保险）
    },hideInForm: true},
    { title: '设备名称', dataIndex: 'name', valueType: 'text' },
    { title: '设备图片', dataIndex: 'imageUrl', valueType: 'image', hideInSearch: true },
    { title: '型号', dataIndex: 'model', valueType: 'text' },
    { title: '序列号', dataIndex: 'serialNumber', valueType: 'text', hideInSearch: true },
    { title: '保修期(月)', dataIndex: 'warrantyPeriod', valueType: 'digit', hideInSearch: true },
    { title: '分类', dataIndex: 'categoryName', valueType: 'select',
      request: async () => {
        const res = await getAllCategory();
        const list = res?.data ?? []; // 如果 res.data 是 undefined，就用空数组
      
        return list.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
      },
      fieldProps: {
        placeholder: '请选择分类',
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '在用', status: 'Success' },
        1: { text: '闲置', status: 'Default' },
        2: { text: '故障', status: 'Error' },
        3: { text: '维修中', status: 'Processing' },
        4: { text: '报废', status: 'Warning' },
      },
    },
    { title: '维修人员', dataIndex: 'maintainerName', valueType: 'text',hideInForm: true, hideInSearch: true },
    { title: '位置', dataIndex: 'locationName', valueType: 'select',
      request: async () => {
      const res = await getAllLocation();
      const list = res?.data ?? []; // 如果 res.data 是 undefined，就用空数组
    
      return list.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
    },
    fieldProps: {
      placeholder: '请选择分类',
    }, },
    { title: '详细信息', dataIndex: 'description', valueType: 'text', hideInSearch: true },
    { title: '上次维护时间', dataIndex: 'lastMaintenanceTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '下次维护时间', dataIndex: 'nextMaintenanceTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '报废时间', dataIndex: 'discardTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime', hideInSearch: true,hideInForm: true },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            删除
          </Typography.Link>
          <Typography.Link onClick={() => showStatusModal(record)}>变更状态</Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Device>
        headerTitle="设备列表"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 120 }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => setCreateModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField];
          const queryParams = {
            current: params.current,
            pageSize: params.pageSize,
            sortField,
            sortOrder,
            devicePageQueryDTO: {
              name: params.name,
              model: params.model,
              categoryId: params.categoryName,
              status: params.status,
              locationId: params.locationName,
            },
          };
          const { data, code } = await page(queryParams);
          return {
            success: code === 1,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={createColumns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => setCreateModalVisible(false)}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={updateColumns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => setUpdateModalVisible(false)}
      />
      <StatusModal
        visible={statusModalVisible}
        record={currentRow}
        onCancel={() => setStatusModalVisible(false)}
        onSuccess={() => {
          setStatusModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default DeviceAdminPage;
