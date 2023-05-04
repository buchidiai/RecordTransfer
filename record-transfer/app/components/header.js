import React from "react";
import {
    Typography
} from '@mui/material';

function Header() {
  const headerStyle = {
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80px",
  };

  const titleStyle = {
    color: "#3F51B5", 
    fontWeight: "bold",
    fontSize: "24px",
  };

  return (
    <div style={headerStyle}>
      <Typography variant="h6" style={titleStyle}>
        Loyal Health Information Network 
      </Typography>
    </div>
  );
}

export default Header;



