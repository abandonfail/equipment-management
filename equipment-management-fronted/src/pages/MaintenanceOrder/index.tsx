import { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Typography, Tabs, Form, Modal, Input } from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import useCurrentUser from '@/hooks/useCurrentUser';
import { changeStatus, pageOfMaintenanceOrder } from '@/services/backend1/MaintenanceOrderController';
// import { deleteById, pageMaintenanceOrder } from '@/services/backend1/maintenanceOrderController';
// import CreateModal from './components/CreateModal';
// import UpdateModal from './components/UpdateModal';

const statusMap: Record<string, number | undefined> = {
    all: undefined,
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  };
  

const MaintenanceOrderPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.MaintenanceOrderVO>();
  const [statusFilter, setStatusFilter] = useState<any>(undefined);
  const actionRef = useRef<ActionType>();
  const currentUser = useCurrentUser();
  const [form] = Form.useForm();

  const handleDelete = async (row: API.MaintenanceOrderVO) => {
    const hide = message.loading('正在删除...');
    try {
    //   await deleteById({ id: row.id || 0 });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error: any) {
      hide();
      message.error('删除失败，' + error.message);
    }
  };

  // 更新工单状态通用方法
  const handleUpdateStatus = async (id: number, newStatus: number) => {
    if ([2, 3, 4].includes(newStatus)) {
      const isCancel = newStatus === 4;
      const isFinished = newStatus === 2;
  
      form.resetFields();
  
      Modal.confirm({
        title: isCancel ? '请输入取消原因' : '请输入维修结果说明',
        content: (
          <Form form={form} layout="vertical">
            <Form.Item
              name="reason"
              label={isCancel ? '取消原因' : '维修结果'}
              rules={[{ required: true, message: '不能为空' }]}
            >
              <Input.TextArea
                rows={4}
                placeholder={isCancel ? '请输入取消原因' : '请输入维修结果'}
              />
            </Form.Item>
  
            {isFinished && (
              <Form.Item
                name="repairCost"
                label="维修费用"
                rules={[{ required: true, message: '请输入维修费用' }]}
              >
                <Input type="number" min={0} placeholder="请输入维修费用" />
              </Form.Item>
            )}
          </Form>
        ),
        onOk: async () => {
          try {
            const values = await form.validateFields();
            const hide = message.loading('提交中...');
  
            const payload: any = {
              id,
              status: newStatus,
            };
  
            if (isCancel) {
              payload.cancelReason = values.reason;
            } else {
              payload.repairResult = values.reason;
              if (isFinished) {
                payload.repairCost = values.repairCost;
              }
            }
  
            await changeStatus(payload);
            hide();
            message.success('操作成功');
            actionRef.current?.reload();
          } catch (e) {
            console.log('状态更新失败', e);
          }
        },
      });
    } else {
      const hide = message.loading('操作进行中...');
      try {
        await changeStatus({ id, status: newStatus });
        hide();
        message.success('操作成功');
        actionRef.current?.reload();
      } catch (error: any) {
        hide();
        message.error('操作失败：' + error.message);
      }
    }
  };
  const columns: ProColumns<API.MaintenanceOrderVO>[] = [
    { title: 'ID', dataIndex: 'id', hideInForm: true, hideInSearch: true },
    { title: '设备名称', dataIndex: 'deviceName' },
    { title: '报修人', dataIndex: 'reporterName' },
    { title: '报修时间', dataIndex: 'reportTime', valueType: 'dateTime', hideInSearch: true },
    { title: '故障描述', dataIndex: 'faultDescription', hideInSearch: true },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: { text: '待处理', status: 'Default' },
        1: { text: '处理中', status: 'Processing' },
        2: { text: '已完成', status: 'Success' },
        3: { text: '无法维修', status: 'Error' },
        4: { text: '已取消', status: 'Warning' },
      },
    },
    { title: '维修人员', dataIndex: 'assigneeName' },
    { title: '分配时间', dataIndex: 'assignTime', valueType: 'dateTime', hideInSearch: true },
    { title: '维修开始时间', dataIndex: 'repairStartTime', valueType: 'dateTime', hideInSearch: true },
    { title: '维修结束时间', dataIndex: 'repairEndTime', valueType: 'dateTime', hideInSearch: true },
    { title: '维修费用', dataIndex: 'repairCost', valueType: 'money', hideInSearch: true },
    { title: '维修结果', dataIndex: 'repairResult', hideInSearch: true },
    { title: '取消原因', dataIndex: 'cancelReason', hideInSearch: true },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', hideInSearch: true },
    { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime', hideInSearch: true },
    {
        title: '操作',
        valueType: 'option',
        render: (_, record) => {
          const ops: React.ReactNode[] = [];
          
          // 待处理：处理(1)、取消(4)
          if (record.status === 0) {
            ops.push(
              <Typography.Link onClick={() => handleUpdateStatus(record.id || 0, 1)}>处理</Typography.Link>,
            );
            ops.push(
              <Button type="link" danger onClick={() => handleUpdateStatus(record.id || 0, 4)}>取消</Button>,
            );
          }
          // 处理中：已完成(2)、无法维修(3)
          if (record.status === 1) {
            ops.push(
              <Typography.Link onClick={() => handleUpdateStatus(record.id || 0, 2)}>已完成</Typography.Link>,
            );
            ops.push(
              <Button type="link" danger onClick={() => handleUpdateStatus(record.id || 0, 3)}>无法维修</Button>
            );
          }
          // 已完成、无法维修、已取消：只显示查看
        //   if (record.status === 2 || record.status === 3 || record.status === 4) {
        //     ops.push(
        //       <Typography.Link onClick={() => handleViewDetails(record.id)}>查看</Typography.Link>,
        //     );
        //   }
      
          return <Space>{ops}</Space>;
        },
      }
      
  ];
  

  return (
    <PageContainer>
      <Tabs
        defaultActiveKey="all"
        onChange={(key) => {
            setStatusFilter(statusMap[key]);
            actionRef.current?.reload();        
        }}
        items={[
          { key: 'all', label: '全部工单' },
          { key: '0', label: '待处理' },
          { key: '1', label: '处理中' },
          { key: '2', label: '已完成' },
          { key: '3', label: '无法维修' },
          { key: '4', label: '已取消' },
        ]}
      />

      <ProTable<API.MaintenanceOrderVO>
        headerTitle="维修工单管理"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
        //   <Button
        //     key="create"
        //     icon={<PlusOutlined />}
        //     type="primary"
        //     onClick={() => setCreateModalVisible(true)}
        //   >
        //     新建工单
        //   </Button>,
        ]}
        request={async (params) => {
          const { data, code } = await pageOfMaintenanceOrder({
            maintenanceOrderPageQueryDTO: {
              page: params.current,
              pageSize: params.pageSize,
              status: statusFilter,
              userId: currentUser?.id !== 1 ? currentUser?.id : undefined,
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

      {/* <CreateModal
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
        }} */}
      {/* /> */}
    </PageContainer>
  );
};

export default MaintenanceOrderPage;
