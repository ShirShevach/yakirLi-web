import { Button, Dialog, Typography } from "@mui/material";
import React from "react";
import { lightBrown } from "../../MyColors";
import candle_yakir from "../../Images/candle-yakir.jpeg";
import html2canvas from "html2canvas";
import * as Style from "./BodyStyle";

const LitCandleDialog = ({ cardOpen, setCardOpen, person, isComputer }) => {
  const handleClose = () => {
    setCardOpen(false);
  };

  const shareImg = (imageDataUrl) => {
    navigator
      .share({
        title: "Shared Image",
        text: "Check out this image!",
        url: imageDataUrl,
      })
      .catch((error) => console.error("Error sharing:", error));
  };

  const downloadImg = (imageDataUrl) => {
    // create a download img
    const downloadLink = document.createElement("a");
    downloadLink.href = imageDataUrl;
    downloadLink.download = "shared_image.png";
    downloadLink.click();
  };

  const handleShareImage = () => {
    // Get the card element
    const cardElement = document.querySelector(".cardToShare");
    // Use html2canvas to capture the content as an image
    html2canvas(cardElement).then((canvas) => {
      // Convert the canvas to a data URL
      const imageDataUrl = canvas.toDataURL();
      if (isComputer) {
        downloadImg(imageDataUrl);
      } else {
        // If it's a mobile device, try to open the share menu
        if (navigator.share) {
          shareImg(imageDataUrl);
        } else {
          // Handle the case where the share API is not supported
          downloadImg(imageDataUrl);
        }
      }
    });
  };

  const imageStyle = {
    width: isComputer ? "345px" : "300px",
  };

  return (
    <Dialog open={cardOpen} onClose={handleClose}>
      <div className="cardBody" style={Style.litCandleContent}>
        <div className="cardToShare" style={{ backgroundColor: lightBrown }}>
          <img src={candle_yakir} alt="candle-yakir" style={imageStyle}></img>
          <Typography
            style={{
              ...Style.litCandleContent,
              fontSize: 25,
            }}
          >
            זוכרים באהבה את
          </Typography>
          <Typography
            style={{
              ...Style.litCandleContent,
              fontSize: 35,
              padding: "0px 0px 20px 0px",
              width: isComputer ? "345px" : "300px",
            }}
          >
            {person.name}
          </Typography>
        </div>
        <Button
          style={Style.litCandleButton}
          type="submit"
          onClick={handleShareImage}
        >
          שיתוף
        </Button>
      </div>
    </Dialog>
  );
};

export default LitCandleDialog;
