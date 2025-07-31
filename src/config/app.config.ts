const AppConfig = {
  // appName: 'AI辩论系统',
  appName: '思弈阁',
  appTitle: 'AI辩论系统',
  version: '0.0.2',
  defaultAvatar: 'https://avatars.githubusercontent.com/u/65129319',
  placeholderImgSrc: '/placeholder.png',
  footerList: ['思弈阁 ©2025 | 智能AI辩论系统'],
  BaseURL: '/api',
} as const
export default AppConfig
export type AppConfig = typeof AppConfig
