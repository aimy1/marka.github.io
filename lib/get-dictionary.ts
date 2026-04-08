import "server-only";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  zh: () => import("../dictionaries/zh.json").then((module) => module.default),
};

export type Dictionary = typeof import("../dictionaries/en.json");

export const getDictionary = async (locale: "en" | "zh"): Promise<Dictionary> =>
  dictionaries[locale]();
