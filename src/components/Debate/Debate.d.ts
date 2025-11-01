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
