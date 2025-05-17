import lazy from './lazy'
import permission from './permission'
import loading from './loading'
export default (app: any) => {
  app.directive('lazy', lazy)
  app.directive('permission', permission)
  app.directive('loading', loading)
}
