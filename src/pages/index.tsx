import { Box, makeStyles, Typography } from "@material-ui/core";
import LayoutLandingPage from '../layout/layout.landingPage/layout.landingPage';
import heroImgURL from '../assets/landingPage/heroimg.png';
import MulticolorText from "../components/multicolor.text/multicolor.text.comp";
import style from './index.style';

export default function Landing() {
  const classes = makeStyles(style)();

  return (
    <LayoutLandingPage
    heroImgURL={heroImgURL}
    heroTitle={
      <Typography className={classes.lineStrike} component='div' variant='h3' align='right'>
        <Box>Don’t listen to what they say.</Box>
      </Typography>
    }
    heroSubtitle={
      <Typography component='div' variant='h3' align='right'>
        <MulticolorText text='Go Explore !' textColor='info.light' textVariant='h3' textFontWeight={800}/>
      </Typography>
    }
    />
  )
}
