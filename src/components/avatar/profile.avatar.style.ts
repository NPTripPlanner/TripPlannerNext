import { createStyles } from "@material-ui/core";

export default theme=>(createStyles({
    main:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    avatarSmall:{
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    avatarLarge:{
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));