import Link from "next/link";

// TODO: Move to a common utils file
const IssueList = (props) => {
  function truncateText(content: string, length: number) {
    if (content.length > length) {
      return content.slice(0, length).trimEnd() + "...";
    }
    return content;
  }

  // function reformatDate(fullDate) {
  //   const date = new Date(fullDate);
  //   return date.toDateString().slice(4);
  // }

  return (
    <>
      <ul>
        {props.issues.length > 0 &&
          props.issues.map((issue) => (
            <Link key={issue.id} href={{ pathname: `/issue/${issue.number}` }}>
              <a>
                <li className="mb-4">
                  <div className="block text-sm font-medium">
                    {truncateText(issue.title, 200)}
                  </div>
                  <div className="block mt-1 text-xs font-medium text-gray-400 uppercase">
                    issue type
                  </div>
                </li>
              </a>
            </Link>
          ))}
      </ul>
    </>
  );
};

export default IssueList;
