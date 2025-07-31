export interface Topic {
  id?: string
  content: string
  title: string
  created_at: string
  participant_count: number
  status: string
  creator: { name: string; avatar: string }
  tags: string[]
  support_count: number
  comment_count: number
}
