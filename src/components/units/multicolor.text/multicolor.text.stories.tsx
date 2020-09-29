import React from 'react';
import MulticolorText from './multicolor.text.comp';


export default {
  title: 'MulticolorTest',
};

export const defaultText = () => { 

    return (
        <MulticolorText 
        text='Default'
        />
    )
}

export const multiText = () => { 

    return (
        <MulticolorText 
        prefix='Pre'
        text='Default'
        suffix='Suf'
        />
    )
}

export const multicolorText = () => { 

    return (
        <MulticolorText 
        prefix='Pre'
        text='Middle'
        suffix='Suf'
        prefixColor='primary.main'
        textColor='warning.main'
        suffixColor='info.light'
        prefixVariant='h6'
        textVariant='h3'
        suffixVariant='h4'
        textAlign='center'
        />
    )
}

export const letterSpacingText = () => { 

    return (
        <MulticolorText 
        prefix='Pre'
        text='Middle'
        suffix='Suf'
        prefixColor='primary.main'
        textColor='warning.main'
        suffixColor='info.light'
        prefixVariant='h6'
        textVariant='h3'
        suffixVariant='h4'
        textAlign='center'
        prefixLS={6}
        textLS={12}
        suffixLS={8}
        />
    )
}
