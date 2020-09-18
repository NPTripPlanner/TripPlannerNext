import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

export type ColorType = 'initial'
| 'inherit'
| 'primary'
| 'secondary'
| 'textPrimary'
| 'textSecondary'
| 'error';

export interface IProps {
    /** Prefix text */
    prefix?: string;
    /** Text in middle */
    text: string;
    /** Suffix text */
    suffix?: string;
    /** Prefix text color */
    prefixColor?: ColorType;
    /** Text color */
    textColor?: ColorType;
    /** Suffix text color */
    suffixColor?: ColorType;
    /** Prefix text variant e.g "h1" "h5" "h4" */
    prefixVariant?: Variant;
    /** Text variant e.g "h1" "h5" "h4" */
    textVariant?: Variant;
    /** Suffix text variant e.g "h1" "h5" "h4" */
    suffixVariant?: Variant;
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
        prefixVariant = 'h4',
        textVariant = 'h4',
        suffixVariant = 'h4',
        textAlign = 'left',
        prefixLS = 1,
        textLS = 1,
        suffixLS = 1

    } = props;

    return (
        <Box textAlign={textAlign}>
            {prefix?
                <Typography 
                display='inline'
                component='div'
                color={prefixColor}
                variant={prefixVariant}>
                    <Box display='inline' textAlign='center' letterSpacing={prefixLS}>{prefix}</Box>
                </Typography>
                :null
            }
            <Typography 
            display='inline'
            component='div'
            color={textColor}
            variant={textVariant}>
                <Box display='inline' textAlign='center' letterSpacing={textLS}>{text}</Box>
            </Typography>
            {suffix?
                <Typography
                display='inline'
                component='div'
                color={suffixColor}
                variant={suffixVariant}>
                    <Box display='inline' textAlign='center' letterSpacing={suffixLS}>{suffix}</Box>
                </Typography>
                :
                null
            }
        </Box>
    );
};

export default MulticolorText;