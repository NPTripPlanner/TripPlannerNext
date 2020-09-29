import { Box, makeStyles, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import style from './trending.item.style';
import React from 'react';

export interface IProps {
    /** Image url */
    imageURL: string;
    /** Title of this item */
    title: string;
    /** Yypography variant */
    titleVariant?: Variant;
    /** Title alignment */
    titleAlignment?: 'left' | 'center' | 'right'
    /** 
     * Width of this item in px
     * 
     * ignore when auto resize is true
     * 
     * default is 150px
     */
    width?: number;
    /** 
     * Height of this item in px
     * 
     * ignore when auto resize is true
     * 
     * default is 200px
     */
    height?: number;
    /** 
     * Width of image in item in px
     * 
     * default is 80px
     */
    imgWidth?: number;
    /** 
     * Height of image in item in px
     * 
     * default is 80px
     */
    imgHeight?: number;
    /** 
     * Image corner radius in px
     * 
     * default is 10px
     */
    cornerRadius?: number;

    /** 
     * Automatically calculate item content's size and update
     * 
     * default is true
     * 
     * You need to calculate item size before render if this set to false
     * otherwise content of item might not fit in item's rect 
     */
    autoResize?: boolean;
}

const TrendingItem = (props:IProps) => {
    let {
        imageURL,
        title,
        titleVariant = 'subtitle1',
        titleAlignment = 'center',
        width = 150,
        height = 200,
        imgWidth = 80,
        imgHeight = 80,
        cornerRadius = 10,
        autoResize = true,
    } = props;

    const classes = makeStyles(style)({cornerRadius});

    const [size, setSize] = React.useState({width:width, height:height});

    //measure title typography size and update item's size accordingly 
    const typoRef = React.useCallback(node=>{
        if(!node || !autoResize) return;
        const totalHeight = node.getBoundingClientRect().height + imgHeight;
        const nodeWidth = node.getBoundingClientRect().width;
        const totalWidth = imgWidth>=nodeWidth?imgWidth:nodeWidth;
        setSize({
            width:totalWidth,
            height:totalHeight
        })

    }, []);

    const imgSize = {
        width: `${imgWidth}px`,
        height: `${imgHeight}px`,
    }

    return (
        <Box 
        display='flex' 
        flexDirection='column' 
        justifyContent='center' 
        alignItems='center'
        width={size.width}
        height={size.height}
        >
            <Box {...imgSize}>
                <img className={classes.img} src={imageURL} alt={title} {...imgSize} />
            </Box>
            <Typography ref={typoRef} component='div' variant={titleVariant}>
                <Box textAlign={titleAlignment}>{title}</Box>
            </Typography>
        </Box>
    );
};

export default TrendingItem;