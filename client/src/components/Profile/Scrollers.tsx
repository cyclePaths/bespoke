import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';
// import classNames from 'classnames';
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
  const [activityVisible, setActivityVisible] = useState(false);
  const [hoursVisible, setHoursVisible] = useState(false);
  const [minutesVisible, setMinutesVisible] = useState(false);

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
        console.error(err);
      });
  };

  return (
    <div>
      <div>
        <button type='button'>Enter Ride Stats</button>
      </div>
      <div>
        {rideSpeed}
        {hours}
        {minutes}
      </div>
      <div className={activityVisible ? hiddenClass : ''}>
        <div ref={refActivity} className='keen-slider'>
          {workout.map((activity) => {
            return (
              <React.Fragment key={activity.value}>
                <div className='keen-slider__slide number-slide1'>
                  <button
                    type='button'
                    className='customButton'
                    onClick={() => {
                      setRideSpeed(activity.label);
                      setActivityVisible(true);
                    }}
                  >
                    {activity.label}
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className={hoursVisible ? hiddenClass : ''}>
        <div ref={refHours} className='keen-slider'>
          {durationHours.map((hour) => {
            return (
              <React.Fragment key={`${hour.value}-hour`}>
                <div className='keen-slider__slide number-slide1'>
                  <button
                    type='button'
                    className='customButton'
                    onClick={() => {
                      setHours(hour.label);
                      setHoursVisible(true);
                    }}
                  >
                    {hour.label}
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div className={minutesVisible ? hiddenClass : ''}>
        <div ref={refMinutes} className='keen-slider'>
          {durationMinutes.map((minute) => {
            return (
              <React.Fragment key={`${minute.value}-minute`}>
                <div className='keen-slider__slide number-slide1'>
                  <button
                    type='button'
                    className='customButton'
                    onClick={() => {
                      setMinutes(minute.label);
                      setMinutesVisible(true);
                    }}
                  >
                    {minute.label}
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <div>
        <button type='button' onClick={() => enterWorkout()}>
          Get Ride Stats
        </button>
      </div>
    </div>
  );
};

export default Scrollers;
