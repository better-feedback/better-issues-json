import React from "react";
import Layout from "../../components/Layout";
import IssueTags from "../../components/IssueTags";
import ReactMarkdown from "react-markdown";
import { formatDate } from "../../utils/text";
import { github } from "../../utils/api";
import { useLikeIssue } from "../../hooks/issue";

export const IssueTemplate = (props): JSX.Element => {
  const { data, isValidating, likeIssue, dislikeIssue, didLike } = useLikeIssue(
    props.issueData.number
  );

  const handleClickLike = async () => {
    await likeIssue();
  };

  const handleClickDislike = async () => {
    await dislikeIssue();
  };

  if (!props.issueData) return <>Error when fetching / rendering issue</>;

  return (
    <Layout siteTitle={props.siteTitle}>
      <div className="flex items-start w-5/6 space-x-6 text-gray-800 issue rounded-xl">
        <div className="w-1/3 bg-white shadow-lg issue rounded-xl">
          <div className="p-6 space-y-5 text-sm text-gray-600">
            <div>
              <span className="block text-xs font-medium uppercase text-better-black">
                Popularity
              </span>
              {data?.likesCount}
            </div>

            <div>
              <span className="block text-xs font-medium uppercase text-better-black">
                Total funded
              </span>
              <div>Funded in USER_CURR, click for details</div>
            </div>

            <div className="py-2">
              <span className="text-xs font-medium uppercase text-better-black">
                Funding goal
              </span>
              <div className="relative">
                <div className="flex h-2 mx-2 mb-4 overflow-hidden text-xs bg-pink-200 rounded">
                  <div
                    style={{ width: "30%" }}
                    className="flex flex-col justify-center text-center text-white shadow-none bg-better-red whitespace-nowrap"
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium uppercase text-better-black">
                Author
              </span>
              <div>
                <a
                  href={props.issueData.user.html_url}
                  rel="noreferrer"
                  target="_blank"
                  title="Open author's github profile"
                >
                  {props.issueData.user.login}
                </a>
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium uppercase text-better-black">
                Funders
              </span>
            </div>
          </div>
          <div className="flex issue__sidebar-buttons">
            <div className="w-1/2 text-center bg-better-yellow rounded-bl-xl font-poppins">
              {didLike ? (
                <button
                  className={`w-full h-full p-4 ${
                    isValidating && "cursor-not-allowed"
                  }`}
                  onClick={handleClickDislike}
                  disabled={isValidating}
                >
                  <svg
                    className="inline w-6 h-6 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                  </svg>
                  <span className="font-bold align-middle">DISLIKE</span>
                </button>
              ) : (
                <button
                  className={`w-full h-full p-4 ${
                    isValidating && "cursor-not-allowed"
                  }`}
                  onClick={handleClickLike}
                  disabled={isValidating}
                >
                  <svg
                    className="inline w-6 h-6 mx-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span className="font-bold align-middle">LIKE</span>
                </button>
              )}
            </div>
            <div className="w-1/2 text-center bg-better-green rounded-br-xl font-poppins">
              <button className="w-full h-full p-4">
                <svg
                  className="inline w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-base font-bold align-middle">FUND</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-2/3 p-6 bg-white shadow-lg rounded-xl issue__main">
          <div className="mb-6 issue__main-header">
            <div className="flex mb-1">
              <span className="text-xl font-medium issue__main-title">
                {props.issueData.title}
              </span>
              <div className="ml-auto">
                <a
                  className="flex p-1 bg-gray-200 rounded-3xl"
                  href={props.issueData.html_url}
                  rel="noreferrer"
                  target="_blank"
                  title="Open original issue"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-xs font-medium text-gray-600 uppercase issue__main-type">
              feature request
            </div>
          </div>

          <div className="text-gray-800 issue__body">
            <ReactMarkdown>{props.issueData.body}</ReactMarkdown>
          </div>
          <div className="my-3">
            <hr className="mb-2" />
            <IssueTags tags={props.issueData.labels} />
          </div>
          <div className="flex flex-row justify-between px-1 text-xs text-gray-400">
            <div className="w-1/2">
              <div className="font-medium uppercase">Created</div>
              <div>{formatDate(props.issueData.created_at)}</div>
            </div>
            <div className="w-1/2 text-right">
              <div className="block font-medium uppercase">Modified</div>
              <div>{formatDate(props.issueData.updated_at)}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IssueTemplate;

export async function getServerSideProps({ ...ctx }) {
  const { slug } = ctx.params;

  const siteConfig = await import(`../../data/config.json`);

  const result = await github.issues.get({
    owner: siteConfig.projectOrg,
    repo: siteConfig.projectRepo,
    issue_number: slug,
  });

  const repoIssue = result.data;

  return {
    props: {
      issueData: repoIssue,
      siteTitle: siteConfig.default.title,
      description: siteConfig.default.description,
      projectRepo: siteConfig.default.repositoryUrl,
    },
  };
}
