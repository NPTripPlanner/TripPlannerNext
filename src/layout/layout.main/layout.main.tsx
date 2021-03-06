import React from 'react';
import {Box} from '@material-ui/core';

export interface IProps {
    children?: React.ReactNode;
    vGutter?: boolean;
    hGutter?: boolean;
}

/**
 * Main layout
 * 
 * To center children content horizontal and have ability to turn on/off for
 * horionztal and vertical gutter.
 * 
 * @param props 
 */
const LayoutMain = (props:IProps) => {
    const {
        children,
        vGutter = false,
        hGutter = false,
    } = props;

    const boxProps = {
        py: vGutter?2:0,
        wdith:'100vw',
    }
    // const containerProps = {
    //     disableGutters: !hGutter,
    // }

    const innerBoxProps = {
        px:hGutter?3:0,
        width:'inherit'
    }

    return (
        <Box {...boxProps}>
            {/* <Container  {...containerProps}>{children}</Container> */}
            <Box {...innerBoxProps}>{children}</Box>
        </Box>
    );
};

export default LayoutMain;