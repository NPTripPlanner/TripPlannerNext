import { Link } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import Navbar from '../units/navbar/navbar.comp';
import Brand from '../../assets/header/pin.svg';
import MulticolorText from '../units/multicolor.text/multicolor.text.comp';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import { TFunction, withTranslation } from 'next-i18next';

export interface IProps {
    t: TFunction;
}

function Navigation(props:IProps) {
    const {
        t,
    } = props;

    const options = [
      <Link component="button">
        <Typography component='div' variant='h6' color='textPrimary'>
            <Box>{t('explore')}</Box>
        </Typography>
      </Link>,
      <Link component="button">
        <Typography component='div' variant='h6' color='textPrimary'>
            <Box>{t('feature')}</Box>
        </Typography>
      </Link>,
      <Link component="button">
      <Typography component='div' variant='h6' color='textPrimary'>
            <Box>{t('login')}</Box>
      </Typography>
    </Link>
    ];
    
    return (
        <Box>
          <Navbar 
          color='primary'
          shadowEl={0}
          brandIcon={
            <SvgIcon aria-hidden={true} fontSize='large'>
              <Brand />
            </SvgIcon>
          }
          title={
            <MulticolorText
            prefix='TRI'
            prefixColor='info.light'
            prefixVariant='h4'
            text='PLANED'
            textVariant='h4'
            textFontWeight={600} 
            />
          }
          hGutter={3}
          options={options}
          />
          <Toolbar />
        </Box>
    )
}

export default withTranslation('navbar')(Navigation);