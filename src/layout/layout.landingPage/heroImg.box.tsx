import { Box } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import React from 'react';

export interface IProps {
    children?: React.ReactNode;
}

const getDefaultHeroImgBoxProps = ()=>{
    return {
        width:'inherit',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        mr:2,
    }
}

const HeroImageBox = (props:IProps) => {
    const {
        children
    } = props;

    const downLG = useMediaQuery((theme:Theme)=>theme.breakpoints.down('sm'));

    let heroImgBoxProps = getDefaultHeroImgBoxProps();
    if(downLG){
        heroImgBoxProps["mr"] = 0;
        heroImgBoxProps["p"] = '5%';
    }

    return (
        <Box {...heroImgBoxProps}>
        {children}
        </Box>
    );
};


export default HeroImageBox;