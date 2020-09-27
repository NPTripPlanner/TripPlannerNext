import { createStyles } from "@material-ui/core";

export default createStyles({
    flipX:{
        transform: 'scaleX(-1)',
    },
    top:{
        transform: 'rotate(90deg)',
    },
    down:{
        transform: 'rotate(-90deg) scaleY(-1)',
    }
});