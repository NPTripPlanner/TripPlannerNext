import { Box, Divider, makeStyles, Tab, Tabs, TextField, Typography } from "@material-ui/core";
import LayoutLandingPage from '../layout/layout.landingPage/layout.landingPage';
import heroImgURL from '../assets/landingPage/heroimg.png';
import MulticolorText from "../components/units/multicolor.text/multicolor.text.comp";
import Trending from '../components/trending/trending.comp';
import TrendingItem from '../components/units/trending.Item/trending.item.comp';
import style from '../style/index.style';
import ExpandIcon from '../assets/landingPage/expand.svg';
import React from "react";
import { Variant } from "@material-ui/core/styles/createTypography";
import {withTranslation} from '../../nexti18n';
import { WithTranslation } from "next-i18next";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const imgUrl = 'https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80';
const getTrendingItems = ()=>{
  const items:React.ReactNode[] = [];
  for(let i=0; i<15; i++){
    items.push(
      <TrendingItem 
      key={i}
      imageURL={imgUrl}
      title='Toronto, CA'
      imgWidth={60}
      imgHeight={60}
      cornerRadius={10}
      />
    );
  }
  return items;
}

const getTabWithName = (name:string, variant:Variant)=>{
  return (
    <Tab label={
      <Typography component='div' variant={variant}>
        <Box>{name}</Box>
      </Typography>
    }
    disableRipple 
    />
  )
}

interface IProps extends WithTranslation {

}

function Landing(props:IProps) {
  const {
    t,
  } = props;

  const classes = makeStyles(style)();

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (_, value:number)=>setTabValue(value);

  const downSM = useMediaQuery((theme:Theme)=>theme.breakpoints.down('sm'));

  return (
    <LayoutLandingPage
    heroImgURL={heroImgURL}
    heroTitle={
      <Typography className={classes.lineStrike} component='div' variant='h3' align={downSM?'center':'right'}>
        <Box>{t('heroTitle')}</Box>
      </Typography>
    }
    heroSubtitle={
      <Typography component='div' variant='h3' align='right'>
        <MulticolorText text={t('heroSubtitle')} textColor='info.light' textVariant='h3' textFontWeight={800}/>
      </Typography>
    }
    dest={
        <Box display='flex' justifyContent='center' alignItems='center'>
          <TextField variant='standard' fullWidth placeholder={t('whereToGo')} />
          <Box px={1} height='27px'>
            <Divider classes={{root:classes.divider}} orientation='vertical' />
          </Box>
          <TextField variant='standard' placeholder={t('duration')} />
        </Box>
    }
    trending={
        <Trending items={getTrendingItems()} />
    }
    expandIcon={<ExpandIcon />}
    detailTitle={
      <MulticolorText 
      prefix={t('detailTitle')} 
      prefixColor='text.primary' 
      prefixVariant='h3' prefixFontWeight={800} 
      text={t('detailTitleSuffix')}
      textColor='info.light' 
      textVariant='h3' 
      textFontWeight={800}
      />
    }
    detailSubtitle={
        <MulticolorText text={t('detailSubtitle')} textColor='text.disabled' textVariant='h6'/>
    }
    detailTabs={
      <Tabs value={tabValue} centered onChange={handleTabChange}>
        {getTabWithName(t('createItinerary'), 'subtitle1')}
        {getTabWithName(t('manageItinerary'), 'subtitle1')}
        {getTabWithName(t('travellingTrack'), 'subtitle1')}
      </Tabs>
    }
    />
  )
}

Landing.getInitialProps = async () =>{
  return({
    namespacesRequired: ['common', 'landing', 'navbar'],
  })
}

export default withTranslation('landing')(Landing);
