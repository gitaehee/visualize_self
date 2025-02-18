import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ 빌드 시 ESLint 오류 무시
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ TypeScript 오류도 무시 (선택 사항)
  },
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
