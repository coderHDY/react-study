import { useReducer, useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const style = {
  item: {
    backgroundColor: "blue",
  },
};

const Demo = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false,
  };
  return (
    <div>
      <h2> Single Item</h2>
      <Slider {...settings}>
        <div className="slickItem">
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
      </Slider>
    </div>
  );
};
export default Demo;
