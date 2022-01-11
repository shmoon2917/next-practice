import React from 'react';
import Link from 'next/link';

const ClientsPage = () => {
  const clients = [
    { id: 'max', name: 'maximaillian' },
    { id: 'semi', name: 'sangho' },
  ];

  return (
    <div>
      <h1>The Clients page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: '/section-3/clients/[id]',
                query: {
                  id: client.id,
                },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
