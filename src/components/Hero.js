import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from './Button';
import Typography from './Typography';
import HeroLayout from './HeroLayout';
import bgImage from '../assets/images/map_kenya_2.png';

// const backgroundImage =
//   'https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400&q=80';

const backgroundImage = bgImage;

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    animation: '300ms linear 0ms 1 normal both $zoomIn',
    animationDuration: '5000ms',
    animationIterationCount: 'infinite'
  },
  '@keyframes zoomIn': {
    '0%': {
      transform: 'scale(1.05)'
    },
    '100%': {
      transform: 'scale(1)'
    }
  },
  button: {
    minWidth: 200,
    backgroundColor: 'transparent',
    border: '2px solid #fff',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: '#1A73E8'
    }
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    fontSize: '1.8em',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(2)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  },
  actionCall: {
    position: 'absolute',
    left: '5%',
    color: theme.palette.common.white
  },
  linkSecondary: {
    color: '#1A73E8'
  },
  heroTitle: {
    fontSize: '5em'
  }
});

function Hero(props) {
  const { classes } = props;

  return (
    <HeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />

      <section className={classes.actionCall}>
        <Typography color="inherit" align="left" className={classes.heroTitle}>
          Ngeo
        </Typography>
        <Typography
          color="inherit"
          align="left"
          variant="h5"
          className={classes.h5}
        >
          A map based project management tool
        </Typography>
        <Button
          variant="contained"
          size="large"
          className={clsx(classes.button)}
          component="a"
          href="/app/map"
        >
          Launch Ngeo
        </Button>
      </section>
    </HeroLayout>
  );
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hero);
