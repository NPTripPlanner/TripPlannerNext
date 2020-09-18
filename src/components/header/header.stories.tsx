import React from 'react';
import Header from './header.comp';
import Brand from '../../assets/header/brand.svg';
import { Link, SvgIcon } from '@material-ui/core';

export default {
  title: 'Header',
};

export const defaultHeader = () => { 
    const options = [
        <Link color='textPrimary' component="button">Explore</Link>,
        <Link color='textPrimary' component="button">Feature</Link>
    ];

    return (
        <Header brandIcon={
            <SvgIcon component={Brand} aria-hidden={true} fontSize='large' />
        }
        title='Triplaned'
        options={options}
        />
    )
}
