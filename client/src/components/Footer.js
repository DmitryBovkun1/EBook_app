import React from 'react';
import { Typography, Link, Container, Box } from '@mui/material';

// The Footer component renders a footer with information about the application.
function Footer() {
  // Get the current URL
  const currentUrl = window.location.href;

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto'
      }}
    >
      <Container maxWidth="sm">
        {/* Footer text */}
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}{' '}
          <Link color="inherit" href={currentUrl}>
            Book App
          </Link>
          {' | Book App'}
        </Typography>
      </Container>
    </Box>
  );
}

// Export the Footer component
export default Footer;