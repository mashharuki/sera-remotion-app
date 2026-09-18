import { config } from "@remotion/eslint-config-flat";
export default [
  ...config,
  {
    files: ["src/main.tsx"],
    rules: { "@remotion/warn-native-media-tag": "off" },
  },
];
