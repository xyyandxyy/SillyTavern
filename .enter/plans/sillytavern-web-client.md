# SillyTavern React Web Client

## Context
用户有一个 SillyTavern 后端项目（Node.js/Express），需要一个现代 React Web 前端来连接并使用它。Enter 平台是 React/Vite/Tailwind/TypeScript，无法运行 Node.js 后端。因此我们将构建一个**纯前端 React 应用**，用户需要先有一个运行中的 SillyTavern 服务器，然后通过这个 Web 客户端连接使用。

## 核心限制
- Enter 无法运行 SillyTavern 的 Node.js 后端
- 需要用户提供一个已运行的 SillyTavern 服务器地址
- 所有 API 调用通过 SillyTavern 的 REST API（`/api/*` 端点）
- CSRF token 需要通过 `/csrf-token` 端点获取

## 实现方案

### 整体架构
构建一个现代化的聊天客户端 UI，核心功能：
1. **连接配置页** - 输入 SillyTavern 服务器地址并连接
2. **角色选择页** - 浏览和选择角色 (`/api/characters/all`)
3. **聊天界面** - 与角色对话的主界面 (`/api/chats/*`)
4. **设置面板** - 基础设置管理

### 文件结构
```
src/
  components/
    layout/
      Sidebar.tsx          # 侧边栏（角色列表）
      Header.tsx           # 顶部导航栏
    chat/
      ChatView.tsx         # 聊天主界面
      ChatMessage.tsx      # 单条消息组件
      ChatInput.tsx        # 输入框组件
    characters/
      CharacterCard.tsx    # 角色卡片
      CharacterList.tsx    # 角色列表
    connection/
      ConnectionForm.tsx   # 服务器连接表单
    ui/ (shadcn components)
  hooks/
    useSTApi.ts           # SillyTavern API Hook
  lib/
    st-api.ts             # API 客户端封装
    utils.ts              # 工具函数
  types/
    index.ts              # TypeScript 类型定义
  App.tsx
  main.tsx
  index.css               # Design system tokens
tailwind.config.ts
```

### 设计风格
- 深色主题为主，参考 SillyTavern 原有暗色风格
- 左侧侧边栏显示角色列表
- 右侧主区域为聊天界面
- 优雅的渐变和动画效果
- 响应式设计，支持移动端

### 核心 API 交互
1. `GET /csrf-token` - 获取 CSRF Token
2. `POST /api/characters/all` - 获取所有角色
3. `POST /api/chats/get` - 获取聊天记录
4. `POST /api/chats/save` - 保存聊天
5. `GET /version` - 获取服务器版本

### 实现步骤
1. 从零搭建 React/Vite/Tailwind 项目结构（覆盖现有 SillyTavern 文件）
2. 设计并实现 design system（index.css + tailwind.config.ts）
3. 创建 API 客户端层（st-api.ts）
4. 实现连接配置页面
5. 实现角色列表和选择
6. 实现聊天界面（消息展示、输入发送）
7. 添加 shadcn UI 组件

### 验证方式
- 页面正确渲染无错误
- 连接表单可以输入服务器地址
- UI 布局响应式正确
- Lint 检查通过
