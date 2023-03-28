import React from 'react';
import { tw } from 'xtwind';

export default function (props) {
    const { main } = props;

    const header = main?.header || {};

    const { title } = header;

    return (
        <footer className={tw`bg-white`}>
            <div className={tw`mx-auto max-w-7xl py-12 px-6 md:flex md:items-center md:justify-between lg:px-8`}>
                <div className={tw`flex justify-center space-x-6 md:order-2`}></div>
                <div className={tw`mt-8 md:order-1 md:mt-0`}>
                    <p className={tw`text-center text-xs leading-5 text-gray-500`}>&copy; {title}</p>
                </div>
            </div>
        </footer>
    );
}
