import { NextApiRequest, NextApiResponse } from 'next';
import { Comment, CommentForm } from '../../../components/input/new-comment';
import { MongoClient, Document, WithId } from 'mongodb';
import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from '../../../helpers/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId as string;

  let client: MongoClient;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the DB failed' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = JSON.parse(req.body);

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      client.close();
      return;
    }

    const newComment: CommentForm = {
      email,
      name,
      text,
      eventId,
    };

    try {
      await insertDocument(client, 'comments', newComment);
      res.status(201).json({ message: 'Added Comment', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed' });
    }
  } else if (req.method === 'GET') {
    let documents: WithId<Document>[];
    try {
      documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId }
      );

      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed' });
    }
  }

  client.close();
}

export default handler;
