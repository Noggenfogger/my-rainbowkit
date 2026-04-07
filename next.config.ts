import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    // 纯host格式（匹配报错里的要求）
    "localhost",
    "192.168.199.142",
    // 带协议+端口的完整origin格式
    "http://localhost:3000", // 本地开发地址
    "http://192.168.199.142:3000", // 你的局域网完整访问地址
    // 进阶优化：如果IP经常变化，用通配符适配同网段所有IP，不用频繁改配置
    // "http://192.168.*.*:3000",
  ],
};

export default nextConfig;
