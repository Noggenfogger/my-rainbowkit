"use client";

import Link from "next/link";
import {
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
  useEnsName,
  useEnsAvatar,
} from "wagmi";
import { SendTransaction } from "@/src/components/send-transaction";
import { ReadContract } from "@/src/components/read-contract";
import { MintNFT } from "@/src/components/mint_nft";

// 钱包连接
function ConnectWallet() {
  const { mutate, mutateAsync, isPending, error } = useConnect();
  const connectors = useConnectors();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-8 p-4 mx-auto box-border">
      <h2>跳转到rainbowkit主页</h2>
      <Link href="/rainbowkit">
        {/* 普通按钮 */}
        <button>前往rainbowkit</button>
      </Link>

      <h2>Connect</h2>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => mutate({ connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      <div>{isPending}</div>
      <div>{error?.message}</div>

      <WalletStatus />
      <WalletSendTransaction />
      <WalletReadContract />
      <WalletMintNFT />
    </div>
  );
}

// 钱包状态
function WalletStatus() {
  const { address, status, chainId, addresses } = useConnection();
  const { mutate, isPending } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <div>
      <h2>Connection</h2>

      <div>
        status: {status}
        <br />
        {/* 将js对象转化为JSON字符串 */}
        addresses: {JSON.stringify(addresses)}
        <br />
        chainId: {chainId}
      </div>

      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      {status === "connected" && (
        <button type="button" onClick={() => mutate()}>
          Disconnect
        </button>
      )}
    </div>
  );
}

// 发送交易
function WalletSendTransaction() {
  return (
    <div>
      <h1>我的DApp交易页面</h1>
      {/* 在这里渲染你的交易表单组件 */}
      <SendTransaction />
    </div>
  );
}

// 读 合约
function WalletReadContract() {
  return (
    <div>
      <h1>读 合约 我的账户余额</h1>
      {/* 在这里渲染你的交易表单组件 */}
      <ReadContract />
    </div>
  );
}

// 写 合约
function WalletMintNFT() {
  return (
    <div>
      <h1>写 合约</h1>
      {/* 在这里渲染你的交易表单组件 */}
      <MintNFT />
    </div>
  );
}

export default ConnectWallet;
