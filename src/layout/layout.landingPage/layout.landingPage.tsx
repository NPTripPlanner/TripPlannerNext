import { Box, Grid, makeStyles } from '@material-ui/core';
import HeroImageBox from './heroImg.box';
import HeroBox from './hero.box';
import style from './layout.landingPage.style';
import React from 'react';

export interface IProps {
    heroImgURL: string;
    heroTitle: React.ReactNode;
    heroSubtitle: React.ReactNode;
    dest: React.ReactNode;
    trending: React.ReactNode;
    expandIcon: React.ReactNode;
    detailTitle: React.ReactNode;
    detailSubtitle: React.ReactNode;
}

const LayoutLandingPage = (props:IProps) => {
    const {
        heroImgURL,
        heroTitle,
        heroSubtitle,
        dest,
        trending,
        expandIcon,
        detailTitle,
        detailSubtitle,
    } = props;

    const classes = makeStyles(style)();

    return (
        <Grid container>
            {/* hero image box */}
            <Grid item xs={12} md={6}>
                <HeroImageBox>
                    <img className={classes.img} src={heroImgURL} alt='hero image' />
                </HeroImageBox>
            </Grid>
            {/* hero box */}
            <Grid item xs={12} md={6}>
                <HeroBox>
                    {heroTitle}
                    {heroSubtitle}
                    <Box width='auto' pt={7}>
                    {dest}
                    </Box>
                    <Box width='100%' pt={7}>
                    {trending}
                    </Box>
                </HeroBox>
            </Grid>
            {/* expand icon */}
            <Grid item xs={12}>
                <Box width='inherit' p={2} display='flex' justifyContent='center' alignItems='center'>
                    <Box 
                    className={classes.expandIcon} 
                    width='40px' 
                    height='60px' 
                    borderRadius='50px' 
                    display='flex' 
                    justifyContent='center'
                    alignItems='center'>
                        {expandIcon}
                    </Box>
                </Box>
            </Grid>
            {/* detail title */}
            <Grid item xs={12}>
                <Box width='inherit' pt={8} display='flex' flexDirection='column' alignItems='flex-start'>
                {detailSubtitle}
                {detailTitle}
                </Box>
            </Grid>
        </Grid>
    );
};

export default LayoutLandingPage;