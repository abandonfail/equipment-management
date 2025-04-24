
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import CreateModal from '../Admin/Category/components/CreateModal';
import UpdateModal from '../Admin/Category/components/UpdateModal';
import { deleteById, page1 } from '@/services/backend1/categoryController';
import { useModel } from '@umijs/max';
import useCurrentUser from '@/hooks/useCurrentUser';

const CategoryAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.Category>();

  const currentUser = useCurrentUser();
  const handleDelete = async (row: API.CategoryVO) => {
    const hide = message.loading('正在删除');
    if (!row) return;
    try {
      await deleteById({ id: row.id || 0 ,userId: currentUser?.id || 0});
      hide();
      message.success('删除成功');
      actionRef?.current?.reload();
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
    }
  };

  const columns: ProColumns<API.CategoryVO>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入分类名称',
          },
        ],
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true
    },
    {
      title: '更新人',
      dataIndex: 'updateUserName',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <Space>
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
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.Category>
        headerTitle="分类管理"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            新建分类
          </Button>,
        ]}
        request={async (params) => {
          const { data, code } = await page1({ 
            categoryPageQueryDTO: {
              page: params.current,
              pageSize: params.pageSize,
              name: params.name,
            },
          });
          return {
            success: code === 1,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => setCreateModalVisible(false)}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => setUpdateModalVisible(false)}
      />
    </PageContainer>
  );
};

export default CategoryAdminPage;
