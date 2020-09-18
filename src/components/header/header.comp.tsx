import React from 'react';
import { AppBar, Box, makeStyles, Toolbar, Typography } from '@material-ui/core';
import style from './header.style';

export interface IProps {
    brandIcon?: any;
    title: string | React.ReactNode;
    options?: React.ReactNode[];  
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
const Header = (props:IProps) => {
    const {
        brandIcon = null,
        title,
        options = null,
    } = props;

    const classes = makeStyles(style)();

    return (
        <AppBar>
            <Toolbar disableGutters>
                <Box className={classes.left}>
                    <Box pr={1}>
                    {brandIcon}
                    </Box>
                    <Box px={1}>
                    {typeof title === "string"?
                        <Typography variant='h5'>title</Typography>
                        :
                        title
                    }
                    </Box>
                </Box>  
                {options?renderOptions(options, classes):null} 
            </Toolbar>
        </AppBar>
    );
};

export default Header;