const badWeather = () => import('./badWeather.vue')
export default {
  path: '/maintenance/badWeather/config',
  component: badWeather,
  meta: {
    keepAlive: true
  }
}
