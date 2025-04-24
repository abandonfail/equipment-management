import CreateModal from '@/pages/Admin/User/components/CreateModal';
import UpdateModal from '@/pages/Admin/User/components/UpdateModal';
import { upload } from '@/services/backend1/commonController';
import { deleteUsingGet, page2 } from '@/services/backend1/userController';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Space, Typography, Upload } from 'antd';
import React, { useRef, useState } from 'react';
import { Image } from 'antd';

/**
 * 用户管理页面
 *
 * @constructor
 */
const UserAdminPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.User>();

  /**
   * 删除节点
   *
   * @param row
   */
  const handleDelete = async (row: API.User) => {
    const hide = message.loading('正在删除');
    if (!row) return true;
    try {
      await deleteUsingGet({
        id: row.id as any,
      });
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

  // 构造添加用户列数据
  const AddUser: ProColumns<API.User>[] = [
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
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
      title: '密码',
      dataIndex: 'userPassword',
      valueType: 'password',
    },
    {
      title: '确认密码',
      dataIndex: 'checkPassword',
      valueType: 'password',
    },
    {
      title: '权限',
      dataIndex: 'userRole',
      valueEnum: {
        0: { text: '用户' },
        1: { text: '管理员' },
        2: { text: '维修人员' },
      },
    },
  ];

  // 构造修改用户列数据
  const UpdateUser: ProColumns<API.User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      // 如果仍需要显示为不可编辑的静态文本，可以添加以下配置：
      fieldProps: {
        readOnly: true, // 强制设置为只读（双重保险）
      }
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      // 如果仍需要显示为不可编辑的静态文本，可以添加以下配置：
      fieldProps: {
        readOnly: true, // 强制设置为只读（双重保险）
      }
    },
    {
      title: '密码',
      dataIndex: 'userPassword',
      valueType: 'password',
    },
    // {
    //   title: '头像',
    //   dataIndex: 'avatarUrl',
    //   valueType: 'image',
    //   fieldProps: {
    //     width: 64,
    //   },
    //   hideInSearch: true,
    // },
    {
          title: '头像',
          dataIndex: 'avatarUrl',
          hideInSearch: true,
          renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
            const avatarUrl = form.getFieldValue('avatarUrl');
        
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
                        form.setFieldsValue({ avatarUrl: url });
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
        
                {avatarUrl && (
                  <div style={{ marginTop: 10 }}>
                    <Image
                      width={120}
                      src={avatarUrl} // 这里就是使用后端传回来的 URL
                      alt="设备图片预览"
                      placeholder
                    />
                  </div>
                )}
              </>
            );
          },
        },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: { text: '女' },
        1: { text: '男' },
      },
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: { text: '封禁', status: 'Error' },
      },
    },
    {
      title: '权限',
      dataIndex: 'userRole',
      valueEnum: {
        0: { text: '用户' },
        1: { text: '管理员' },
        2: { text: '维修人员' },
      },
    },
  ];

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.User>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      // 如果仍需要显示为不可编辑的静态文本，可以添加以下配置：
      fieldProps: {
        readOnly: true, // 强制设置为只读（双重保险）
      }
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '头像',
      dataIndex: 'avatarUrl',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: { text: '女' },
        1: { text: '男' },
      },
      hideInSearch: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      valueEnum: {
        0: { text: '正常', status: 'Success' },
        1: { text: '封禁', status: 'Error' },
      },
    },
    {
      title: '权限',
      dataIndex: 'userRole',
      valueEnum: {
        0: { text: '用户' },
        1: { text: '管理员' },
        2: { text: '维修人员' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      // sorter: true,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      // sorter: true,
      hideInSearch: true,
      hideInForm: true,
    },
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
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          // const { data, code } = await listUserByPageUsingPost({
          //   ...params,
          //   sortField,
          //   sortOrder,
          //   ...filter,
          // } as API.UserQueryRequest);

          const queryParams = {
            current: params.current,
            pageSize: params.pageSize,
            sortField,
            sortOrder,
            userPageQueryDTO: {
              userName: params.userName,
              userAccount: params.userAccount,
              userStatus: params.userStatus,
              userRole: params.userRole,
              // 可以根据实际需要加更多字段
            },
          };
        
          // console.log(queryParams)

          const { data, code } = await page2(queryParams);
          
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
        // columns={columns}
        columns={AddUser}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        // columns={columns}
        columns={UpdateUser}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default UserAdminPage;
