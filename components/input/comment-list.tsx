import classes from './comment-list.module.css';
import { Comment } from './new-comment';

interface Props {
  items: Comment[];
}

const CommentList: React.FC<Props> = ({ items }) => {
  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
