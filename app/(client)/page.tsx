import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";
// import Image from "next/image";

export default async function Home() {
  const categories = await getCategories(3)
  
  return (
    <Container className="">
      <HomeBanner />
      <div className="pt-10">
        <ProductGrid />
      </div>
      <HomeCategories categories = {categories}/>
      <ShopByBrands/>
      <LatestBlog/>
    </Container>
  );
}
