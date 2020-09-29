import { Box, makeStyles } from '@material-ui/core';
import style from './layout.landingPage.style';
import React from 'react';

export interface IProps {
    heroImgURL: string;
    heroTitle: React.ReactNode;
    heroSubtitle: React.ReactNode;
    dest: React.ReactNode;
    trending: React.ReactNode;
}

const LayoutLandingPage = (props:IProps) => {
    const {
        heroImgURL,
        heroTitle,
        heroSubtitle,
        dest,
        trending
    } = props;

    const classes = makeStyles(style)();

    return (
        <React.Fragment>
            <Box width='inherit' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Box width='50%' mr={2}>
                    <img className={classes.img} src={heroImgURL} alt='hero image' />
                </Box>
                <Box width='50%' display='flex' flexDirection='column' alignSelf='flex-end' alignItems='flex-end' ml={2}>
                    {heroTitle}
                    {heroSubtitle}
                    <Box width='auto' pt={7}>
                    {dest}
                    </Box>
                    <Box width='100%' pt={7}>
                    {trending}
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default LayoutLandingPage;