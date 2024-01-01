import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "en",
    debug: false,
    ns: [
      "AllProfiles",
      "MyProfile",
      "FreindsProfile",
      "AddAdmin",
      "AddUser",
      "AllUsers",
      "AllAdmins",
      "Blogs",
      "Home",
    ],
    interpolation: {
      espaceValue: false,
      formatSeperator: ",",
    },
    react: {
      wait: true,
    },
  });

export default i18next;
