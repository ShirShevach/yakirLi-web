import React from "react";
import { Typography } from "@mui/material";
import * as Style from "./BodyStyle";

const Content = () => {
  return (
    <>
      <div style={Style.contentTitle}>
        <Typography style={Style.line}>מצטרפים למיזם ומדליקים נר!</Typography>
      </div>

      <div style={Style.contentSubTitle}>
        <Typography style={Style.line}>♡ לזכור את אלה שאינם</Typography>
        <Typography style={Style.line}>
          ♡ לומר למשפחות השכולות: אנחנו אתכם!
        </Typography>
        <Typography style={Style.line}>
          ♡ לצרף יחד נר ועוד נר לחיבור גדול שכולו אור
        </Typography>
      </div>
    </>
  );
};
export default Content;
