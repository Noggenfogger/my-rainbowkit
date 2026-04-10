import Link from "next/link";
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function Page() {
  return (
    <>
      <h2>跳转到rainbowkit主页</h2>
      <Link href="/">
        {/* 普通按钮 */}
        <button>前往主页home</button>
      </Link>
      <h2>这是rainbowkit测试页</h2>
      <ConnectButton />
      <h3>label标签</h3>
      <ConnectButton label="Sign in" />
      <h3>账户状态: 账户头像vs地址</h3>
      <ConnectButton accountStatus="avatar" />
      <ConnectButton accountStatus="address" />
      <h3>链状态: 链图标vs链名字vs无</h3>
      <ConnectButton chainStatus="icon" />
      <ConnectButton chainStatus="name" />
      <ConnectButton chainStatus="none" />
      <h3>显示余额</h3>
      <ConnectButton showBalance={false} />
      <h3>响应式</h3>
      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
      />
      <ConnectButton
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
      />
    </>
  );
}
