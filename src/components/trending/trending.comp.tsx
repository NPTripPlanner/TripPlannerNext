import { Box } from '@material-ui/core';
import React from 'react';
import HorizontalScroll, {IHorizontalScrollState} from '../horizontal.scroll/hScroll.comp';
import ContentIndicator from '../content.indicator/content.indicator.comp';

import IndicatorLeft from '../../assets/landingPage/indicator-left.svg';

export interface IProps {
    items: React.ReactNode[];
}

const Trending = (props:IProps) => {
    const {
        items,
    } = props;

    const [scrollState, setScrollState] = React.useState<IHorizontalScrollState>({
        endLeft: true,
        endRight: true,
    });

    const handleScrollState = (state:IHorizontalScrollState)=>{
        setScrollState(state);
    }

    return (
        <Box width='inherit' display='flex' flexDirection='column' justifyContent='center' alignItems='flext-start'>
            <Box width='min-content'>
                <ContentIndicator 
                leftIcon={<IndicatorLeft />}
                isHorizontal={true}
                hState={{left:!scrollState.endLeft, right:!scrollState.endRight}}
                />
            </Box>
            <HorizontalScroll
            onScrollStateChange={handleScrollState}
            >
            {()=>items}
            </HorizontalScroll>
        </Box>
    );
};

export default Trending;