import React from 'react';
import {Box, Container} from '@material-ui/core';

export interface IProps {
    children?: React.ReactNode;
    vGutter?: boolean;
    hGutter?: boolean;
}

const LayoutMain = (props:IProps) => {
    const {
        children,
        vGutter = false,
        hGutter = false,
    } = props;

    const boxProps = {
        py: vGutter?2:0,
    }
    const containerProps = {
        disableGutters: !hGutter,
    }

    return (
        <Box {...boxProps}>
            <Container {...containerProps}>{children}</Container>
        </Box>
    );
};

export default LayoutMain;