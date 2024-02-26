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

  const downloadImg = (imageDataUrl) => {
    // create a download img
    const cardElement = document.querySelector(".cardToShare");
    html2canvas(cardElement).then((canvas) => {
      const imageDataUrl = canvas.toDataURL();
      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataUrl;
      downloadLink.download = "מדליקים נר בשבוע המודעות לשכול האזרחי.png";
      downloadLink.click();
    });
  };

  const handleShareImage = () => {
    // if (isComputer) {
    //   downloadImg();
    // } else {
    // If it's a mobile device, try to open the share menu
    if (navigator.share) {
      shareImg();
    } else {
      // Handle the case where the share API is not supported
      downloadImg();
    }
    // }
  };

  async function shareImg() {
    const element = document.querySelector(".cardToShare"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg");
    const response = await fetch(data);
    const blob = await response.blob();
    // Check if sharing files is supported directly within the navigator.share object
    // if (navigator.share && navigator.share.files) {
      const filesArray = [
        new File([blob], "מדליקים נר בשבוע המודעות לשכול האזרחי.jpg", {
          type: "image/jpeg",
          lastModified: new Date().getTime(),
        }),
      ];

      const shareData = {
        files: filesArray,
        // text: "https://shirshevach.github.io/yakirLi-web/\n#מדליקים_נר",
      };

      navigator.share(shareData);
    // } else {
      // Fallback behavior if sharing files is not supported
      // console.log("Sharing files not supported.");
      // You might want to implement a fallback behavior here, like sharing a link instead.
    // }
  }

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
