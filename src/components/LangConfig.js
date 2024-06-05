import { initReactI18next } from "react-i18next";
import i18n from "i18next";

const resources = {
  ru:{
    translation:{
      about:"О нас",
      service:"Услуги",
      projects:"Проекты",
      news:"Новости",
      contact:"Свяжитесь с нами",
      webDevelopment:"Bеб-разработчик",
      mainTitle1:"Развиваем бизнес с помощью лучших инструментов",
      mainTitle2:"Эффективные цифровые решения",
      moreDetails:"Подробнее",
      name:"Имя",
      email:"Email",
      message:"Сообщение",
      send:"Отправить",
      teamMembers:"Члены нашей творческой группы",
      appDev:"Разработка приложений",
      techConsulting:"Технический консалтинг",
      webDev:"Веб-разработка",
      trainings:"Тренинги в IT сфере",
      dbDev:"Разработка базы данных",
      outSrc:"Аутсорсинг",
      load:"Показать больше",
      loading:"Загрузка...",
      sent:'Отправил',
      fill:"Заполнить бланки",
      scroll:"Прокрутить",
      location:"проспект Туркменбаши, Ашхабад, Туркменистан, 744000",
    }
  },
  en:{
    translation:{
      about:"About",
      service:"Service",
      projects:"Projects",
      news:"News",
      contact:"Contact",
      webDevelopment:"Web Development",
      mainTitle1:"Developing businessusing best tools",
      mainTitle2:"Efficient digital solutions",
      moreDetails:"More details",
      name:"Name",
      email:"Email",
      message:"Message",
      send:"Send",
      teamMembers:"Our creative team members",
      appDev:"App development",
      techConsulting:"Technical Consulting",
      webDev:"Web Development",
      trainings:"Trainings in it area",
      dbDev:"Database Development",
      outSrc:"Outsourcing",
      load:"Load",
      loading:"Loading...",
      sent:"Sent",
      fill:"Fill the blanks",
      scroll:"Scroll",
      location:"Turkmenbashy avenue, Ashgabat, Turkmenistan, 744000",
    }
  },
  tm:{
    translation:{
      about:"Biz barada",
      service:"Hyzmatlar",
      projects:"Proýektler",
      news:"Täzelikler",
      contact:"Habarlaşmak",
      webDevelopment:"Web Döredijiler",
      mainTitle1:"Iň oňat gurallary ulanmak",
      mainTitle2:"Netijeli sanly çözgütler",
      moreDetails:"Doly maglumat",
      name:"Ady",
      email:"Email",
      message:"Hat",
      send:"Ugratmak",
      teamMembers:"Döredijilik toparymyzyň agzalary",
      appDev:"Programmany işläp düzmek",
      techConsulting:"Tehniki maslahat beriş",
      webDev:"Website düzmek",
      trainings:"Bu ýerdäki okuwlar",
      dbDev:"Maglumatlar bazasyny düzmek",
      outSrc:"Autsorsing",
      load:"Ýene",
      loading:"Ugradylýar...",
      sent:"Ugradyldy",
      fill:"Boşluklary dolduryň",
      scroll:"Aýlaň",
      location:"Türkmenbaşy şaýoly, Aşgabat, Türkmenistan, 744000",
    }
  }
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: localStorage.getItem('lang'), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;