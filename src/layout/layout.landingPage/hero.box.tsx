import { Box } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';
import React from 'react';

export interface IProps {
    children?: React.ReactNode;
}

const getDefaultHeroBoxProps = ()=>{
    return {
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        ml:2,
    }
}

const HeroBox = (props:IProps) => {
    const {
        children
    } = props;

    const downSM = useMediaQuery((theme:Theme)=>theme.breakpoints.down('sm'));
    let heroBoxProps = getDefaultHeroBoxProps();
    if(downSM){
        heroBoxProps["ml"] = 0;
        heroBoxProps['justifyContent'] = 'center';
        heroBoxProps['alignItems'] = 'center';
    }

    return (
        <Box {...heroBoxProps}>
        {children}
        </Box>
    );
};

export default HeroBox;