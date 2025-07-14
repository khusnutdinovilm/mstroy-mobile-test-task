import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import pluginQuasar from "@quasar/app-vite/eslint";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import prettierSkipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import eslintPluginImport from "eslint-plugin-import";

export default defineConfigWithVueTs(
  {
    /**
     * Ignore the following files.
     * Please note that pluginQuasar.configs.recommended() already ignores
     * the "node_modules" folder for you (and all other Quasar project
     * relevant folders and files).
     *
     * ESLint requires "ignores" key to be the only one in this object
     */
    // ignores: []
  },

  pluginQuasar.configs.recommended(),
  js.configs.recommended,

  /**
   * https://eslint.vuejs.org
   *
   * pluginVue.configs.base
   *   -> Settings and rules to enable correct ESLint parsing.
   * pluginVue.configs[ 'flat/essential']
   *   -> base, plus rules to prevent errors or unintended behavior.
   * pluginVue.configs["flat/strongly-recommended"]
   *   -> Above, plus rules to considerably improve code readability and/or dev experience.
   * pluginVue.configs["flat/recommended"]
   *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
   */
  pluginVue.configs["flat/essential"],

  {
    plugins: {
      eslintPluginImport,
    },
  },

  {
    files: ["**/*.ts", "**/*.vue"],
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    },
  },
  // https://github.com/vuejs/eslint-config-typescript
  vueTsConfigs.recommendedTypeChecked,

  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: "readonly", // process.env.*
        ga: "readonly", // Google Analytics
        cordova: "readonly",
        Capacitor: "readonly",
        chrome: "readonly", // BEX related
        browser: "readonly", // BEX related
      },
    },

    // add your custom rules here
    rules: {
      "prefer-promise-reject-errors": "off",

      // allow debugger during development only
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

      "vue/block-order": [
        "error",
        {
          order: ["template", "script", "script[setup]", ["style[scoped]", "style"]],
        },
      ],
      "vue/component-definition-name-casing": ["error", "kebab-case"],
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            "UNIQUE",
            "SLOT",
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            ["ATTR_DYNAMIC", "ATTR_STATIC", "ATTR_SHORTHAND_BOOL"],
            "EVENTS",
            "CONTENT",
          ],
        },
      ],
      "vue/multi-word-component-names": "error",
      "vue/no-v-html": "warn",
      "vue/v-slot-style": ["error", "shorthand"],
      "vue/component-name-in-template-casing": ["error", "kebab-case"],
      "vue/custom-event-name-casing": ["error", "kebab-case"],
    },
  },

  {
    files: ["src-pwa/custom-service-worker.ts"],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },

  prettierSkipFormatting,
);
