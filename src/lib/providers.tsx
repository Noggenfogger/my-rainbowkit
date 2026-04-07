"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type Locale,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { getConfig } from "@/src/lib/wagmi";
import { useLocale } from "next-intl";

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig()); // 客户端惰性初始化（仅执行1次）
  const [queryClient] = useState(() => new QueryClient());
  // const locale = useLocale() as Locale; // 从 next-intl 拿当前语言

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          // 自适应主题（还可以自定义自适应主题）
          // theme={{
          //   lightMode: lightTheme(),
          //   darkMode: darkTheme(),
          // }}
          theme={darkTheme({
            ...darkTheme.accentColors.purple, // 主题强调色预设， 或者下两行自定义
            // accentColor: "#7b3fe4",
            // accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
          // theme={darkTheme()}
          // modalSize="compact"    //紧凑模态框
          // initialChain={1}       //初始链配置：用链ID
          // initialChain={mainnet} //初始链配置：用链对象
          // locale="zh-CN"         //rainbowkit本地化
          // locale={locale}        //rainbowkit本地化：这个网站多语言
        >
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
