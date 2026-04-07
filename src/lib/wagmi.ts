import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

// 申请projectId: https://dashboard.reown.com/sign-in
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export function getConfig() {
  return createConfig({
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL, {
        batch: false, // 关闭自动批量请求，避免一次性发送大量请求触发限流
        retryCount: 3, // 限制失败重试次数，避免无限重试刷爆请求量
        retryDelay: 1000, // 重试间隔1秒，平滑请求频率
      }),
      [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL, {
        batch: false,
        retryCount: 3,
        retryDelay: 1000,
      }),
    },
    connectors: [
      injected(),
      metaMask(),
      // walletConnect({
      //   projectId,
      //   metadata: {
      //     name: "Thornscraft_Test",
      //     description: "A Web3 DApp built with Next.js and wagmi",
      //     url: siteUrl,
      //     icons: ["https://avatars.githubusercontent.com/u/179229932"],
      //   },
      // }),
    ],
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
