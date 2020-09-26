import { Box, Divider, makeStyles, TextField, Typography } from "@material-ui/core";
import LayoutLandingPage from '../layout/layout.landingPage/layout.landingPage';
import heroImgURL from '../assets/landingPage/heroimg.png';
import MulticolorText from "../components/multicolor.text/multicolor.text.comp";
import style from '../style/index.style';

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
    dest={
        <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
          <TextField variant='standard' fullWidth placeholder='Where do you want to go?' />
          <Box px={1} height='27px'>
            <Divider classes={{root:classes.divider}} orientation='vertical' />
          </Box>
          <TextField variant='standard' placeholder='Duration' />
        </Box>
    }
    />
  )
}
