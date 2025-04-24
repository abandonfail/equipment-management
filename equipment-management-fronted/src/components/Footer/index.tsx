import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '设备管理系统';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'project-home',
          title: '项目主页',
          href: 'https://your-project-homepage.com', // 可替换为你系统的主页或介绍文档链接
          blankTarget: true,
        },
        {
          key: 'docs',
          title: '项目文档',
          href: 'https://your-project-docs.com', // 可替换为你的接口文档或使用说明
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> GitHub 源码
            </>
          ),
          href: 'https://github.com/your-repo/device-management-system', // 替换为你的 GitHub 项目地址
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
