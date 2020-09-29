import React from 'react';
import { AppBar, Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import style from './navbar.style';

export interface IProps {
    brandIcon?: any;
    title: string | React.ReactNode;
    /** Horizontal gutter */
    hGutter?: number;
    position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
    options?: React.ReactNode[];
    /** Color of Navbar */
    color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent';
    /** Elevation of paper, which is shadow under Navbar */
    shadowEl?: number;  
}

const renderOptions = (options:React.ReactNode[], style)=>{

    return (
        <Box className={style.right}>
        {
            options.map((opt, i, arr)=>{
                if(i < arr.length-1){
                    return (<Box key={i} px={1}>{opt}</Box>);
                }
                else{
                    return (<Box key={i} pl={1}>{opt}</Box>)
                }
            })
        }
        </Box> 
    )
}

/**
 * Header
 * 
 * Use material Appbar component
 * @param props 
 */
const Navbar = (props:IProps) => {
    const {
        brandIcon = null,
        title,
        hGutter = 0,
        position = 'fixed',
        options = null,
        color = 'primary',
        shadowEl = 5,
    } = props;

    const classes = makeStyles(style)();

    return (
        <AppBar position={position} color={color} elevation={shadowEl}>
            <Box px={hGutter}>
                <Toolbar disableGutters>
                    <Box className={classes.left}>
                        <Box pr={1}>
                        {brandIcon}
                        </Box>
                        <Box pr={1}>
                        {typeof title === "string"?
                            <Typography variant='h5'>title</Typography>
                            :
                            title
                        }
                        </Box>
                    </Box>  
                    {options?renderOptions(options, classes):null} 
                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default Navbar;