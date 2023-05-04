import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hook('page:start', () => {
    NProgress.start()
  })
  nuxtApp.hooks.hook('page:finish', () => {
    NProgress.done()
  })
})
