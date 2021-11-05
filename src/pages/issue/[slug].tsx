import React from 'react'
import Layout from '../../components/Layout'
import { github } from '../../utils/api'
import IssueItem from '../../components/Issue/Item'
import { Issue } from '../../../types'

interface Props {
  issue: Issue
}

export const IssueTemplate = ({ issue }: Props): JSX.Element => {
  if (!issue) return <>Error when fetching / rendering issue</>

  return (
    <Layout subtitle={issue.title}>
      <IssueItem issue={issue} />
    </Layout>
  )
}

export default IssueTemplate

export async function getServerSideProps({ ...ctx }) {
  const { slug } = ctx.params

  const siteConfig = await import(`../../config/better.json`)

  const result = await github.issues.get({
    owner: siteConfig.projectOrg,
    repo: siteConfig.projectRepo,
    issue_number: slug,
  })

  return {
    props: {
      issue: result.data,
    },
  }
}
