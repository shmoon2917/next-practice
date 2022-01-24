import { useCallback, useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment, { Comment } from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

interface Props {
  eventId: string;
}

const Comments: React.FC<Props> = ({ eventId }) => {
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (showComments) {
      const getComments = async () => {
        setIsFetching(true);
        const res = await fetch(`/api/comments/${eventId}`);
        const data: { comments: Comment[] } = await res.json();

        setComments(data.comments);
        setIsFetching(false);
      };

      getComments();
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = useCallback(
    async (comment: Comment) => {
      notificationCtx.showNotification({
        title: 'Sending Comment',
        message: 'Your comment is currently being stored into a database',
        status: 'pending',
      });

      try {
        const res = await fetch(`/api/comments/${eventId}`, {
          method: 'POST',
          body: JSON.stringify(comment),
        });

        let data: any;
        if (res.ok) {
          data = await res.json();

          notificationCtx.showNotification({
            title: 'Success',
            message: 'Successfully stored.',
            status: 'success',
          });
        } else {
          data = await res.json();
          throw new Error(data?.message || 'Something went wrong');
        }
      } catch (error: any) {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong',
          status: 'error',
        });
      }
    },
    [eventId, notificationCtx]
  );

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetching && <CommentList items={comments} />}
      {showComments && isFetching && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
