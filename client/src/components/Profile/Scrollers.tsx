import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Root, { UserContext } from '../../Root';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { exiledRedHeadedStepChildrenOptionGroups } from '../../../profile-assets';

const Scrollers = () => {
  const [refActivity] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  const [refHours] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  const [refMinutes] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: {
      perView: 3,
      spacing: 15,
    },
  });

  const hiddenClass = 'hidden';

  const [rideSpeed, setRideSpeed] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [clickedHours, setClickedHours] = useState(false);
  const [clickedMinutes, setClickedMinutes] = useState(false);
  const [activityVisible, setActivityVisible] = useState(true);
  const [hoursVisible, setHoursVisible] = useState(false);
  const [minutesVisible, setMinutesVisible] = useState(false);
  const [sliderStage, setSliderStage] = useState(0);

  let rideSpeedValue = '';

  const { workout, durationHours, durationMinutes } =
    exiledRedHeadedStepChildrenOptionGroups;

  const user = useContext(UserContext);

  let weight = user?.weight ?? 0;

  let totalTime = Number(hours) * 60 + Number(minutes);

  useEffect(() => {
    if (clickedHours && clickedMinutes) {
      totalTime = Number(hours) * 60 + Number(minutes);
      console.log(totalTime);
    }
  }, [clickedHours, clickedMinutes]);

  useEffect(() => {
    for (let i = 0; i < workout.length; i++) {
      if (workout[i].label === rideSpeed) {
        rideSpeedValue = workout[i].value;
      }
    }
  });

  const enterWorkout = () => {
    axios
      .get('/profile/workout', {
        params: {
          activity: rideSpeedValue,
          duration: totalTime,
          weight: weight,
        },
      })
      .then(({ data }) => {
        const { total_calories } = data;
        axios.post('profile/workout', {
          activity: rideSpeed,
          duration: totalTime,
          weight: weight,
          calories: total_calories,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackButtonClick = () => {
    if (sliderStage === 1) {
      setActivityVisible(true);
      setHoursVisible(false);
    } else if (sliderStage === 2) {
      setHoursVisible(true);
      setMinutesVisible(false);
    }
    setSliderStage(sliderStage - 1);
  };

  const handleForwardButtonClick = () => {
    if (sliderStage === 0) {
      setActivityVisible(false);
      setHoursVisible(true);
    } else if (sliderStage === 1) {
      setHoursVisible(false);
      setMinutesVisible(true);
    }
    setSliderStage(sliderStage + 1);
  };

  return (
    <div>
      <div>
        {rideSpeed}
        {hours}
        {minutes}
      </div>
      {sliderStage === 0 && (
        <div
          ref={refActivity}
          className='keen-slider'
          style={{
            visibility: sliderStage === 0 ? 'visible' : 'hidden',
            opacity: sliderStage === 0 ? 1 : 0,
          }}
        >
          {workout.map((activity) => {
            return (
              <React.Fragment key={activity.value}>
                <div className='keen-slider__slide number-slide1'>
                  <button
                    type='button'
                    className='customButton'
                    onClick={() => {
                      setRideSpeed(activity.label);
                      setSliderStage(1);
                    }}
                  >
                    {activity.label}
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
      {sliderStage === 1 && (
        <div
          ref={refHours}
          className='keen-slider'
          style={{
            visibility: sliderStage === 1 ? 'visible' : 'hidden',
            opacity: sliderStage === 1 ? 1 : 0,
          }}
        >
          {durationHours.map((hour) => {
            return (
              <React.Fragment key={`${hour.value}-hour`}>
                <div className='keen-slider__slide number-slide1'>
                  <button
                    type='button'
                    className='customButton'
                    onClick={() => {
                      setHours(hour.label);
                      setSliderStage(2);
                    }}
                  >
                    {hour.label}
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {sliderStage === 2 && (
        <div
          ref={refMinutes}
          className='keen-slider'
          style={{
            visibility: sliderStage === 2 ? 'visible' : 'hidden',
            opacity: sliderStage === 2 ? 1 : 0,
          }}
        >
          {durationMinutes.map((minute) => {
            return (
              <React.Fragment key={`${minute.value}-minute`}>
                <div className='keen-slider__slide number-slide1'>
                  <button
                    type='button'
                    className='customButton'
                    onClick={() => {
                      setMinutes(minute.label);
                      setSliderStage(3);
                    }}
                  >
                    {minute.label}
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}
      <div className='buttonContainer'>
        {sliderStage > 0 && (
          <button
            type='button'
            className='backButton'
            onClick={handleBackButtonClick}
          >
            &lt; &lt;
          </button>
        )}
        {sliderStage < 3 && (
          <button
            type='button'
            className='forwardButton'
            onClick={handleForwardButtonClick}
          >
            &gt; &gt;
          </button>
        )}
        {sliderStage === 3 && (
          <button
            type='button'
            className='rideStatsButton'
            onClick={() => enterWorkout()}
          >
            Get Ride Stats
          </button>
        )}
      </div>
    </div>
  );
};

export default Scrollers;
