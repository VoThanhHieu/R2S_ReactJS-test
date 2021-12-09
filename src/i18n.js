import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN_MESSAGE from "./locales/en/message";
import EN_TRANSLATIONS from "./locales/en/translation";
import VI_MESSAGE from "./locales/vi/message";
import VI_TRANSLATIONS from "./locales/vi/translation";
import Languagedetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: EN_TRANSLATIONS,
    message: EN_MESSAGE,
  },
  vi: {
    translation: VI_TRANSLATIONS,
    message: VI_MESSAGE,
  },
};

i18n
  .use(Languagedetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      lookupQuerystring: "lng",
      lookupCookie: "lang",
      lookupLocalStorage: "lang",
      cache: ["localStorage", "cookie"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
