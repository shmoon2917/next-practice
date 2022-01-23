import { GetStaticProps } from 'next';
import React, { Fragment, useState } from 'react';
import { Feedback } from '..';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

interface Props {
  feedbackItems: Feedback[];
}

const FeedbackPage: React.FC<Props> = ({ feedbackItems }) => {
  const [feedback, setFeedback] = useState<Feedback>();

  const loadFeedbackHandler = async (id: string) => {
    const res = await fetch(`/api/feedback/${id}`);
    const data: { feedback: Feedback } = await res.json();

    setFeedback(data.feedback);
  };

  return (
    <Fragment>
      {feedback && <p>{feedback.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default FeedbackPage;
