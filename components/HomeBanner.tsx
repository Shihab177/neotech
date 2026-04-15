import Link from "next/link";
import { Title } from "./ui/text";
import Image from "next/image";
import { banner_1 } from "@/images";

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-shop-light-pink rounded-b-lg px-10 md:px-24 flex items-center justify-between">
      <div className="flex flex-col justify-center gap-y-5">
        <Title>
          Grab Upto 50% off on <br /> Selected Headphone
        </Title>
        <Link
          href={"/shop"}
          className="w-fit bg-shop_dark_green/90 text-white px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop_dark_green hoverEffect"
        >
          Buy Now
        </Link>
      </div>
      <div className="hidden md:block">
        <Image 
          src={banner_1} 
          alt="banner" 
          priority 
          className="w-96 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default HomeBanner;