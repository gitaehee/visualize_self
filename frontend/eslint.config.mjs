import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",  // ✅ 사용하지 않는 변수 경고 끄기
      "react/jsx-uses-react": "off",  // ✅ React 18 이상에서 필요 없는 규칙 끄기
      "react/react-in-jsx-scope": "off"  // ✅ Next.js에서는 필요 없음
    }
  }
];
