import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";

const IS_SERVER = typeof window === "undefined";

const fetcher = (...args) => fetch(args[0]).then((res) => res.json());

const emptyArray = [];

export function useLikeIssue(issueId: string) {
  const likedIssues = IS_SERVER
    ? emptyArray
    : JSON.parse(localStorage.getItem("likedIssues") || "[]");
  const [didLike, setDidLike] = useState(likedIssues.includes(issueId));
  const { data, error, isValidating } = useSWR(
    `/api/likes/${issueId}`,
    fetcher
  );

  useEffect(() => {
    if (data?.likesCount && !IS_SERVER) {
      localStorage.setItem(
        "likedIssues",
        JSON.stringify([...likedIssues, issueId])
      );
    }
  }, [data, likedIssues, issueId]);

  async function likeIssue() {
    setDidLike(true);
    await mutate(`/api/likes/${issueId}`, async () => {
      const updatedIssue = await fetch(`/api/likes/${issueId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          issueId,
          like: true,
        }),
      });
      return updatedIssue;
    });

    if (!IS_SERVER) {
      localStorage.setItem(
        "likedIssues",
        JSON.stringify([...likedIssues, issueId])
      );
    }
  }

  async function dislikeIssue() {
    setDidLike(false);
    await mutate(`/api/likes/${issueId}`, async () => {
      const updatedIssue = await fetch(`/api/likes/${issueId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          issueId,
          dislike: true,
        }),
      });
      return updatedIssue;
    });

    if (!IS_SERVER) {
      localStorage.setItem(
        "likedIssues",
        JSON.stringify(
          likedIssues.filter((issueNumber) => issueNumber != issueId)
        )
      );
    }
  }

  return {
    didLike,
    likeIssue,
    dislikeIssue,
    isValidating,
    error,
  };
}
