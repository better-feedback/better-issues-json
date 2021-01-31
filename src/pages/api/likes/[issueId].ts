import { NextApiRequest, NextApiResponse } from "next";

import { likeIssue, dislikeIssue, getLikes } from "../../../utils/db";

export default async function likesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { issueId },
    body: { like, dislike },
    method,
  } = req;

  switch (method) {
    case "GET": {
      const { likesCount = 0 } = (await getLikes(issueId)) || {};
      res.status(200).json({ issueId, likesCount });
      break;
    }
    case "PUT": {
      if (like) {
        await likeIssue(issueId);
      }

      if (dislike) {
        await dislikeIssue(issueId);
      }

      const { likesCount } = await getLikes(issueId);
      res.status(200).json({ issueId, likesCount });
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
