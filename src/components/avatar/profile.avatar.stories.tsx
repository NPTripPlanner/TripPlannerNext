import React from 'react';
import ProfileAvatar from './profile.avatar.comp';
import imageUrl from '../../assets/avatar/testAvatar.jpeg';
import {ArrowDownward} from '@material-ui/icons';

export default {
  title: 'ProfileAvatar',
};

export const defaultAvatar = () => { 

    return (
        <ProfileAvatar imageURL={imageUrl} fallbackText='Marray' />
    )
}

export const large = () => { 

    return (
        <ProfileAvatar imageURL={imageUrl} fallbackText='Marray' size='large' />
    )
}

export const fallbackText = () => { 

    return (
        <ProfileAvatar imageURL='https//image.png:' fallbackText='Marray' size='large' />
    )
}

export const fallbackImage = () => { 

    return (
        <ProfileAvatar imageURL='https//image.png:' size='large' />
    )
}

export const option = () => { 

    return (
        <ProfileAvatar 
        imageURL={imageUrl} 
        fallbackText='Marray'
        size='large'
        option={<ArrowDownward />}
        />
    )
}
