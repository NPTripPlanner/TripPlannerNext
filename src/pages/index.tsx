import { Box, Divider, makeStyles, TextField, Typography } from "@material-ui/core";
import LayoutLandingPage from '../layout/layout.landingPage/layout.landingPage';
import heroImgURL from '../assets/landingPage/heroimg.png';
import MulticolorText from "../components/units/multicolor.text/multicolor.text.comp";
import Trending from '../components/trending/trending.comp';
import TrendingItem from '../components/units/trending.Item/trending.item.comp';
import style from '../style/index.style';
import ExpandIcon from '../assets/landingPage/expand.svg';

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

export default function Landing() {
  const classes = makeStyles(style)();

  return (
    <LayoutLandingPage
    heroImgURL={heroImgURL}
    heroTitle={
      <Typography className={classes.lineStrike} component='div' variant='h3' align='right'>
        <Box>DON’T LISTEN TO  WHAT THEY SAY.</Box>
      </Typography>
    }
    heroSubtitle={
      <Typography component='div' variant='h3' align='right'>
        <MulticolorText text='GO EXPLORE !' textColor='info.light' textVariant='h3' textFontWeight={800}/>
      </Typography>
    }
    dest={
        <Box display='flex' justifyContent='center' alignItems='center'>
          <TextField variant='standard' fullWidth placeholder='Where do you want to go?' />
          <Box px={1} height='27px'>
            <Divider classes={{root:classes.divider}} orientation='vertical' />
          </Box>
          <TextField variant='standard' placeholder='Duration' />
        </Box>
    }
    trending={
        <Trending items={getTrendingItems()} />
    }
    expandIcon={<ExpandIcon />}
    detailTitle={
      <MulticolorText 
      prefix='ITINERARY CAN BE ' 
      prefixColor='text.primary' 
      prefixVariant='h3' prefixFontWeight={800} 
      text='EASY' 
      textColor='info.light' 
      textVariant='h3' 
      textFontWeight={800}
      />
    }
    detailSubtitle={
        <MulticolorText text='TRIPLANED IS HERE TO HELP' textColor='text.disabled' textVariant='h6'/>
    }
    />
  )
}
