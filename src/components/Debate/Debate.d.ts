export interface DebateItem {
  avatar: string
  name: string
  datetime: string
  content: string
  role: 'assistant' | 'user'
}

export type DebateList = DebateItem[]
