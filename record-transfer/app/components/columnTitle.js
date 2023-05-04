import React from 'react';
import { Typography } from '@mui/material';

function CountTitle(props) {
    const { count, title } = props;
    return (
      <Typography variant="h6" component="h2">
        {`${title} (${count ? count : 0})`}
      </Typography>
    );
  }
  
  export default CountTitle;


