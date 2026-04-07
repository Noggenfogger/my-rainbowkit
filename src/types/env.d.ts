// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
    readonly NEXT_PUBLIC_SITE_URL: string;
    readonly NEXT_PUBLIC_MAINNET_RPC_URL: string;
    readonly NEXT_PUBLIC_SEPOLIA_RPC_URL: string;
    // 未来有其他环境变量，继续在这里加即可，例如：
    // readonly NEXT_PUBLIC_API_URL: string;
  }
}
