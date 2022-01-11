import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {
  username: string;
}

const UserProfile: React.FC<Props> = () => {
  return <h1>Max</h1>;
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { params, req, res } = context;

  console.log('Server Side Props');

  return {
    props: {
      username: 'Max',
    },
  };
};
