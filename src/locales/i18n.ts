// locales/i18n.ts
import { createI18n } from 'vue-i18n';
import messages from '../../config/locales.json';
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('lang') || 'en',
  messages,
});

export default i18n;
