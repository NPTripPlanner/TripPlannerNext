import { Box } from '@material-ui/core';
import React from 'react';
import HorizontalScroll, {IHorizontalScrollState} from '../units/horizontal.scroll/hScroll.comp';
import ContentIndicator from '../../components/units/content.indicator/content.indicator.comp';

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
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='flext-start'>
            <Box width='min-content' ml={2}>
                <ContentIndicator 
                leftIcon={<IndicatorLeft />}
                iconSize={10}
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