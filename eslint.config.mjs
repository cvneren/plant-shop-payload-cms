import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    // Custom global ignores for the workspace
    ignores: [
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      "tsconfig.tsbuildinfo",
      "src/payload/payload-types.ts"
    ]
  }
];

export default eslintConfig;
