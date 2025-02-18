import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // 모든 경로에 대해 적용
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://localhost:8501;",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM http://localhost:8501",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
