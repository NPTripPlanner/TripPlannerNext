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
    onScrollStateChange?: (state:IHorizontalScrollState)=>void;
}

export interface IHorizontalScrollState {
    endLeft: boolean;
    endRight: boolean;
}

const isSameState = (oldState:IHorizontalScrollState, newState:IHorizontalScrollState)=>{
    return oldState.endLeft===newState.endLeft && oldState.endRight===newState.endRight;
}

const HorizontalScroll = (props:IProps) => {
    const {
        children,
        space = 2,
        width = null,
        onScrollStateChange,
    } = props;

    const classes = makeStyles(style)();
        
    const gridRef = React.useRef(null);
    const [scrollState,setScrollState] = React.useState<IHorizontalScrollState>({
        endLeft:false,
        endRight:false,
    });

    React.useEffect(()=>{
        
        const scrollHandler = ()=>{

            const contentWidth = gridRef.current.scrollWidth;
            const outerWidth = gridRef.current.clientWidth;
            const scrollLeft = gridRef.current.scrollLeft;
            
            let newState = {endLeft:false, endRight:false};
            if(contentWidth <= outerWidth){
                //left end and right end
                newState = {endLeft:true, endRight:true};
            }
            else{
                if((contentWidth - outerWidth) === scrollLeft){
                    //right end
                    newState = {endLeft:false, endRight:true};
                }
                else if(scrollLeft === 0){
                    //left end
                    newState = {endLeft:true, endRight:false};
                }
                else{
                    //in middle of scroll
                    newState = {endLeft:false, endRight:false};
                }
            }

            setScrollState(oldState=>{
                if(!isSameState(oldState, newState)){
                    return newState;
                }
                else{
                     return oldState;
                }
            });
        }

        scrollHandler();

        gridRef.current.addEventListener('scroll', scrollHandler);

        return ()=>{
            gridRef.current.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    React.useEffect(()=>{
        if(onScrollStateChange) onScrollStateChange(scrollState);
    }, [scrollState]);
    
    const boxProps = {
        width: width?`${width}px`:'inherit',
    }

    const childNodes = (typeof children === 'function')?children():children;

    return (
        <Box {...boxProps}>
            <Grid
            ref={gridRef}
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