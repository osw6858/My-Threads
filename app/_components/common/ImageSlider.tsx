'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactNode } from 'react';
import '../post/style/sliderStyle.css';

const ImageSlider = ({
  children,
  slidesToShow,
}: {
  children: ReactNode;
  slidesToShow: number;
}) => {
  const SilderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
  };
  return <Slider {...SilderSettings}>{children}</Slider>;
};

export default ImageSlider;
