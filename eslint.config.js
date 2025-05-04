import { defineConfig, globalIgnores } from 'eslint/config';
import vuetifyConfig from 'eslint-config-vuetify'

export default defineConfig([
  ...vuetifyConfig,
  globalIgnores([
    'node_modules/*',
    '*.d.ts',
  ]),
])
