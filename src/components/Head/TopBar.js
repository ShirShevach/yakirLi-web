import React, { useState } from "react";
import SignIn from "./SignIn";
import { AppBar, Toolbar, Button, ButtonGroup } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ShareIcon from "@mui/icons-material/Share";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { blue } from "../../MyColors";

const topBarStyle = {
  backgroundColor: blue,
};

const toolBar = {
  justifyContent: "center",
};

const button = {
  marginRight: "2px",
  marginLeft: "2px",
  padding: "4px 12px",
  backgroundColor: "#ACC6C3",
  color: "black",
  textAlign: "center",
  font: "inherit",
};

const yakir_li_web_link = "https://yakirli.org";

const handleShareClick = async () => {
  try {
    // Check if the navigator.share API is available
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that do not support navigator.share
      alert("לחצן השיתוף אינו נתמך בדפדפן זה");
    }
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

const TopBar = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const handleSignInClick = () => {
    setSignInOpen(true);
  };

  return (
    <>
      <AppBar position="sticky" style={topBarStyle}>
        <Toolbar style={toolBar}>
          <ButtonGroup variant="contained">
            <Button
              style={button}
              size="small"
              onClick={handleSignInClick}
              startIcon={<Diversity3Icon />}
            >
              הירשם לקבל עדכונים
            </Button>
            {/* <Button
              style={button}
              size="small"
              onClick={handleShareClick}
              startIcon={<ShareIcon />}
            >
              שיתוף
            </Button> */}
            <Button
              style={button}
              size="small"
              href={yakir_li_web_link}
              startIcon={<ArrowOutwardIcon />}
              component="a"
              target="_blank"
            >
              למיזמים נוספים של העמותה
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <SignIn signInOpen={signInOpen} setSignInOpen={setSignInOpen} />
    </>
  );
};
export default TopBar;
