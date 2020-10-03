import { createStyles } from "@material-ui/core";

import {IProps} from './multicolor.text.comp';

export default createStyles({
    prefix:(props:IProps)=>({
        fontWeight: props.prefixFontWeight,
    }),
    text:(props:IProps)=>({
        fontWeight: props.textFontWeight,
    }),
    suffix:(props:IProps)=>({
        fontWeight: props.suffixFontWeight,
    }),

})