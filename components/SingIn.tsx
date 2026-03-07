import { SignUpButton } from '@clerk/nextjs';
import React from 'react';

const SingIn = () => {
    return (
          <SignUpButton mode='modal'>
        <button className='text-sm font-semibold hover:text-darkColor hoverEffect text-lightColor hover:cursor-pointer'>Login</button>
        </SignUpButton>
    );
};

export default SingIn;