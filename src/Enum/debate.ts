import type { Position, Difficulty } from '@/types/debate'

type PositionMap = {
  [key in Position]: string
}
export const POSITION_MAP: PositionMap = {
  negative: '正方',
  positive: '反方',
} as const
type DifficultyMap = {
  [key in Difficulty]: string
}
export const DIFFICULTY_MAP: DifficultyMap = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
  expert: '专家',
  master: '大师',
} as const
