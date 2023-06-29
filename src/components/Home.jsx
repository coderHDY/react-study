import { useReducer, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createStyles, CustomTheme, makeStyles } from "@material-ui/core";
import useSwipe from "hooks/useSwipe";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
      margin: 0,
      padding: 0,
      width: "100vw",
      height: "100vh",
      overflowY: "auto",
      overflowX: "hidden",
      boxSizing: "border-box",
    },
    swipeRoot: {
      display: "flex",
      position: "absolute",
      left: 0,
      top: 0,
      transition: ".2s",
      "& .slickItem": {
        height: "30rem",
        width: "100vw",
        flexShrink: 0,
        textAlign: "center",
        backgroundColor: "#bca0a0",
      },
    },
  })
);

const Demo = () => {
  const classes = useStyles();
  const swipeRef = useRef();

  const onStart = (startInfo) => {
    return startInfo.x < 100;
  };
  const onEnd = (info) => {
    console.log(info);
    if (info.xSpeed > 0.5 || (info.xMovePercent > 0.5 && info.yMoved < 100)) {
      console.log("触发侧边栏展开");
    }
  };
  useSwipe({ onStart, onEnd }, swipeRef.current);
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   accessibility: false,
  // };
  return (
    <div className={classes.root}>
      <h2> Single Item</h2>
      {/* <Slider {...settings}> */}
      <div ref={swipeRef} className={classes.swipeRoot}>
        <div className="slickItem" data-num={1}>
          <h3>1</h3>
        </div>
        <div className="slickItem">
          <h3>2</h3>
        </div>
        <div className="slickItem">
          <h3>3</h3>
        </div>
        <div className="slickItem">
          <h3>4</h3>
        </div>
        <div className="slickItem">
          <h3>5</h3>
        </div>
        <div className="slickItem">
          <h3>6</h3>
        </div>
      </div>
      {/* </Slider> */}
    </div>
  );
};
export default Demo;
