import logo from '../files/main.jpg';
import React from 'react';
import { makeStyles, Box, Typography} from '@material-ui/core';

// Styles for the Header component
const useStyles = makeStyles((theme) => ({
  // Root styles for the header container
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${logo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: theme.palette.common.white,
  },
  // Styles for the central box within the header
  centerBoxStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
    backgroundColor: '#fff',
    borderRadius: '4px',
  },
  // Styles for the application header name
  appHeaderName: {
    marginBottom: theme.spacing(2),
    color: '#000',
    textAlign: 'center',
  },
  // Styles for the application information name
  appInfoName: {
    marginBottom: theme.spacing(2),
    color: '#000',
    textAlign: 'center',
  },
  // Styles for the switch button
  switchButton: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: 'none',
    padding: '10px 30px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '14px',
    borderRadius: '5px',
    transitionDuration: '0.4s', 
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

// The Header component displays the application header with a background image.
const Header =({ onButtonClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* Central box within the header */}
      <Box className={classes.centerBoxStyle}>
        {/* Application header name */}
        <Typography variant="h3" className={classes.appHeaderName}>
          My Ebook App
        </Typography>
        {/* Application information name */}
        <Typography variant="h6" className={classes.appInfoName}>
          Ebook App is a web platform for managing an electronic library.
        </Typography>
        {/* Start button */}
        <button className={classes.switchButton} onClick={onButtonClick}>
          Start
        </button>
      </Box>
    </div>
  );
};

// Export the Header component
export default Header;