import { Modal, Form, Select, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { changeStatus } from '@/services/backend1/deviceController';
import useCurrentUser from '@/hooks/useCurrentUser';

const { Option } = Select;

type Props = {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  record?: API.DeviceChangeStatusDTO;
};

const StatusModal: React.FC<Props> = ({ visible, onCancel, onSuccess, record }) => {
  const [form] = Form.useForm();
  const status = Form.useWatch('status', form); // 👈 实时监听 status 字段
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        status: record.status,
        faultDescription: record.faultDescription || '',
      });
    }
  }, [record, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const result = await changeStatus({
        id: record?.id,
        userId: currentUser?.id,
        status: values.status,
        faultDescription: values.status === 2 ? values.faultDescription : undefined,
      });
      message.success('状态更新成功');
      onSuccess();
    } catch (error: any) {
      // 捕获异常中的错误信息（根据你项目接口格式调整）
      const errorMsg = error?.response?.data?.message || '状态更新失败';
      message.error(errorMsg);
    }
  };

  return (
    <Modal
      title="变更设备状态"
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="status" label="设备状态" rules={[{ required: true }]}>
          <Select placeholder="请选择状态">
            <Option value={0}>在用</Option>
            <Option value={1}>闲置</Option>
            <Option value={2}>故障</Option>
            <Option value={3}>维修中</Option>
            <Option value={4}>报废</Option>
          </Select>
        </Form.Item>
        {status === 2 && (
          <Form.Item
            name="faultDescription"
            label="故障描述"
            rules={[{ required: true, message: '请填写故障描述' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入故障原因" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default StatusModal;
