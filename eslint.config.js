import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  js.configs.recommended, // ✅ 推荐基础配置放在外层，Flat Config 可直接使用对象
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-console': 'warn',  // 禁止 console.log 等调试语句
      'react/prop-types': 'off', // 如果不使用 PropTypes，可以关闭
      'react/react-in-jsx-scope': 'off', // React 17+ 不需要
      'react-hooks/rules-of-hooks': 'error',  // 确保 Hook 使用规则正确
      'react-hooks/exhaustive-deps': 'warn', // 检查 useEffect 的依赖项
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    },
  },
])
