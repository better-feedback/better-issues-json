import React, { useState } from "react";

import Layout from "../../components/Layout";
import IssueTags from "../../components/IssueTags";
import ReactMarkdown from "react-markdown";
import { github } from "../../utils/api";

export const IssueTemplate = (props): JSX.Element => {
  const likedIssues = JSON.parse(localStorage.getItem("likedIssues") || "[]");
  const [didLike, setDidLike] = useState(
    likedIssues.includes(props.issueData.number)
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleClickLike = async () => {
    try {
      setDidLike(true);
      setIsLoading(true);

      await fetch(`/api/likes/${props.issueData.number}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          issueId: props.issueData.number,
          like: true,
        }),
      });

      localStorage.setItem(
        "likedIssues",
        JSON.stringify([...likedIssues, props.issueData.number])
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickDislike = async () => {
    try {
      setDidLike(false);
      setIsLoading(true);

      await fetch(`/api/likes/${props.issueData.number}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          issueId: props.issueData.number,
          dislike: true,
        }),
      });

      localStorage.setItem(
        "likedIssues",
        JSON.stringify(
          likedIssues.filter(
            (issueNumber) => issueNumber != props.issueData.number
          )
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!props.issueData) return <>Error when fetching / rendering issue</>;

  return (
    <Layout siteTitle={props.siteTitle}>
      <div className="flex items-start w-5/6 space-x-6 text-gray-800 issue rounded-xl">
        <div className="w-1/3 bg-white shadow-lg issue rounded-xl">
          <div className="p-6">
            sidebar content goes here asdf asdf asdf asdf
            <div className="py-2">
              <span className="text-xs font-medium uppercase text-better-black">
                Funding goal
              </span>
              <div className="relative">
                <div className="flex h-2 mb-4 overflow-hidden text-xs bg-pink-200 rounded">
                  <div
                    style={{ width: "30%" }}
                    className="flex flex-col justify-center text-center text-white shadow-none bg-better-red whitespace-nowrap"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex issue__sidebar-buttons">
            <div className="w-1/2 text-center bg-better-yellow rounded-bl-xl font-poppins">
              {didLike ? (
                <button
                  className="w-full h-full p-4"
                  onClick={handleClickDislike}
                  disabled={isLoading}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                    />
                  </svg>
                  <span className="font-bold align-middle">DISLIKE</span>
                </button>
              ) : (
                <button
                  className="w-full h-full p-4"
                  onClick={handleClickLike}
                  disabled={isLoading}
                >
                  <svg
                    className="inline w-6 h-6 mr-2"
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
          <div className="my-3 space-x-2">
            <hr className="mb-2" />
            <IssueTags tags={props.issueData.labels} />
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
