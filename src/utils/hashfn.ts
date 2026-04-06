// TanStack Query 开发者工具, 自定义queryKeyFn
import { QueryKey } from "@tanstack/react-query";

// 自定义 queryKey 序列化（解决BigInt，无任何依赖）
export function customHashFn(queryKey: QueryKey): string {
  return JSON.stringify(queryKey, (_, value) => {
    if (typeof value === "bigint") return value.toString() + "n";
    return value;
  });
}