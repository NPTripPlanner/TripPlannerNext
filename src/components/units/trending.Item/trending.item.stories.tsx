import React from 'react';
import TrendingItem from './trending.item.comp';

const imgUrl = 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80';

export default {
  title: 'TrendingItem',
};

export const NoAutoSize = () => { 

    return (
        <TrendingItem 
        imageURL={imgUrl}
        title='Toronto, CA'
        width={90}
        height={150}
        imgWidth={60}
        imgHeight={60}
        autoResize={false}
        />
    )
}

export const AutoSize = () => { 

    return (
        <TrendingItem 
        imageURL={imgUrl}
        title='Toronto, CA'
        imgWidth={60}
        imgHeight={60}
        cornerRadius={0}
        />
    )
}

