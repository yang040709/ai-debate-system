export interface Record {
  recordId: string
  title: string
  status: '胜利' | '失败'
  timeAgo: string
  description: string
  tags: string[]
  difficulty: string
  scoreChange: number
}
