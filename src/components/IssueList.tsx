import Link from "next/link";
// import ReactMarkdown from "react-markdown";

const IssueList = ({ allIssues }) => {
  // function truncateSummary(content: string) {
  //   return content.slice(0, 200).trimEnd();
  // }

  // function reformatDate(fullDate) {
  //   const date = new Date(fullDate);
  //   return date.toDateString().slice(4);
  // }

  return (
    <>
      <ul className="list">
        {allIssues.length > 1 &&
          allIssues.map((issue) => (
            <Link
              key={issue.slug}
              href={{ pathname: `/issue/${issue.number}` }}
            >
              <a>
                <li>{JSON.stringify(issue)}</li>
              </a>
            </Link>
          ))}
      </ul>
    </>
  );
};

export default IssueList;
