import { createStyles } from "@material-ui/core";

const style = theme=>(createStyles({
    lineStrike: {
        textDecoration: 'line-through',
    },
    divider:{
        backgroundColor: theme.palette.divider.main,
        width:'4px',
    }
}));

export default style;