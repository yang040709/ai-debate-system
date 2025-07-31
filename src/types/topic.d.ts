export interface Topic {
  id?: string
  content: string
  title: string
  created_at: string
  participant_count: number
  status: string // 0 未开始 1 进行中 2 已结束
  creator: { name: string; avatar: string }
  tags?: string[]
  support_count?: number
  comment_count?: number
}
