import { GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

type Sale = {
  id?: string;
  username: string;
  volume: number;
};

interface Props {
  sales: Sale[];
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const LastSalesPage: React.FC<Props> = ({ sales: initialSales }) => {
  const [sales, setSales] = useState<Sale[]>(initialSales);

  const { data, error } = useSWR<{ [key: string]: Sale }>(
    'https://next-js-bf3c8-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log(data);
      const transformedSales: Sale[] = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch(
    'https://next-js-bf3c8-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
  );
  const data: { [key: string]: Sale } = await res.json();

  const transformedSales: Sale[] = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
};

export default LastSalesPage;
