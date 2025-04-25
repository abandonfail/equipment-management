# 设备管理系统

一个基于 **Spring Boot + Vue3 + Ant Design Pro** 的设备管理系统，适用于工厂、办公室等场景中的设备登记、管理、维修流程追踪。

## 📁 项目结构

```
├── equipment-management-fronted    # 前端项目（Vue3 + Ant Design Vue）
├── equipment-management-system     # 后端项目（Spring Boot）
├── equipment_management.sql        # 数据库初始化脚本
```

## ⚠️ 使用说明

### 1. 数据库配置

请根据自己的 MySQL 数据库配置修改后端项目 `application.yml` 或 `application-dev.yml` 中的以下字段：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/equipment_management?useSSL=false&serverTimezone=Asia/Shanghai
    username: root
    password: your_password
```

### 2. OSS 配置

在 `application.yml` 中填写你自己的阿里云 OSS 相关配置：

```yaml
oss:
  endpoint: oss-cn-hangzhou.aliyuncs.com
  accessKeyId: your_access_key_id
  accessKeySecret: your_access_key_secret
  bucketName: your_bucket_name
```

> 建议使用 `.gitignore` 忽略此类文件，避免密钥泄漏。参考：
>
> ```gitignore
> equipment-management-system/src/main/resources/application-*.yml
> ```

### 3. 初始化数据库

使用 `equipment_management.sql` 文件初始化数据库，内含初始数据。

- 管理员账号：`zhangsan`
- 密码：`chen2005`

---

## ✨ 项目亮点

- 🚀 支持用户角色权限：普通用户、维修人员、管理员，权限分明
- 🧰 多功能模块：设备管理、分类管理、位置管理、用户管理
- 🛠️ 实现设备信息增删改查、状态变更、维修记录跟踪
- 📁 支持头像与设备图片上传（OSS 直传）
- 📌 状态变更支持弹窗动态输入，支持“故障原因”记录
- 🔐 登录注册与身份认证、维护人员审批流程
- 💅 现代化 UI：使用 Ant Design Vue + ProComponents 风格
- 🌈 接口文档清晰，Swagger + Knife4j 一键调试

---

## 🧱 技术栈

### 后端

- 🌱 Java 17
- 🚀 Spring Boot 3
- 🛠️ MyBatis / MyBatis Plus
- 💽 MySQL 8.x
- 📘 Swagger + Knife4j

### 前端

- ⚡ Vue 3 + Vite
- 🎨 Ant Design Vue 3
- 🔗 Axios
- 🔁 Vue Router
- 📦 ProComponents 风格页面结构

---

## 🖥️ 页面预览

### 登录页

![主页](https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/3fc64877-a767-4a3e-90f1-0c525a1298b5.png)

### 分类管理

![分类管理](https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/a33b2e88-f402-4d4c-a081-47bc135ca807.png)

### 设备管理

![设备管理](https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/b5870d05-842a-4cbf-a401-e2ca096258fe.png)

### 位置管理

![位置管理](https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/ca15b333-bb11-423e-86b9-0ff5950fa1db.png)

### 维修工单管理

![维修管理](https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/5bdc6ecf-db6f-4d43-b103-4c302d824cb3.png)

### 用户管理

![用户管理](https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/3f94b4be-0414-4999-bec7-4921dec35ddd.png)

---

## 🚀 快速部署

### 📦 后端部署（Spring Boot）

```bash
# 克隆项目
git clone https://github.com/abandonfail/equipment-management.git
cd equipment-management/equipment-management-system

# 修改配置
# 编辑 src/main/resources/application.yml 或 application-dev.yml，配置数据库连接和 OSS 信息

# 初始化数据库
# 使用 equipment_management.sql 文件导入数据库（例如使用 Navicat 或命令行）

# 启动后端服务
mvn spring-boot:run
```

访问地址：

- Swagger 文档：`http://localhost:8080/swagger-ui.html`
- Knife4j 文档：`http://localhost:8080/doc.html`

---

### 🎨 前端部署（Vue3 + Vite）

```bash
# 进入前端目录
cd ../equipment-management-fronted

# 安装依赖
npm install

# 启动前端项目
npm run dev
```

默认访问地址：`http://localhost:8000`

---

## ✅ TODO

如需部署文档、接口测试集合、二次开发指导，请联系项目作者。
**qq: 3240529156**      **wx: c3240529156**
