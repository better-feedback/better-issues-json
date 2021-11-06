import Link from 'next/link'
import { truncateText } from '../../utils/text'
import { getFirstMatchingLabel } from '../../utils/issue'
import { Issue, IssueStatus } from '../../../types'
import IssueDigest from './Digest'

interface Props {
  issues: Issue[]
  status: IssueStatus
}

const getSetting = (status: IssueStatus) => {
  switch (status) {
    case IssueStatus.Planned:
      return {
        color: 'border-blue-100',
        title: 'Planned',
      }
    case IssueStatus.InProgress:
      return {
        color: 'border-yellow-100',
        title: 'In Progress',
      }
    case IssueStatus.Completed:
      return {
        color: 'border-green-100',
        title: 'Completed',
      }
    default:
      return {
        color: '',
        title: '',
      }
  }
}

const IssueList = ({ issues, status }: Props) => {
  const { color, title } = getSetting(status)
  return (
    <div className="relative flex-row self-start bg-white shadow-lg rounded-xl">
      <div
        className={`block w-full p-4 mb-2 text-xl font-medium border-t-8 ${color} issue__main-title rounded-xl`}
      >
        {title}
      </div>
      <div className="p-4 pt-0">
        <>
          <ul>
            {issues.map(
              (issue) =>
                !issue.pull_request && (
                  <IssueDigest issue={issue} key={issue.id} />
                )
            )}
          </ul>
        </>
      </div>
    </div>
  )
}

export default IssueList
