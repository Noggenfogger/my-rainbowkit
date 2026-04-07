MY-RAINBOWKIT/
├── .next/                # Next.js构建产物，无需改动
├── node_modules/         # 依赖包，无需改动
├── public/               # 静态资源（图片、字体等）
├── src/                  # 所有业务代码统一收拢在这里
│   ├── app/              # 仅存放Next.js路由相关内容
│   │   ├── globals.css   # 全局样式
│   │   ├── layout.tsx    # 根布局（在这里引入wagmi Provider）
│   │   ├── page.tsx      # 首页
│   │   └── [你的其他路由文件夹]/
│   ├── components/       # 全局通用组件（UI组件、业务组件）
│   ├── contracts/        # 合约专属目录
│   │   ├── abis/         # 按合约拆分的ABI文件
│   │   ├── config.ts     # 合约地址、链配置
│   │   └── types.ts      # 合约相关TS类型
│   ├── hooks/            # 全局自定义hooks（合约交互、通用业务hooks）
│   ├── lib/              # 核心配置、第三方SDK初始化
│   │   └── wagmi.ts      # wagmi+rainbowkit核心配置
│   ├── types/            # 全局TS类型定义
│   └── utils/            # 纯工具函数（地址格式化、链上数据处理等，可选）
├── .env.development      # 开发环境变量
├── .env.production       # 生产环境变量
├── .env.local            # 本地敏感变量（不提交Git）
├── .gitignore            # Git忽略配置
├── eslint.config.mjs     # ESLint代码规范配置
├── next.config.ts        # Next.js框架配置
├── package.json          # 依赖与脚本配置
├── pnpm-lock.yaml        # pnpm依赖锁文件
├── postcss.config.mjs    # PostCSS配置（TailwindCSS用）
├── README.md             # 项目说明文档
├── tsconfig.json         # TypeScript配置

MetaMask 连接器依赖 pnpm add @metamask/connect-evm

## rainbowkit

要将您的模态框尺寸设置为紧凑，只需在RainbowKitProvider中添加modalSize="compact"