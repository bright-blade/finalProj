import { useSelector } from "react-redux";
import { RootState } from "setup";
import { UserModel } from "../../../modules/auth/models/UserModel";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const translationEn = {
  hello: "Hello!!! ",
  sample: "text <b><i>bold & italic<i/><b/>",
};
const translationFr = {
  hello: "bienvenu!! ",
  sample: "texte  <b><i>bold & italic<i/><b/>",
};
const translationHe = {
  hello: "ברוך הבא! ",
  sample: "טקסט <b><i> מודגש <i/><b/>",
};

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: translationEn },
      fr: { translation: translationFr },
      he: { translation: translationHe },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: [
          "querystring",
          "htmlTag",     
      ],
    },
  });

export function SharedCardsHome() {
  const { t } = useTranslation();

  // const onchangeLang = (event)=>{
  //   i18n.changeLanguage(event.target.value)
  // };

  // @ts-ignore
  const user: UserModel = useSelector<RootState>(({ auth }) => auth.user);
  console.log(user);

  return (
    <h1>
      {t("hello")} {user.firstname} {user.lastname}!!
    </h1>
  );
}
// export  SharedCardsHome;
