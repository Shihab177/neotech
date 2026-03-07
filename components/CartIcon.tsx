import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CartIcon = () => {
    return (
        <Link href={'/cart'} className='group relative '>
            <ShoppingBag className='h-5 w-5 hover:text-shop_light_green hoverEffect'/>
            <span className='absolute -top-1 -right-1 bg-shop_dark_green text-white h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center'>1</span>
        </Link>
    );
};

export default CartIcon;