
import Container from '@/components/Container';
import ProductCart from '@/components/ProductCart';
import { Title } from '@/components/ui/text';
import { getDealProducts } from '@/sanity/queries';
import { Any } from 'next-sanity';
import React from 'react'

const DealPage = async () => {
  // Fetching data directly in the Server Component
  const products = await getDealProducts();

  return (
    <div className="py-10 bg-deal-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product : Any) => (
            <ProductCart 
              key={product?._id} 
              product={product} 
            />
          ))}
        </div>
      </Container>
    </div>
  );
};


export default DealPage