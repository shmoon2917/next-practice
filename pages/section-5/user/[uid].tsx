import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {
  id: string;
}

const UserIdPage: React.FC<Props> = ({ id }) => {
  return <h1>{id}</h1>;
};

export default UserIdPage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { params } = context;

  const userId = params?.uid;

  return {
    props: {
      id: `userid-${userId}`,
    },
  };
};
