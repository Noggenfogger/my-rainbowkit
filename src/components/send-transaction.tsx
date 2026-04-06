import * as React from "react";
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";

// 发送交易
export function SendTransaction() {
  // 3.连接 useSendTransaction Hook
  // 4.添加加载状态 isPending
  // 6.处理错误 error
  const { data: hash, error, isPending, mutate } = useSendTransaction();

  // 2.添加表单处理器
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    mutate({ to, value: parseEther(value) });
  }

  // 5.等待交易回执
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // 1.创建表单组件
  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button disabled={isPending} type="submit">
        {isPending ? "Confirming..." : "Send"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {/* 处理错误 */}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}

      {/* 处理错误更安全方式: 类型守卫 */}
      {/* {error && (
        <div>
          Error:
          {
            error instanceof BaseError
              ? error.shortMessage // ✅ 这里 TS 自动知道 error 是 BaseError
              : error.message // ✅ 这里 TS 自动知道 error 是普通 Error
          }
        </div>
      )} */}
    </form>
  );
}
