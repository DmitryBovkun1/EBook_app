import React from 'react';
import { IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// BackToStartButton functional component
const BackToStartButton = ({ onButtonClick }) => {
  // Define the style for the button
  const buttonStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
  };
  
  // Render the IconButton with an ArrowUpwardIcon
  return (
    <IconButton color="primary" onClick={onButtonClick} style={buttonStyle}>
      <ArrowUpwardIcon />
    </IconButton>
  );
};

// Export the BackToStartButton component
export default BackToStartButton;