import classes from './logistics-item.module.css';

interface Props {
  icon: React.FC;
}

const LogisticsItem: React.FC<Props> = ({ icon: Icon, children }) => {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default LogisticsItem;
