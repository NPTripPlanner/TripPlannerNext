import { Box, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import {Theme} from '@material-ui/core/styles';
import style from './layout.landingPage.style';
import React from 'react';

export interface IProps {
    heroImgURL: string;
    heroTitle: React.ReactNode;
    heroSubtitle: React.ReactNode;
    dest: React.ReactNode;
    trending: React.ReactNode;
    expandIcon: React.ReactNode;
}

const getDefaultHeroBoxProps = ()=>{
    return {
        width:'inherit',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        ml:2,
    }
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

const LayoutLandingPage = (props:IProps) => {
    const {
        heroImgURL,
        heroTitle,
        heroSubtitle,
        dest,
        trending,
        expandIcon
    } = props;

    const classes = makeStyles(style)();

    const downLG = useMediaQuery((theme:Theme)=>theme.breakpoints.down('sm'));

    let heroImgBoxProps = getDefaultHeroImgBoxProps();
    if(downLG){
        heroImgBoxProps["mr"] = 0;
        heroImgBoxProps["p"] = '5%';
    }

    let heroBoxProps = getDefaultHeroBoxProps();
    if(downLG){
        heroBoxProps["ml"] = 0;
        heroBoxProps['justifyContent'] = 'center';
        heroBoxProps['alignItems'] = 'center';
    }

    return (
        <Grid container>
            {/* hero image box */}
            <Grid item xs={12} md={6}>
                <Box {...heroImgBoxProps}>
                    <img className={classes.img} src={heroImgURL} alt='hero image' />
                </Box>
            </Grid>
            {/* hero box */}
            <Grid item xs={12} md={6}>
                <Box {...heroBoxProps}>
                    {heroTitle}
                    {heroSubtitle}
                    <Box width='auto' pt={7}>
                    {dest}
                    </Box>
                    <Box width='100%' pt={7}>
                    {trending}
                    </Box>
                </Box>
            </Grid>
            {/* expand icon */}
            <Grid item xs={12}>
                <Box width='inherit' p={2} display='flex' justifyContent='center' alignItems='center'>
                    <Box className={classes.expandIcon} width='40px' height='60px' borderRadius='50px' display='flex' justifyContent='center'alignItems='center'>
                        {expandIcon}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LayoutLandingPage;