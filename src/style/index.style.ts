import { createStyles } from "@material-ui/core";

export default theme=>(createStyles({
    lineStrike: {
        textDecoration: 'line-through',
    },
    divider:{
        backgroundColor: theme.palette.divider.main,
        width:'4px',
    }
}));