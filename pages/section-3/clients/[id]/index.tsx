import { useRouter } from 'next/router';
import React from 'react';

const ClientProjectsPage = () => {
  const router = useRouter();

  function loadProjectHandler() {
    router.push({
      pathname: '/section-3/clients/[id]/[clientprojectid]',
      query: { id: 'max', clientprojectid: 'projecta' },
    });
  }

  return (
    <div>
      <h1>projects of a given client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
