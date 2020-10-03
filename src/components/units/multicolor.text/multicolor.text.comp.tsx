import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import style from './multicolor.text.style';

export interface IProps {
    /** Prefix text */
    prefix?: string;
    /** Text in middle */
    text: string;
    /** Suffix text */
    suffix?: string;
    /** Prefix text color */
    prefixColor?: string;
    /** Text color */
    textColor?: string;
    /** Suffix text color */
    suffixColor?: string;
    /** Prefix text variant e.g "h1" "h5" "h4" */
    prefixVariant?: Variant;
    /** Text variant e.g "h1" "h5" "h4" */
    textVariant?: Variant;
    /** Suffix text variant e.g "h1" "h5" "h4" */
    suffixVariant?: Variant;
    /** Prefix font weight */
    prefixFontWeight?: number;
    /** Text font weight */
    textFontWeight?: number;
    /** Suffix font weight */
    suffixFontWeight?: number;
    /** Text alignment */
    textAlign?: 'left' | 'center' | 'right';
    /** Prefix text letter spacing */
    prefixLS?: number;
    /** Text letter spacing */
    textLS?: number;
    /** Suffix text letter spacing */
    suffixLS?: number;
}

/**
 * MulticolorText
 * 
 * Text is capable of mix different color
 * 
 * Text are splited into Prefix, Middle, Suffix
 * 
 * Eeach have thier own color, spacing, typography
 * @param props 
 */
const MulticolorText = (props:IProps) => {

    const {
        prefix = undefined,
        text,
        suffix = undefined,
        prefixColor = 'primary',
        textColor = 'primary',
        suffixColor = 'primary',
        prefixVariant = 'h6',
        textVariant = 'h6',
        suffixVariant = 'h6',
        prefixFontWeight = 400,
        textFontWeight = 400,
        suffixFontWeight = 400,
        textAlign = 'left',
        prefixLS = 1,
        textLS = 1,
        suffixLS = 1

    } = props;

    const classes = makeStyles(style)({
        prefixFontWeight,
        textFontWeight,
        suffixFontWeight,
    });

    return (
        <Box textAlign={textAlign}>
            {prefix?
                <Typography 
                display='inline'
                component='div'
                variant={prefixVariant}>
                    <Box className={classes.prefix} color={prefixColor} display='inline' textAlign='center' letterSpacing={prefixLS}>{prefix}</Box>
                </Typography>
                :null
            }
            <Typography 
            display='inline'
            component='div'
            variant={textVariant}>
                <Box className={classes.text} color={textColor} display='inline' textAlign='center' letterSpacing={textLS}>{text}</Box>
            </Typography>
            {suffix?
                <Typography
                display='inline'
                component='div'
                variant={suffixVariant}>
                    <Box className={classes.suffix} color={suffixColor} display='inline' textAlign='center' letterSpacing={suffixLS}>{suffix}</Box>
                </Typography>
                :
                null
            }
        </Box>
    );
};

export default MulticolorText;