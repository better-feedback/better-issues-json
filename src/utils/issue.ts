import { Issue, IssueStatus } from '../../types'

export function filterByLabel(issues: Issue[], status: IssueStatus) {
  return issues.filter((issue) =>
    issue.labels.some((label) => label.name === status)
  )
}

export const getFirstMatchingLabel = (labels, labelValue) => {
  if (labels.length > 0) {
    const resultLabel = labels.filter((label) => {
      return label.name.includes(labelValue)
    })

    if (resultLabel.length > 0) {
      return resultLabel[0].name.replace(labelValue, '').trim()
    }
  }
  return null
}
