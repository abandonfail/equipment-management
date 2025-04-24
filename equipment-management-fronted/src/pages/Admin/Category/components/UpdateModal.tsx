import useCurrentUser from '@/hooks/useCurrentUser';
import { update2 } from '@/services/backend1/categoryController';
import { update } from '@/services/backend1/userController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  oldData?: API.Category;
  visible: boolean;
  columns: ProColumns<API.Category>[];
  onSubmit: (values: API.CategoryDTO) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
// const handleUpdate = async (fields: API.CategoryDTO) => {
//   const hide = message.loading('正在更新');
//   try {
//     await update2(fields);
//     hide();
//     message.success('更新成功');
//     return true;
//   } catch (error: any) {
//     hide();
//     message.error('更新失败，' + error.message);
//     return false;
//   }
// };

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;

  const currentUser = useCurrentUser();

  /**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.CategoryDTO) => {
  const userId = currentUser?.id;

    const params = {
      ...fields,
      updateUser: userId,
    };
  const hide = message.loading('正在更新');
  try {
    await update2(params);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: API.CategoryDTO) => {
          const success = await handleUpdate({
            ...values,
            id: oldData.id as any,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
        />

    </Modal>
  );
};
export default UpdateModal;
