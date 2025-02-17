import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ✅ 빌드 시 ESLint 오류 무시
  },
  typescript: {
    ignoreBuildErrors: true,  // ✅ TypeScript 오류도 무시 (선택 사항)
  },
};

export default nextConfig;
