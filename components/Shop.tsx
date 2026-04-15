"use client";
import { Any } from "next-sanity";
import Container from "./Container";
import { Title } from "./ui/text";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCart from "./ProductCart";

const Shop = ({ categories, brands }: Any) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const brandParams = searchParams?.get("brand");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
 const [selectedCategory, setSelectedCategory] = useState<string | null>(
  searchParams.get("category")
);

 const [selectedBrand, setSelectedBrand] = useState<string | null>(
  searchParams.get("brand")
);

const [selectedPrice, setSelectedPrice] = useState<string | null>(
  searchParams.get("price")
);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000000;

      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `*[_type == 'product' 
             && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
             && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
              && price >= $minPrice && price <= $maxPrice
              ] | order(name asc) {
               ...,
             "categories": categories[]->title
              }`;
      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } },
      );

      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  const params = new URLSearchParams();

  if (selectedCategory) params.set("category", selectedCategory);
  if (selectedBrand) params.set("brand", selectedBrand);
  if (selectedPrice) params.set("price", selectedPrice);

  router.push(`/shop?${params.toString()}`);
}, [selectedCategory, selectedBrand, selectedPrice]);
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, selectedPrice]);
  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the products as your needs
            </Title>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_green underline text-sm mt-2 font-medium hover:text-darkRed hoverEffect text-left px-5"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              setSelectedBrand={setSelectedBrand}
              selectedBrand={selectedBrand}
            />
            <PriceList
              setSelectedPrice={setSelectedPrice}
              selectedPrice={selectedPrice}
            />
          </div>
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is loading . . .
                  </p>
                </div>
              ) : (
                <div>
                  {products?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                      {products?.map((product) => (
                        <ProductCart key={product?._id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <NoProductAvailable className="bg-white mt-0" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Shop;
