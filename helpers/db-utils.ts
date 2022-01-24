import { MongoClient, Sort } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://shmoon2917:I3hfj3uH1lrPbUZg@cluster0.bjux8.mongodb.net/events?retryWrites=true&w=majority'
  );

  return client;
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: { [key: string]: any }
) {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(
  client: MongoClient,
  collection: string,
  sort: Sort,
  filter = {}
) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter) // this changed - we use the "filter" parameter!
    .sort(sort)
    .toArray();

  return documents;
}
