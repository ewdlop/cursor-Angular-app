# Angular 应用 | Angular Application

## 项目概述 | Project Overview

这是一个使用 Angular 17 构建的现代化 Web 应用，包含用户认证和个人资料管理功能。
This is a modern web application built with Angular 17, featuring user authentication and profile management.

### 功能特点 | Features

- 用户认证（登录/注册）| User Authentication (Login/Register)
- 个人资料管理 | Profile Management
- 现代化 UI 设计 | Modern UI Design
- 响应式布局 | Responsive Layout
- 后端 API 集成 | Backend API Integration

## 技术栈 | Tech Stack

### 前端 | Frontend
- Angular 17
- TypeScript
- SCSS
- Angular Material
- RxJS

### 后端 | Backend
- Node.js
- Express.js
- MongoDB
- TypeScript
- JWT Authentication

## 安装说明 | Installation

### 前端设置 | Frontend Setup

1. 克隆仓库 | Clone the repository
```bash
git clone <repository-url>
cd my-angular-app
```

2. 安装依赖 | Install dependencies
```bash
npm install
```

3. 启动开发服务器 | Start development server
```bash
ng serve
```

4. 访问应用 | Access the application
```
http://localhost:4200
```

### 后端设置 | Backend Setup

1. 安装 MongoDB
```bash
# macOS (使用 Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# 启动 MongoDB 服务
brew services start mongodb-community
```

2. 进入后端目录 | Navigate to backend directory
```bash
cd server
```

3. 安装依赖 | Install dependencies
```bash
npm install
```

4. 创建环境变量文件 | Create environment file
创建 `.env` 文件并添加以下内容：
Create `.env` file with the following content:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/my-angular-app
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
```

5. 启动后端服务器 | Start backend server
```bash
npm run dev
```

## 项目结构 | Project Structure

```
my-angular-app/
├── src/                    # 前端源代码 | Frontend source code
│   ├── app/
│   │   ├── components/    # 组件 | Components
│   │   ├── pages/        # 页面 | Pages
│   │   ├── services/     # 服务 | Services
│   │   └── ...
│   └── ...
├── server/                # 后端源代码 | Backend source code
│   ├── src/
│   │   ├── controllers/  # 控制器 | Controllers
│   │   ├── models/      # 数据模型 | Models
│   │   ├── routes/      # 路由 | Routes
│   │   └── ...
│   └── ...
└── ...
```

## 功能说明 | Features Description

### 用户认证 | User Authentication
- 用户注册 | User Registration
- 用户登录 | User Login
- JWT 令牌认证 | JWT Token Authentication
- 密码加密存储 | Password Encryption

### 个人资料管理 | Profile Management
- 查看个人资料 | View Profile
- 更新个人信息 | Update Profile Information

## 开发指南 | Development Guidelines

### 代码规范 | Code Standards
- 使用 TypeScript 严格模式 | Use TypeScript strict mode
- 遵循 Angular 风格指南 | Follow Angular style guide
- 使用 ESLint 进行代码检查 | Use ESLint for code linting

### 提交规范 | Commit Standards
- feat: 新功能 | New feature
- fix: 修复 | Bug fix
- docs: 文档更新 | Documentation
- style: 代码格式 | Code style
- refactor: 重构 | Code refactoring
- test: 测试 | Testing
- chore: 构建过程或辅助工具的变动 | Build process or auxiliary tool changes

## 贡献指南 | Contributing

1. Fork 项目 | Fork the project
2. 创建特性分支 | Create your feature branch
3. 提交更改 | Commit your changes
4. 推送到分支 | Push to the branch
5. 创建 Pull Request | Create a Pull Request

## 许可证 | License

MIT License

## 联系方式 | Contact

如有问题或建议，请提交 Issue 或联系项目维护者。
For questions or suggestions, please submit an Issue or contact the project maintainer.
