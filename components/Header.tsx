import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SingIn from "./SingIn";
import MobileMenu from "./MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignIn, UserButton } from "@clerk/nextjs";

export default async function Headerc() {
  const user = await currentUser();
  console.log(user);
  return (
    <header className="bg-white py-5 border-b border-b-black/20">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5  md:gap-0 justify-start">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>
            <UserButton></UserButton>
             {!user &&  <SingIn />}
           
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
}
