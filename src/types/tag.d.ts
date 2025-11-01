export interface Tag {
  id: string
  name: string
}

export interface TagProps extends Tag {
  color?: string
}

export interface TagResponse {
  tag: Tag[]
}
