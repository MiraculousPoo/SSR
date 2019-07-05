import Vue from 'vue'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.use(Element)
const messages = {
  en: {
    message: 'hello',
    ...enLocale
  },
  zh: {
    message: '你好',
    ...zhLocale
  }
}
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})
ElementLocale.i18n((key, value) => i18n.t(key, value))
