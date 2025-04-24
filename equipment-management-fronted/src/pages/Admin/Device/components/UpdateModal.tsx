import { getAllCategory } from '@/services/backend1/categoryController';
import { update1 } from '@/services/backend1/deviceController';
import { getAllLocation } from '@/services/backend1/locationController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface Props {
  oldData?: API.DeviceVO;
  visible: boolean;
  columns: ProColumns<API.DeviceVO>[];
  onSubmit: (values: API.DeviceDTO) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.DeviceDTO) => {
  const hide = message.loading('正在更新');
  try {
    await update1(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;

  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [locationList, setLocationList] = useState<any[]>([]);

  useEffect(() => {
    getAllCategory().then(res => setCategoryList(res?.data ?? []));
    getAllLocation().then(res => setLocationList(res?.data ?? []));
  }, []);

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
          initialValues: {
            ...oldData,
            categoryName: oldData.categoryName,
            locationName: oldData.locationName,
            // categoryId: categoryList.find(item => item.name === oldData.categoryName)?.id ?? oldData.categoryId,
            // locationId: locationList.find(item => item.name === oldData.locationName)?.id ?? oldData.locationId,

          },
        }}
        onSubmit={async (values: API.DeviceDTO) => {
          // console.log('提交的值', values);

          // 根据名称查找对应 ID
          // const categoryId = categoryList.find(item => item.name === oldData.categoryName)?.id;
          // const locationId = locationList.find(item => item.name === oldData.locationName)?.id;
          // const categoryId = values.categoryName || categoryList.find(item => item.name === oldData.categoryName)?.id;
          const categoryId = (typeof values.categoryName === 'number' && values.categoryName) || categoryList.find(item => item.name === oldData.categoryName)?.id;

          const locationId = (typeof values.locationName === 'number' && values.locationName) || locationList.find(item => item.name === oldData.locationName)?.id;


          // console.log('提交的categoryId值', categoryId);
          // console.log('提交的locationId值', locationId);

          values.categoryName = categoryId;
          values.locationName = locationId;

          // console.log('提交的最终值', values);

          const success = await update1({
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
