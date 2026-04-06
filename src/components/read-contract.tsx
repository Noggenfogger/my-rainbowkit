import { BaseError, useReadContract, useBlockNumber } from "wagmi";
import { wagmiContractConfig } from "@/src/contracts/abis/contracts";
import { isAddress } from "viem";
import { useEffect } from "react";

export function ReadContract() {
  const myAddress = "0x03A71968491d55603FFe1b11A9e23eF013f75bCF";

  const {
    data: balance,
    error,
    isPending,
    refetch,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "balanceOf",
    args: [myAddress],

    // 可选项 query: 只有 enabled 所需参数为true时, HOOK才能正常执行
    query: {
      enabled: !!myAddress && isAddress(myAddress || ""),
    },
  });

  // watch: 是否实时订阅区块
  const { data: blockNumber } = useBlockNumber({ watch: true });

  useEffect(() => {
    // want to refetch every `n` block instead? use the modulo operator!
    // if (blockNumber % 5 === 0) refetch() // refetch every 5 blocks
    refetch();
  }, [blockNumber]);

  // 处理状态
  if (isPending) {
    return <div>Loading...</div>;
  }

  // 处理错误
  if (error) {
    // 处理错误 这里无法用as断言了,错误类型不一致
    // <div>Error: {(error as BaseError).shortMessage || error.message}</div>

    // 处理错误 更安全方式: 类型守卫
    <div>
      Error:
      {error instanceof BaseError ? error.shortMessage : error.message}
    </div>;
  }

  return <div>Balance: {balance?.toString()}</div>;
}

// 调用多个函数
// function TEST_ReadContract() {
//   const { data, error, isPending } = useReadContracts({
//     contracts: [
//       {
//         ...wagmiContractConfig,
//         functionName: "balanceOf",
//         args: ["0x03A71968491d55603FFe1b11A9e23eF013f75bCF"],
//       },
//       {
//         ...wagmiContractConfig,
//         functionName: "ownerOf",
//         args: [69n],
//       },
//       {
//         ...wagmiContractConfig,
//         functionName: "totalSupply",
//       },
//     ],
//   });
//   const [balance, ownerOf, totalSupply] = data || [];

//   return <></>;
// }
