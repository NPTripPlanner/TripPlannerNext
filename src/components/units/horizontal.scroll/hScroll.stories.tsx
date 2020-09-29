import React from 'react';
import HorizontalScroll, { IHorizontalScrollState } from './hScroll.comp';
import TrendingItem from '../trending.Item/trending.item.comp';
import { action } from '@storybook/addon-actions';

const imgUrl = 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80';

export default {
  title: 'HorizontalScroll',
};

const getTrendingItem = (imgUrl, title)=>{
    return (
        <TrendingItem 
        imageURL={imgUrl}
        title={title}
        imgWidth={100}
        imgHeight={100}
        />
    )
}
const data = [
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
    getTrendingItem(imgUrl, 'Toronto, CA'),
]

export const Horizontal = () => { 

    return (
        <HorizontalScroll>
        {()=>data}
        </HorizontalScroll>
    )
}

export const HorizontalSpacing = () => { 

    return (
        <HorizontalScroll space={5}>
        {()=>data}
        </HorizontalScroll>
    )
}

export const HorizontalFixWidth = () => { 

    return (
        <HorizontalScroll width={300}>
        {()=>data}
        </HorizontalScroll>
    )
}

export const ScrollState = () => { 

    const handleState = (state:IHorizontalScrollState)=>{
        action('scroll state')(state);
    }
    return (
        <HorizontalScroll 
        onScrollStateChange={handleState}
        >
        {()=>data}
        </HorizontalScroll>
    )
}