import { Box } from '@material-ui/core';
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

    return (
        <React.Fragment>
            <Box width='inherit' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Box width='50%'>
                    <img src={heroImgURL} alt='hero image' />
                </Box>
                <Box width='50%' display='flex' flexDirection='column' alignSelf='flex-end' alignItems='flex-end'>
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