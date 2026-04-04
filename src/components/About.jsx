import React from 'react';
import StoreComp from '../reuse/StoreComp';

const About = () => {
    return (
        <>
            <div className="py-20 pt-0 lg:pt-20 bg-white dark:bg-gray-950 transition-colors duration-300">
                <StoreComp title="Ecommerce Site" image="/sasta-mart/ecommerce-site.png"/>
            </div>
        </>
    )
}

export default About
