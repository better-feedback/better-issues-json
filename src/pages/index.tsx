import IssueList from "../components/IssueList";
import Layout from "../components/Layout";
import { github } from "../utils/api";

export const Home = (props): JSX.Element => {
  function filterByLabel(issues, labelValue: string) {
    return issues.filter((issue) => {
      if (issue.labels.length > 0) {
        return issue.labels.some((label) => {
          return label.name === labelValue;
        });
      }
    });
  }

  return (
    <Layout siteTitle={props.siteTitle}>
      <div className="grid w-5/6 grid-cols-1 gap-6 mt-10 mb-20 text-gray-800 md:grid-cols-2 xl:grid-cols-3 issue rounded-x5">
        <div className="p-6 bg-white shadow-xl rounded-xl xl:col-span-2">
          &quot;feed style&quot; new issues here (filter by issue &quot;Status:
          Open&quot;)
        </div>
        <a
          href={`${props.projectRepo}/issues/new/choose`}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className="relative h-48 p-6 overflow-hidden bg-white shadow-xl rounded-xl"
            style={{
              background: `
                      radial-gradient(circle at bottom center, #3CBBB1, transparent),
                      radial-gradient(circle at top left, #EE4266, transparent),
                      radial-gradient(circle at top right, #FFEEB0, transparent)`,
            }}
          >
            <div className="absolute -right-8 -bottom-8">
              <svg
                className="w-48 h-48 text-better-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            </div>
            <span className="text-3xl font-poppins text-better-white">
              Open an
              <br />
              issue
            </span>
          </div>
        </a>
      </div>
      <div className="grid w-5/6 grid-cols-1 gap-4 text-gray-800 md:grid-cols-3 issue rounded-xl">
        <div className="relative flex-row self-start bg-white shadow-lg rounded-xl">
          <div className="block w-full p-4 mb-2 text-xl font-medium border-t-8 border-blue-100 issue__main-title rounded-xl">
            Planned
          </div>
          <div className="p-4 pt-0">
            <IssueList
              issues={filterByLabel(props.allItems, "status: planned")}
            />
          </div>
        </div>

        <div className="flex-row self-start bg-white shadow-lg rounded-xl">
          <div className="block w-full p-4 mb-2 text-xl font-medium border-t-8 border-yellow-200 issue__main-title rounded-xl">
            In Progress
          </div>
          <div className="p-4 pt-0">
            <IssueList
              issues={filterByLabel(props.allItems, "status: in progress")}
            />
          </div>
        </div>

        <div className="flex-row self-start bg-white shadow-lg rounded-xl">
          <div className="block w-full p-4 mb-2 text-xl font-medium border-t-8 border-green-200 issue__main-title rounded-xl">
            Completed
          </div>
          <div className="p-4 pt-0">
            <IssueList
              issues={filterByLabel(props.allItems, "status: completed")}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  const siteConfig = await import(`../data/config.json`);

  const result = await github.issues.listForRepo({
    owner: siteConfig.projectOrg,
    repo: siteConfig.projectRepo,
    state: "all",
  });

  const repoIssues = result.data;
  return {
    props: {
      allItems: repoIssues,
      siteTitle: siteConfig.default.title,
      description: siteConfig.default.description,
      projectRepo: siteConfig.default.repositoryUrl,
    },
  };
}
