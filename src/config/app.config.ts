const AppConfig = Object.freeze({
  // appName: 'AI辩论系统',
  appName: '思弈阁',
  appTitle: '思弈阁',
  version: '0.0.2',
  defaultAvatar: 'https://avatars.githubusercontent.com/u/65129319',
  placeholderImgSrc: '/placeholder.webp',
  BaseURL: '/api',
  TOKEN_KEY: 'AI_DEBATE_CHAMBER_TOKEN',
  footerInfo: {
    name: '思弈阁',
    year: new Date().getFullYear(),
    description: '智能AI辩论系统',
    icp: '粤ICP备123456号',
  },
})
export default AppConfig
export type AppConfig = typeof AppConfig
