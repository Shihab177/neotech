"use client";
import React, { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants/data";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import NoProductAvailable from "./NoProductAvailable";

import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import ProductCart from "./ProductCart";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0].title || "");
  const query = `*[_type == "product" && variant == $variant] | order(name desc) {
  ...,
  "categories": categories[]->title
}`;

  const params = { variant: selectedTab.toLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.error("Product fetching Error:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedTab]);
  return (
    <div className="">
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center  min-h-80 gap-4 bg-gray-100 w-full mt-8">
          <div className="space-x-2 flex items-center text-blue-600">
            <Loader2 className="w-5 h-6 animate-spin" />
            <span>Product is loading...</span>
          </div>
        </div>
      ) : products?.length ? (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products?.map((product) => (
            <AnimatePresence key={product?._id}>
              <motion.div
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCart product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} className="mt-8" />
      )}
    </div>
  );
};

export default ProductGrid;
