'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactNode } from 'react';

const ImageSlider = ({ children }: { children: ReactNode }) => {
  const SilderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.5,
  };
  return <Slider {...SilderSettings}>{children}</Slider>;
};

export default ImageSlider;
