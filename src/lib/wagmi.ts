import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";
import { Chain } from "@rainbow-me/rainbowkit";

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
      //   projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,  // 申请projectId: https://dashboard.reown.com/sign-in
      //   metadata: {
      //     name: "Thornscraft_Test",
      //     description: "A Web3 DApp built with Next.js and wagmi",
      //     url: process.env.NEXT_PUBLIC_SITE_URL,
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

// RainbowKit的链元数据
// createConfig 的 chains 字段
// 自定义链图标：iconUrl
// 自定义链背景：iconBackground
// const chains: readonly [Chain, ...Chain[]] = [
//   {
//     ...mainnet,
//     iconBackground: "#000",
//     iconUrl: "https://example.com/icons/ethereum.png",
//   },
//   {
//     ...sepolia,
//     iconBackground: "#ff0000",
//     iconUrl: "https://example.com/icons/optimism.png",
//   },
// ];
