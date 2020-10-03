import React from 'react';
import {Avatar, Box, makeStyles} from '@material-ui/core';
import style from './profile.avatar.style';

export interface IProps {
    /** Image url for this avatar to load and display */
    imageURL: string;
    /** Text to dispaly on avatar if image was not loaded successful
     * 
     * Only first character of text will be displayed
     */
    fallbackText?: string;
    /** Option allow you to add
     * additional React component and display at right side
     * of avatar
     */
    size?: 'small' | 'large';
    option?: React.ReactNode;
    /** Call on avatar click */
    onAvatarClick?: ()=>void;
}

const renderOption = (option)=>{
    if(!option) return null;
    return (
        <Box>
            {option}
        </Box>
    );
}

const ProfileAvatar  = (props:IProps) => {
    const {
        imageURL,
        fallbackText,
        size = 'small',
        option,
        onAvatarClick,
    } = props;

    const classes = makeStyles(style)();
    const avatarSizeStyle = size==='small'?classes.avatarSmall:classes.avatarLarge;

    const handleClick = ()=>{
        if(onAvatarClick) onAvatarClick();
    }   

    return (
        <Box className={classes.main} onClick={handleClick}>
            <Box pr={1}>
                <Avatar className={avatarSizeStyle} alt={fallbackText} src={imageURL} />
            </Box>
            {renderOption(option)}
        </Box>
    );
};

export default ProfileAvatar;