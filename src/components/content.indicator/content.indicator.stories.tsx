import React from 'react';
import ContentIndicator from './content.indicator.comp';
import IndicatorLeft from '../../assets/landingPage/indicator-left.svg';

export default {
  title: 'ContentIndicator',
};

export const Horizontal = () => { 

    return (
        <ContentIndicator
        leftIcon={<IndicatorLeft />}
        isHorizontal={true}
        hState={{
            left: false,
            right: true,
        }}
        />
    )
}

export const Vertical = () => { 

    return (
        <ContentIndicator
        leftIcon={<IndicatorLeft />} 
        isHorizontal={false}
        vState={{
            top:true,
            down:false,
        }}
        />
    )
}

