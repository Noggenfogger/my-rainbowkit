import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    ssr: true,

    storage: createStorage({
      storage: cookieStorage,
    }),

    chains: [mainnet, sepolia],
    connectors: [
      injected(),
      metaMask(),
      // walletConnect({
      //   projectId: "9fa45c18f4e4bb63f39ed9de4ffdcae6", // 申请projectId: https://dashboard.reown.com/sign-in
      //   // metadata: {
      //   //   name: "Thornscraft_Test",
      //   //   description: "A Web3 DApp built with Next.js and wagmi",
      //   //   url: "http://localhost:3000", // 本地开发填 http://localhost:3000，生产环境填你的正式域名（如 https://your-dapp.com
      //   //   icons: ["https://avatars.githubusercontent.com/u/179229932"],
      //   // },
      // }),
    ],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
