/**
 * 在浏览器控制台美观地打印 API 响应日志
 * @param response Axios 响应对象（或类似结构：{ config: { url }, data, code }）
 * @param open 是否展开日志分组，默认展开
 */
export function logResponse(response: any, open = true) {
  const { config = {}, data } = response
  const { code, data: resData } = data
  const url = config.url || 'unknown URL'

  if (open === true) {
    // 使用 console.group 创建可折叠分组
    console.group(`%c====== ${url} start =======`, 'color: #4CAF50; font-weight: bold;')
  } else {
    console.groupCollapsed(`%c====== ${url} start =======`, 'color: #4CAF50; font-weight: bold;')
  }
  // 打印 data（美化格式）
  if (resData !== undefined) {
    console.log(
      '%cres.data:',
      'color: #2196F3; font-weight: bold;',
      JSON.stringify(resData, null, 2),
    )
  } else {
    console.log('%cres.data:', 'color: #2196F3; font-weight: bold;', 'undefined')
  }

  // 打印 code（如果有）
  if (code !== undefined) {
    console.log('%cres.code:', 'color: #FF9800; font-weight: bold;', code)
  }
  console.groupEnd()
}
