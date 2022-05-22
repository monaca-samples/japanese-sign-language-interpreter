// Import Vue
import { createApp } from 'vue';

import { createI18n } from 'vue-i18n';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-Vue Plugin
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

// Import Framework7 Styles
import 'framework7/framework7-bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

export const i18n = createI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages: {
    ja: {
      title: '日本手話',
      あ: 'あ',
      い: 'い',
      う: 'う',
      え: 'え',
      お: 'お',
      何も: 'サインは検出されませんでした。',
      img: 'static/png/ja.png',
      ja: '日本語',
      es: 'スペイン語',
      en: '英語',
      settings: 'カメラの予測間隔を調整します',
      developed: '開発：アシアル株式会社',
      version: 'アプリバージョン：1.0.0',
    },
    es: {
      title: 'Lengua de signos japonesa',
      あ: 'A',
      い: 'I',
      う: 'U',
      え: 'E',
      お: 'O',
      何も: 'No se detecta ningún signo.',
      img: 'static/png/es.png',
      ja: 'Japonés',
      es: 'Español',
      en: 'Inglés',
      settings: 'Ajusta el intervalo de predicción de la cámara',
      developed: 'Desarrollado por Asial Corporation',
      version: 'Versión de la App: 1.0.0',
    },
    en: {
      title: 'Japanese Sign Language',
      あ: 'A',
      い: 'I',
      う: 'U',
      え: 'E',
      お: 'O',
      何も: 'No sign detected.',
      img: 'static/png/en.png',
      ja: 'Japanese',
      es: 'Spanish',
      en: 'English',
      settings: 'Adjust the prediction interval of the camera',
      developed: 'Developed by Asial Corporation',
      version: 'App Version: 1.0.0',
    },
  },
});

// Init App with i18n
const app = createApp(App).use(i18n);

// Register Framework7 Vue Components
registerComponents(app);

// Mount the App
app.mount('#app');
