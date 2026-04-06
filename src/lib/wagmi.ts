import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

// walletConnect 需要自己去申请projectId: https://dashboard.reown.com/sign-in
const projectId = "<WALLETCONNECT_PROJECT_ID>";

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [injected(), metaMask(), walletConnect({ projectId }), safe()],

    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,

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
