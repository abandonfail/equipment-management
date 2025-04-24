import { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Typography, Tag } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { deleteByLocationId, pageOfLocation } from '@/services/backend1/locationController';
import CreateModal from '../Admin/Location/components/CreateModal';
import UpdateModal from '../Admin/Location/components/UpdateModal';

const LocationAdminPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.Location>();
  const actionRef = useRef<ActionType>();

  const handleDelete = async (row: API.Location) => {
    const hide = message.loading('正在删除...');
    try {
      await deleteByLocationId({ id: row.id || 0 });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
    }
  };

  const columns: ProColumns<API.Location>[] = [
    { title: 'ID', dataIndex: 'id', hideInSearch: true ,hideInForm: true},
    { title: '位置名称', dataIndex: 'name', valueType: 'text' ,formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入位置名称',
        },
      ],
    },},
    {
      title: '位置类型',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        0: '厂区',
        1: '车间',
        2: '仓库',
        3: '办公室',
        4: '其他',
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请输入账号',
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
      <ProTable<API.Location>
        headerTitle="位置管理"
        actionRef={actionRef}
        rowKey="id"
        search={{ labelWidth: 100 }}
        toolBarRender={() => [
          <Button
            key="create"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            新建位置
          </Button>,
        ]}
        request={async (params) => {
          const { data, code } = await pageOfLocation({ 
            locationPageQueryDTO: {
              page: params.current,
              pageSize: params.pageSize,
              name: params.name,
              type: params.type,
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
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
      />

      <UpdateModal
        visible={updateModalVisible}
        oldData={currentRow}
        columns={columns}
        onCancel={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default LocationAdminPage;
