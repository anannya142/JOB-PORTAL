import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='container px-4  2xl:px-20 mx-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
         <div onClick={() => navigate("/")} className="cursor-pointer">
                  <img src={assets.logo} className="block dark:hidden h-8" />
                  <img src={assets.logo_dark} className="hidden dark:block h-8" />
        </div>
        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 dark:text-gray-200 max-sm:hidden'>Copyright @Anannyastack.dev | All right reserved.</p>
        <div className='flex gap-2.5'>
          <div>
            <img src={assets.facebook_icon} className="block dark:hidden h-8" alt="" />
             <img src={assets.facebook_icon_dark} className="hidden dark:block h-8" alt="" />
          </div>
            <div>
              <img src={assets.twitter_icon} className="block dark:hidden h-8" alt="" />
               <img src={assets.twitter_icon_dark}  className="hidden dark:block h-8" alt="" />
            </div>
            <div>
              <img src={assets.instagram_icon} className="block dark:hidden h-8" alt="" />
               <img src={assets.instagram_icon_dark} className="hidden dark:block h-8" alt="" />
            </div>
            
        </div>
    </div>
  )
}

export default Footer;