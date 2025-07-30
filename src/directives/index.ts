import lazy from './lazy'
import permission from './permission'
import loading from './loading'
import type { App } from 'vue'
export default (app: App) => {
  app.directive('lazy', lazy)
  app.directive('permission', permission)
  app.directive('loading', loading)
}
