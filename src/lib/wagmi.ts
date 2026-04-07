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
      [mainnet.id]: http(), // 企业推荐私有RPC
      [sepolia.id]: http(),
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
