# AI 辩论系统

一个基于 Vue3 + TypeScript 的智能辩论平台，支持用户与 AI 进行实时辩论。

## 项目特性

- **AI 辩论** - 与智能 AI 进行实时辩论交流
- **话题管理** - 创建和管理辩论话题
- **历史记录** - 查看辩论历史和分析
- **排行榜** - 用户辩论能力排名
- **现代化 UI** - 基于 Arco Design Vue 的优雅界面
- **响应式设计** - 适配各种设备屏幕
- **用户系统** - 完整的用户注册登录功能
- **Markdown 支持** - 支持富文本编辑和展示
- **状态管理** - 使用 XState 管理复杂辩论流程
- **WebSocket** - 实时通信支持

## 技术栈

### 前端技术

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Arco Design Vue
- **状态管理**: Pinia + XState（状态机）
- **路由**: Vue Router 4
- **HTTP 客户端**: Axios
- **工具库**: VueUse
- **图标库**: Lucide Vue
- **样式**: Sass
- **日期处理**: Day.js

### 开发工具

- **包管理器**: pnpm
- **代码规范**: ESLint + Prettier
- **类型检查**: Vue TSC
- **Git Hooks**: Husky + Commitlint
- **自动导入**: unplugin-auto-import
- **组件自动导入**: unplugin-vue-components
- **开发工具**: Vue DevTools

### 模拟服务

- **WebSocket**: ws
- **Mock 数据**: MockJS + vite-plugin-mock

## 项目结构

```
ai-debate-system/
├── src/                    # 源代码目录
│   ├── api/               # API 接口
│   ├── assets/            # 静态资源
│   ├── components/        # 公共组件
│   ├── composables/       # 组合式函数
│   ├── config/            # 配置文件
│   ├── constant/          # 常量定义
│   ├── directives/        # 自定义指令
│   ├── Layout/            # 布局组件
│   ├── mock/              # Mock 数据
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   ├── styles/            # 样式文件
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   └── views/             # 页面组件
├── mock-server/           # 模拟后端服务
└── public/                # 公共资源
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
# 安装项目依赖
pnpm install

# 安装模拟服务依赖
cd mock-server
pnpm install
cd ..
```

### 启动开发环境

```bash
# 启动前端开发服务器（推荐）
pnpm dev

# 同时启动前端和模拟服务（需要先安装 nodemon）
pnpm dev:all

# 单独启动模拟服务
pnpm dev:server
```

### 构建项目

```bash
# 构建生产版本（包含类型检查）
pnpm build

# 仅构建（不进行类型检查）
pnpm build-only

# 预览构建结果
pnpm preview
```

## 开发脚本

```bash
# 开发相关
pnpm dev              # 启动前端开发服务器
pnpm dev:all          # 同时启动前端和模拟服务
pnpm dev:server       # 启动模拟服务（需要 nodemon）

# 构建相关
pnpm build            # 构建生产版本（包含类型检查）
pnpm build-only       # 仅构建（不进行类型检查）
pnpm preview          # 预览构建结果

# 代码质量
pnpm type-check       # TypeScript 类型检查
pnpm lint             # ESLint 代码检查并自动修复
pnpm format           # Prettier 代码格式化

# Git Hooks
pnpm prepare          # 安装 Husky Git hooks
```

## 主要功能模块

### 辩论功能

- **实时辩论** - 与 AI 进行多轮辩论对话
- **话题创建** - 自定义辩论话题和立场
- **辩论记录** - 完整的辩论过程记录
- **结果分析** - 辩论表现和评分分析

### 用户系统

- **用户认证** - 注册、登录、退出
- **个人中心** - 个人信息管理和设置
- **数据统计** - 辩论次数、胜率等统计

### 话题管理

- **话题分类** - 按标签分类管理话题
- **热门话题** - 热门和推荐话题展示
- **话题列表** - 分页浏览所有话题

### 历史记录

- **辩论历史** - 查看过往辩论记录
- **历史详情** - 详细的辩论过程回顾
- **数据分析** - 辩论表现趋势分析

### 排行榜

- **用户排名** - 基于辩论能力的用户排名
- **评分系统** - 辩论表现评分机制
- **进步追踪** - 排名变化和历史记录

## 开发指南

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查，提交前会自动进行代码格式化。

### 提交规范

项目使用 Commitlint 规范提交信息，格式为：

```
<type>(<scope>): <subject>
```

常用类型：

- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动
