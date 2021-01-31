import { MongoClient } from "mongodb";

const DB_NAME = "better-db";
const ISSUES_META_DATA_COLLECTION_NAME = "issues_meta_data";

const mongoClient = MongoClient(process.env.MONGO_DB_CONNECT);

export async function likeIssue(issueId) {
  return connectDecorator((collection) =>
    collection.updateOne(
      {
        id: issueId,
      },
      {
        $setOnInsert: {
          id: String(issueId),
        },
        $inc: {
          likesCount: 1,
        },
      },
      { upsert: true }
    )
  );
}

export async function dislikeIssue(issueId) {
  return connectDecorator((collection) =>
    collection.updateOne(
      {
        id: issueId,
      },
      {
        $set: {
          id: String(issueId),
        },
        $inc: {
          likesCount: -1,
        },
      },
      { upsert: true }
    )
  );
}

export async function getLikes(issueId) {
  return connectDecorator((collection) =>
    collection.findOne({
      id: issueId,
    })
  );
}

export async function getLikesOfManyIssues(issueIds) {
  return connectDecorator(async (collection) => {
    const cursor = await collection.find({
      id: { $in: issueIds.map((issueId) => String(issueId)) },
    });
    return await cursor.toArray();
  });
}

export async function connectDecorator(func) {
  await mongoClient.connect();

  const db = mongoClient.db(DB_NAME);
  const collection = db.collection(ISSUES_META_DATA_COLLECTION_NAME);
  return func(collection);
}

export async function disconnect() {
  await mongoClient.close();
}
