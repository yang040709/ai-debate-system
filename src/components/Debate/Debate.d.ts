export interface DebateItem {
  avatar: string
  name: string
  datetime: string
  content: string
  role: 'assistant' | 'user'
}

export type DebateList = DebateItem[]

export interface ChildTopBarProps {
  title: string
  userSide: 'positive' | 'negative'
  difficulty: string
  totalStage: number
  currentStage: number
  countDown: number
  isTimeout: boolean
}

export interface TopBarProps {
  totalStage: number
  currentStage: number
  countDown: number
  isTimeout: boolean
}
