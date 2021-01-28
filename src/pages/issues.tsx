import Layout from "../components/Layout";
import { github } from "../utils/api";
import { getFirstMatchingLabel } from "../utils/issue";
import { truncateText } from "../utils/text";
import Link from "next/link";

export const Issues = (props): JSX.Element => {
  return (
    <Layout siteTitle={props.siteTitle}>
      <div className="mt-10 text-gray-800 issue rounded-xl">
        <div className="relative flex-row self-start bg-white shadow-lg rounded-xl">
          <div className="block w-full p-4 mb-2 text-xl font-medium border-t-8 border-better-purple issue__main-title rounded-xl">
            All Issues
          </div>
          <div className="">
            <div className="flex">
              <div className="-my-2 overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle">
                  <div className="border-none rounded-none">
                    <table className="min-w-full mb-4 divide-y divide-gray-200">
                      <thead className="bg-gradient-to-b to-gray-100 from-transparent">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            State
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {props.issues.length > 0 &&
                          props.issues.map((issue) => (
                            <tr key={issue.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold">
                                  <Link
                                    key={issue.id}
                                    href={{
                                      pathname: `/issue/${issue.number}`,
                                    }}
                                  >
                                    {truncateText(issue.title, 180)}
                                  </Link>
                                </div>
                                <div className="flex justify-between mt-1 text-xs font-medium text-gray-400 uppercase">
                                  <div>
                                    {getFirstMatchingLabel(
                                      issue.labels,
                                      "type:"
                                    )}
                                  </div>
                                  <div className="relative w-1/3">
                                    <div className="flex h-2 mb-4 overflow-hidden text-xs rounded bg-better-red bg-opacity-20">
                                      <div
                                        style={{ width: "30%" }}
                                        className="flex flex-col justify-center text-center text-white shadow-none bg-better-red bg-opacity-40 whitespace-nowrap"
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-xs font-medium text-gray-500 capitalize whitespace-nowrap">
                                {getFirstMatchingLabel(issue.labels, "status:")}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 text-xs font-medium text-gray-500 capitalize rounded-full">
                                  {issue.state}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Issues;

export async function getServerSideProps() {
  const siteConfig = await import(`../data/config.json`);

  const result = await github.issues.listForRepo({
    owner: siteConfig.projectOrg,
    repo: siteConfig.projectRepo,
  });

  const repoIssues = result.data;
  return {
    props: {
      issues: repoIssues,
      siteTitle: siteConfig.default.title,
      description: siteConfig.default.description,
      projectRepo: siteConfig.default.repositoryUrl,
    },
  };
}
