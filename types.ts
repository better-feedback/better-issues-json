export enum IssueStatus {
  Planned = 'status: planned',
  InProgress = 'status: in progress',
  Completed = 'status: completed',
}

export type IssueLabel = {
  name: string
  description: string
}

export enum IssueState {
  OPEN = 'open',
  CLOSED = 'closed',
}

export type User = {
  login: string
  avatar_url: string
  html_url: string
  id: number
}

export type Issue = {
  id: string
  title: string
  html_url: string
  body: string
  state: IssueState
  number: number
  likeCount: number
  updated_at: string
  created_at: string
  labels: IssueLabel[]
  user: User
  pull_request?: string
  likesCount?: number
}
