import { useEffect, useState } from 'react';
import { Form, Upload, Button, Image, message, Tabs, Avatar, Typography } from 'antd';
import {
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormUploadButton,
  ProCard,
} from '@ant-design/pro-components';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { changePassword, getById1, update } from '@/services/backend1/userController';
import useCurrentUser from '@/hooks/useCurrentUser';
import { upload } from '@/services/backend1/commonController';
import { useNavigate } from 'react-router-dom';  // 导入 useNavigate

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const AccountSettings: React.FC = () => {
  const navigate = useNavigate();  // 获取 navigate 函数
  const [form] = Form.useForm();
  const [avatarPreview, setAvatarPreview] = useState<string>(); // 左侧大头像
  const [loading, setLoading] = useState(true);
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = useCurrentUser();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const userId = currentUser?.id;
      if (userId == null) {
        message.error('未获取到用户 ID');
        return;
      }
      const res = await getById1({ id: userId });
      const data = res.data || {};

      // 注入除 avatarUrl 之外的普通字段
      form.setFieldsValue({
        userName: data.userName,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
      });

      // 如果有头像，组成 fileList 注入到表单里
      if (data.avatarUrl) {
        const fileList = [
          {
            uid: '-1',
            name: 'avatar.png',
            status: 'done',
            url: data.avatarUrl,
          },
        ];
        form.setFieldsValue({ avatarUrl: fileList });
        setAvatarPreview(data.avatarUrl);
      }

    } catch (e) {
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      values.id = currentUser?.id;
  
      // 将 avatarUrl 转换为 string，如果是 fileList
      const avatarFile = values.avatarUrl?.[0];
      const avatarUrl =
        typeof avatarFile === 'string'
          ? avatarFile
          : avatarFile?.url || avatarFile?.response?.data;
  
      await update({ ...values, avatarUrl }); // 提交的是字符串
      message.success('更新成功');
  
      setInitialState((s) => ({
        ...s,
        currentUser: { ...s?.currentUser, ...values, avatarUrl },
      }));
    } catch {
      message.error('更新失败');
    }
  };
  
  const handleChangePassword = async (values: any) => {
    const id = currentUser?.id;
    const { oldPassword, newPassword, confirmPassword } = values;
  
    // 验证新密码和确认密码是否一致
    if (newPassword !== confirmPassword) {
      message.error('两次输入的新密码不一致');
      return false;
    }
  
    // 调用后端接口修改密码
    try {
      const response = await changePassword({
        id,
        oldPassword,
        newPassword,
      });
      if (response?.code === 1) {
        message.success('密码修改成功');
        
        // 在这里执行跳转到登录页面并提示用户重新登录
        message.info('密码修改成功，请重新登录'); // 提示信息
        navigate('/user/login');  // 跳转到登录页面

        return true;
      } else {
        message.error(response?.msg || '密码修改失败');
        return false;
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || '修改失败，请稍后再试。';
      message.error(`修改失败，${errorMessage}`);
    }
  };

  return (
    <ProCard split="vertical" ghost>
      {/* 左侧预览卡片 */}
      <ProCard colSpan="25%" style={{ textAlign: 'center' }}>
        <Avatar
          size={120}
          src={avatarPreview}
          icon={<UserOutlined />}
          style={{ marginBottom: 16 }}
        />
        <Title level={4}>{form.getFieldValue('userName') || '用户名'}</Title>
        <Paragraph type="secondary">
          修改您的个人信息和账户安全设置
        </Paragraph>
      </ProCard>

      {/* 右侧表单 */}
      <ProCard colSpan="75%" loading={loading}>
        <Tabs defaultActiveKey="base">
          <TabPane tab="基本设置" key="base">
            <ProForm
              form={form}
              layout="vertical"
              onFinish={handleUpdate}
              submitter={{
                searchConfig: { submitText: '保存设置' },
                submitButtonProps: { type: 'primary' },
              }}
            >
              <ProFormText name="userName" label="昵称" />
              <ProFormText name="phone" label="电话" />
              <ProFormText name="email" label="邮箱" />
              <ProFormSelect
                name="gender"
                label="性别"
                options={[
                  { label: '男', value: 1 },
                  { label: '女', value: 0 },
                ]}
              />

              {/* 头像上传：不设 initialValue，让它自由上传 */}
              <ProFormUploadButton
                name="avatarUrl"
                label="上传头像"
                fieldProps={{
                  name: 'file',
                  listType: 'picture-card',
                  maxCount: 1,
                  showUploadList: true,
                  customRequest: async ({ file, onSuccess, onError }) => {
                    try {
                      const res = await upload(file as File);
                      const url = res.data;
                      if (url) {
                        setAvatarPreview(url);
                        form.setFieldsValue({ avatarUrl: url });
                      }
                      onSuccess?.(res, file);
                    } catch (err: any) {
                      onError?.(err);
                      message.error('上传失败');
                    }
                  },
                }}
                extra="支持 JPG/PNG，≤10MB"
              />
            </ProForm>
          </TabPane>

          <TabPane tab="安全设置" key="security">
            <ProForm
              layout="vertical"
              onFinish={handleChangePassword}
              submitter={{
                searchConfig: { submitText: '修改密码' },
                submitButtonProps: { type: 'primary' },
              }}
            >
              <ProFormText.Password
                name="oldPassword"
                label="原密码"
                placeholder="请输入原密码"
              />
              <ProFormText.Password
                name="newPassword"
                label="新密码"
                placeholder="请输入新密码"
              />
              <ProFormText.Password
                name="confirmPassword"
                label="确认新密码"
                placeholder="请再次输入新密码"
              />
            </ProForm>
          </TabPane>
        </Tabs>
      </ProCard>
    </ProCard>
  );
};

export default AccountSettings;
