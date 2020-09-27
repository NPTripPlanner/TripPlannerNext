import { Box, Grid, GridSpacing, makeStyles } from '@material-ui/core';
import style from './hScroll.style';
import React from 'react';

export interface IProps {
    /** A function that take no arguments and return an array of ReactNode */
    children: ()=>React.ReactNode[];
    /** Space between items
     * 
     * number from 0 ~ 10
     * 
     * default 2
     */
    space?: GridSpacing;
    /** Width of horizontal scroll content
     * 
     * give null to make content flexible
     * 
     * default null
     */
    width?: number | null;
}

const HorizontalScroll = (props:IProps) => {
    const {
        children,
        space = 2,
        width = null,
    } = props;

    const classes = makeStyles(style)();

    const boxProps = {
        width: width?`${width}px`:'inherit',
    }

    const childNodes = (typeof children === 'function')?children():children;

    return (
        <Box {...boxProps}>
            <Grid 
            className={classes.grid} 
            container 
            spacing={space} 
            wrap='nowrap'
            >
            {
                childNodes.map((node, i)=>{
                    return(
                        <Grid key={i} item>
                        {node}
                        </Grid>
                    )
                })
            }
            </Grid>
        </Box>
    );
};

export default HorizontalScroll;