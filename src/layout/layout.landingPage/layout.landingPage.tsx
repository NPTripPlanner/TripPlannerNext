import { Box } from '@material-ui/core';
import React from 'react';

export interface IProps {
    heroImgURL: string;
    heroTitle: React.ReactNode;
    heroSubtitle: React.ReactNode;
}
const LayoutLandingPage = (props:IProps) => {
    const {
        heroImgURL,
        heroTitle,
        heroSubtitle
    } = props;

    return (
        <React.Fragment>
            <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                <Box>
                    <img src={heroImgURL}/>
                </Box>
                <Box display='flex' flexDirection='column' alignSelf='flex-end' alignItems='flex-end'>
                    {heroTitle}
                    {heroSubtitle}
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default LayoutLandingPage;