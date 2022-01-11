import React, { Fragment, useEffect } from 'react';
import fs from 'fs/promises';
import path from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Product } from '..';

interface Props {
  loadedProduct: Product;
}

const ProductDetailPage: React.FC<Props> = ({ loadedProduct }) => {
  // fallback 대기 시간을 위해서
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  console.log(loadedProduct);

  const { title, description } = loadedProduct;

  return (
    <Fragment>
      <h1>{title}</h1>
      <p>{description}</p>
    </Fragment>
  );
};

interface ContextParams extends ParsedUrlQuery {
  pid: string;
}

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data: { products: Product[] } = JSON.parse(jsonData.toString());

  return data;
};

export const getStaticProps: GetStaticProps<Props, ContextParams> = async (
  context
) => {
  const pid = context.params?.pid;

  if (!pid) {
    return {
      notFound: true,
    };
  }

  const data = await getData();

  if (!data?.products?.length) {
    return {
      notFound: true,
    };
  }

  const product = data.products.find((product) => product.id === pid);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true, // boolean | 'blocking'
  };
};

export default ProductDetailPage;
