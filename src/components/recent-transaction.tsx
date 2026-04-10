"use client";

import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

// 最近交易记录
export function RecentTransfer() {
  const addRecentTransaction = useAddRecentTransaction();

  const handleSend = () => {
    addRecentTransaction({
      hash: "0x...", // 交易 hash = 0x...
      description: "发送ETH自定义描述巴拉巴拉~", // 自定义描述
      confirmations: 100, // 可选： 100个区块确认后， RainbowKit 才判定为「已完成」
    });
  };

  return <button onClick={handleSend}>发送交易</button>;
}
 