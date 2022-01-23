import { NextApiRequest, NextApiResponse } from 'next';
import { buildFeedbackPath, extractFeedback } from '.';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const feedbackId = req.query.id;
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  const selectedFeedback = data.find((item) => item.id === feedbackId);

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
