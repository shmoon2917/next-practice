import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { connectDatabase, insertDocument } from '../../helpers/db-utils';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const email = req.body?.email as string;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    let client: MongoClient;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the DB failed' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed' });
      return;
    }

    res.status(201).json({ message: 'Signed Up!' });
  }
}

export default handler;
