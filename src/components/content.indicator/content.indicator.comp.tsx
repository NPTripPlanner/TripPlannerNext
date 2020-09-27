import { Box, makeStyles, SvgIcon } from '@material-ui/core';
import style from './content.indicator.style';
import React from 'react';

export interface IHorizontalIndictor {
    left: boolean;
    right: boolean;
}

export interface IVerticalIndicator {
    top: boolean;
    down: boolean;
}

export interface IProps {
    /** A svg icon component that svg has arrow point to left direction
     * 
     * Rest of svg icon point to right direction by using transform rotate and scale
     */
    leftIcon: React.ReactNode;
    /** Horizontal indicator state for left and right
     *  
     * default is false 
     */
    hState?: IHorizontalIndictor;
    /** Vertical indicator state for top and down
     *  
     * default is false 
     */
    vState?: IVerticalIndicator;
    /** Is left and right only or top and down only
     *  
     * default is horizontal left and right
     */
    isHorizontal?: boolean;
    /** Color for indicator when state is on(true) 
     * 
     * default is 'text.primary'
     * 
     * refer to Material-UI palette https://material-ui.com/system/palette/ 
     */
    color?: string;
    /** Color for indicator when state is off(false) 
     * 
     * default is 'text.disabled'
     * 
     * refer to Material-UI palette https://material-ui.com/system/palette/ 
     */
    colorDisabled?: string;
}

const defaultHIndicators = {
    left: false,
    right: false,

}
const defaultVIndicators = {
    top: false,
    down: false,
}     

const ContentIndicator = (props:IProps) => {
    const {
        leftIcon,
        hState = defaultHIndicators,
        vState = defaultVIndicators,
        isHorizontal = true,
        color = 'text.primary',
        colorDisabled = 'text.disabled'
    } = props;

    const classes = makeStyles(style)();

    const boxProps = {
        display:'flex',
        flexDirection: isHorizontal?'row':'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const leftColor = hState.left? color:colorDisabled;
    const rightColor = hState.right? color:colorDisabled;
    const topColor = vState.top? color:colorDisabled;
    const downColor = vState.down? color:colorDisabled;

    return (
        <Box {...boxProps}>
            {
            isHorizontal?
            [
                <Box key='left' color={leftColor}>
                    <SvgIcon>{leftIcon}</SvgIcon>
                </Box>,
                <Box key='right' className={classes.flipX} color={rightColor}>
                    <SvgIcon>{leftIcon}</SvgIcon>
                </Box>
            ]
            :
            [
                <Box key='top' className={classes.top} color={topColor}>
                    <SvgIcon>{leftIcon}</SvgIcon>
                </Box>,
                <Box key='down' className={classes.down} color={downColor}>
                    <SvgIcon>{leftIcon}</SvgIcon>
                </Box>
            ]
            }
        </Box>
    );
};

export default ContentIndicator;