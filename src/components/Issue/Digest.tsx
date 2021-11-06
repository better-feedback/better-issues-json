import Link from 'next/link'
import { Issue } from '../../../types'
import { truncateText } from '../../utils/text'
import { getFirstMatchingLabel } from '../../utils/issue'
import { useEffect, useState } from 'react'
import { getContract } from '../../utils/near'

const IssueDigest = ({ issue }: { issue: Issue }) => {
  const [likes, setLikes] = useState<string[]>([])
  useEffect((): void => {
    getContract().then((contract: any) => {
      contract.getIssueLikes({ issueId: `${issue.id}` }).then((likes) => {
        setLikes(likes)
      })
    })
  }, [])

  return (
    <Link key={issue.id} href={{ pathname: `/issue/${issue.number}` }}>
      <a>
        <li className="mb-6">
          <div className="block text-sm font-medium">
            {truncateText(issue.title, 200)}
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <div className="inline-flex font-medium uppercase">
              {getFirstMatchingLabel(issue.labels, 'type:')}
            </div>
            <div className="inline-flex">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="align-middle">{likes.length}</span>
            </div>
          </div>
        </li>
      </a>
    </Link>
  )
}

export default IssueDigest
