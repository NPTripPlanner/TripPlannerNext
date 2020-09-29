import { createStyles } from '@material-ui/core';
import {IProps} from './trending.item.comp';
export default createStyles({
    img:(props:IProps)=>({
        borderRadius: `${props.cornerRadius}px`
    })
});