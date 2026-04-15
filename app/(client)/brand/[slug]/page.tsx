import React from 'react';

interface Props {
  params: {
    slug: string;
  };
}
const BrandPage = async({params}:Props) => {
    const {slug} = await params
    return (
        <div>
            <h1>brand Page:{slug}</h1>
        </div>
    );
};

export default BrandPage;