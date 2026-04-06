import * as React from "react";
import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { abi } from "@/src/contracts/abis/abi";

// 写 合约
export function MintNFT() {
  // 2.连接 useWriteContract
  // 3.添加加载状态 isPending
  // 4.错误处理 error
  const {
    data: hash,
    error,
    isPending,
    mutate: writeContract,
  } = useWriteContract();

  // 1.添加表单处理器
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenId = formData.get("tokenId") as string;

    writeContract({
      address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
      abi,
      functionName: "mint",
      args: [BigInt(tokenId)],
    });
  }

  // 4.等待交易回执
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Confirming..." : "Mint"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  );
}
