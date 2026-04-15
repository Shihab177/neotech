import NoAccess from "@/components/NoAccess";
import WishlistProduct from "@/components/WishlistProduct";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();
  
  return (
    <>
      {user ? (
       <WishlistProduct/>
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don't miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;