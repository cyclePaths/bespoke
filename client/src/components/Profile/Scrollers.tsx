import React, { useRef, useState } from 'react';
// import "./styles.css"
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const Scrollers = () => {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  // const [isActive, setIsActive] = useState(false);

  // const handleClick = () => {
  //   setIsActive(!isActive);
  // };

  return (
    <div>
      <div ref={ref} className='keen-slider'>
        <div className='keen-slider__slide number-slide1'>
          <button
            type='button'
            className='customButton'
            onClick={() => {
              console.log('Hello');
            }}
          >
            10- mph
          </button>
        </div>
        <div className='keen-slider__slide number-slide2'>2</div>
        <div className='keen-slider__slide number-slide3'>3</div>
        <div className='keen-slider__slide number-slide4'>4</div>
        <div className='keen-slider__slide number-slide5'>5</div>
        <div className='keen-slider__slide number-slide6'>6</div>
      </div>
      <div>
        <div ref={ref} className='keen-slider'>
          <div className='keen-slider__slide number-slide1'>1</div>
          <div className='keen-slider__slide number-slide2'>2</div>
          <div className='keen-slider__slide number-slide3'>3</div>
          <div className='keen-slider__slide number-slide4'>4</div>
          <div className='keen-slider__slide number-slide5'>5</div>
          <div className='keen-slider__slide number-slide6'>6</div>
        </div>
      </div>
      <div>
        <div ref={ref} className='keen-slider'>
          <div className='keen-slider__slide number-slide1'>1</div>
          <div className='keen-slider__slide number-slide2'>2</div>
          <div className='keen-slider__slide number-slide3'>3</div>
          <div className='keen-slider__slide number-slide4'>4</div>
          <div className='keen-slider__slide number-slide5'>5</div>
          <div className='keen-slider__slide number-slide6'>6</div>
        </div>
      </div>
    </div>
  );
};

export default Scrollers;
