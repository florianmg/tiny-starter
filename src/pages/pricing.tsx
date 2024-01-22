import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next/types';
import { FC } from 'react';

import { useTranslation } from 'next-i18next';

import { db } from '@/configs/admin.firebase';
import { PageWrapperWithNavBar } from '@/components/page-wrapper-with-navbar';

type Product = {
  productId: string;
  priceId: string;
  role: string;
  name: string;
  description: string;
  unit_amount: number;
  currency: string;
  interval: string;
};

type ProductsPageProps = {
  products: Product[];
};

const Pricing: FC<ProductsPageProps> = ({ products }) => {
  const { t } = useTranslation();

  const displayFeatures = (productRole: string) => {
    const features = t(`pricing:features.${productRole}`, {
      returnObjects: true,
    });

    return (
      <ul>
        {(features as string[]).map((feature: string, index: number) => (
          <ul key={index}>
            <li>{feature}</li>
          </ul>
        ))}
      </ul>
    );
  };

  if (!products || products.length === 0)
    return (
      <PageWrapperWithNavBar isContentCentered>
        <p>{t('pricing:empty')}</p>
      </PageWrapperWithNavBar>
    );
  return (
    <PageWrapperWithNavBar className="pt-24 space-y-20">
      <h1 className="font-extrabold text-center text-7xl">
        {t('pricing:pageTitle')}
      </h1>
      <div className="flex flex-col items-center justify-center sm:flex-row gap-6">
        {products.map((product) => (
          <div
            className="card w-72 bg-base-100 shadow-xl"
            key={product.priceId}
          >
            <div className="card-body">
              <h2 className="card-title text-3xl">{product.name}</h2>
              <p>{product.description}</p>
              <p className="font-extrabold mt-3">
                <span className="text-5xl">
                  {product.unit_amount / 100}
                  {t(`pricing:${product.currency}`)}
                </span>{' '}
                <span className="text-xl text-gray-400">
                  /{t(`pricing:${product.interval}`)}
                </span>
              </p>
              <div className="mt-6">{displayFeatures(product.role)}</div>
              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary">
                  {t('pricing:choose')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageWrapperWithNavBar>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  async function fetchProducts() {
    const querySnapshot = await db
      .collection('products')
      .where('active', '==', true)
      .get();

    const products: Product[] = [];

    for (const doc of querySnapshot.docs) {
      const priceSnap = await doc.ref
        .collection('prices')
        .where('active', '==', true)
        .get();

      const productData = doc.data();
      const priceData = priceSnap.docs[0].data();

      products.push({
        productId: doc.id,
        priceId: priceSnap.docs[0].id,
        role: productData.role,
        name: productData.name,
        description: productData.description,
        unit_amount: priceData.unit_amount,
        currency: priceData.currency,
        productInfos: priceData.product,
        interval: priceData.recurring.interval,
      } as Product);
    }

    return products;
  }

  const products = await fetchProducts();

  return {
    props: {
      products,
      ...(await serverSideTranslations(context.locale || 'en', [
        'pricing',
        'firebase',
        'common',
      ])),
    },
  };
}

export default Pricing;
