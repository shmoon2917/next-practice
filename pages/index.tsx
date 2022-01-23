import React, { FormEvent, useRef, useState } from 'react';

export interface Feedback {
  id: string;
  email: string;
  text: string;
}

const HomePage: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      email: emailInputRef.current?.value,
      text: feedbackInputRef.current?.value,
    };

    const res = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    console.log(data);
  };

  const loadFeedbackHandler = async () => {
    const res = await fetch('/api/feedback');
    const data: { feedback: Feedback[] } = await res.json();
    setFeedbackItems(data.feedback);
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <label htmlFor='email'>Your Email Address</label>
        <input ref={emailInputRef} type='email' id='email' />
        <label htmlFor='feedback'>Your Feedback</label>
        <textarea ref={feedbackInputRef} id='feedback' rows={5} />
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
