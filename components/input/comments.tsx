import { useState } from 'react';

import CommentList from './comment-list';
import NewComment, { Comment } from './new-comment';
import classes from './comments.module.css';

interface Props {
  eventId: string;
}

const Comments: React.FC<Props> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = (comment: Comment) => {
    // send data to API
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList />}
    </section>
  );
};

export default Comments;
