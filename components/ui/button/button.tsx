import Link from 'next/link';
import React from 'react';

import classes from './button.module.css';

interface Props {
  link?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, link, onClick }) => {
  return !!link ? (
    <Link href={link as string}>
      <a className={classes.btn}>{children}</a>
    </Link>
  ) : (
    <button onClick={onClick} className={classes.btn}>
      {children}
    </button>
  );
};

export default Button;
