import { createStyles } from "@material-ui/core";

import {IProps} from './content.indicator.comp';
export default createStyles({
    flipX:{
        transform: 'scaleX(-1)',
    },
    top:{
        transform: 'rotate(90deg)',
    },
    down:{
        transform: 'rotate(-90deg) scaleY(-1)',
    },
    svgSize:(props:IProps)=>({
        width:props.iconSize,
        height:props.iconSize,
    }),
});