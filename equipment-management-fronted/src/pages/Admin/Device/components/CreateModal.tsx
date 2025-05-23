import { add } from '@/services/backend1/deviceController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.Device>[];
  onSubmit: (values: API.DeviceDTO) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.DeviceDTO) => {
  const hide = message.loading('正在添加');
  try {
    const res = await add(fields); // 使用新的 add 方法
    if (res.code === 1) { // 假设返回的数据结构类似
      hide();
      message.success('创建成功');
      return true;
    } else {
      throw new Error(res.msg || '添加失败');
    }
  } catch (error: any) {
    hide();
    message.error('创建失败，' + error.message);
    return false;
  }
};

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title={'创建'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable<API.DeviceDTO>
        type="form"
        columns={columns}
        onSubmit={async (values: API.DeviceDTO) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
