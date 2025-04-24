import useCurrentUser from '@/hooks/useCurrentUser';
import { save } from '@/services/backend1/categoryController';
import { add } from '@/services/backend1/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.Category>[];
  onSubmit: (values: API.CategoryDTO) => void;
  onCancel: () => void;
}


/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {

  const { visible, columns, onSubmit, onCancel } = props;

  const currentUser = useCurrentUser();

  /**
   * 添加节点
   */
  const handleAdd = async (fields: API.CategoryDTO) => {
    const userId = currentUser?.id;

    const params = {
      ...fields,
      createUser: userId,
      updateUser: userId,
    };

    const hide = message.loading('正在添加');
    try {
      const res = await save(params);
      if (res.code === 1) {
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
      <ProTable<API.CategoryDTO>
        type="form"
        columns={columns}
        onSubmit={async (values: API.CategoryDTO) => {
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
