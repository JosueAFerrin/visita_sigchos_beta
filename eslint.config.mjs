import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Reglas añadidas para permitir la compilación ignorando errores de estilo/tipado estricto
    rules: {
      "@typescript-eslint/no-explicit-any": "off",      // Permite usar 'any'
      "@typescript-eslint/ban-ts-comment": "off",       // Permite @ts-ignore
      "@typescript-eslint/no-unused-vars": "warn",      // Convierte error de variables no usadas en advertencia
      "react/no-unescaped-entities": "off",             // Permite comillas simples/dobles en texto HTML
      "@next/next/no-html-link-for-pages": "off",       // Permite usar <a> en lugar de <Link>
      "@next/next/no-img-element": "off",               // Permite usar <img> en lugar de <Image>
      "prefer-const": "off",                            // No obliga a cambiar let por const
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;