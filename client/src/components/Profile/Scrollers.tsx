import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Root, { UserContext } from '../../Root';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { exiledRedHeadedStepChildrenOptionGroups } from '../../../profile-assets';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const Scrollers = ({ setShowScrollers }) => {
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
  const [activityMessage, setActivityMessage] = useState('');
  const [hoursMessage, setHoursMessage] = useState('');
  const [minutesMessage, setMinutesMessage] = useState('');
  const [activityVisible, setActivityVisible] = useState(true);
  const [hoursVisible, setHoursVisible] = useState(false);
  const [minutesVisible, setMinutesVisible] = useState(false);
  const [sliderStage, setSliderStage] = useState(0);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [show2ndErrorAlert, setShow2ndErrorAlert] = useState(false);
  const [weight, setWeight] = useState(0);
  const [user, setUser] = useState();
  const [showStack, setShowStack] = useState(true);
  const [hoursValue, setHoursValue] = useState('');
  const [minutesValue, setMinutesValue] = useState('');

  let rideSpeedValue = '';

  const { workout, durationHours, durationMinutes } =
    exiledRedHeadedStepChildrenOptionGroups;

  let totalTime = 0;

  if (hoursValue !== '' || minutesValue !== '') {
    const rideHours = Number(hoursValue);
    const rideMinutes = Number(minutesValue);

    totalTime = rideHours + rideMinutes;
  }

  useEffect(() => {
    for (let i = 0; i < workout.length; i++) {
      if (workout[i].label === rideSpeed) {
        rideSpeedValue = workout[i].value;
      }
    }
    console.log('Speed', rideSpeed);
  });

  useEffect(() => {
    axios
      .get('/profile/weight')
      .then(({ data }) => {
        setWeight(data.weight);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log('weight', weight);

  const enterWorkout = () => {
    if (weight >= 50) {
      axios
        .get('/profile/workout', {
          params: {
            activity: rideSpeedValue,
            duration: totalTime,
            weight: weight,
          },
        })
        .then(({ data }) => {
          // setShowSuccessAlert(true);
          const { total_calories } = data;
          axios
            .post('/profile/workout', {
              activity: rideSpeed,
              duration: totalTime,
              weight: weight,
              calories: total_calories,
            })
            .then(() => {})
            .catch((err) => {
              console.log(err);
            });
        })

        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 6000);
    }
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

  const successfullyEnteredStats = () => {
    setRideSpeed('');
    setHoursValue('');
    setMinutesValue('');
    setTimeout(() => {
      setActivityMessage('');
      setHoursMessage('');
      setMinutesMessage('');
      setSliderStage(0);
      setShowStack(true);
    }, 8000);
  };

  const unsuccessfullyEnteredStats = () => {
    setRideSpeed('');
    setHoursValue('');
    setMinutesValue('');
    setTimeout(() => {
      setActivityMessage('');
      setHoursMessage('');
      setMinutesMessage('');
    }, 2000);
  };

  const handleGetRideStatsButton = () => {
    if (rideSpeedValue === '') {
      setShow2ndErrorAlert(true);
      unsuccessfullyEnteredStats();
      setTimeout(() => {
        setShow2ndErrorAlert(false);
      }, 6000);
    } else if (hoursValue === '' && minutesValue === '') {
      setShow2ndErrorAlert(true);
      unsuccessfullyEnteredStats();
      setTimeout(() => {
        setShow2ndErrorAlert(false);
      }, 6000);
    } else {
      if (weight < 50) {
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 6000);
      } else {
        enterWorkout();
        setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 6000);
        successfullyEnteredStats();
        setShowStack(false);
        // setShowScrollers(true);
      }
    }
  };

  return (
    <>
      <div className='scroller-parent'>
        <div className='selected-stats-state'>
          {activityMessage}
          <br />
          {hoursMessage}
          <br />
          {minutesMessage}
        </div>
        {sliderStage === 0 && (
          <div
            ref={refActivity}
            className='keen-slider current-scroller'
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
                        setActivityMessage(`You chose: ${activity.label}`);
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
            className='keen-slider current-scroller'
            style={{
              visibility: sliderStage === 1 ? 'visible' : 'hidden',
              opacity: sliderStage === 1 ? 1 : 0,
            }}
          >
            {durationHours.map((hour) => {
              const { value, label } = hour;
              return (
                <React.Fragment key={`${value}-hour`}>
                  <div className='keen-slider__slide number-slide2'>
                    <button
                      type='button'
                      className='customButton'
                      onClick={() => {
                        setHours(label);
                        setHoursValue(value);
                        console.log('hour', hoursValue);
                        // filterHours(hours.label);
                        // console.log('hour label', hour.label)
                        setHoursMessage(`Hours riding: ${label}`);
                        setSliderStage(2);
                      }}
                    >
                      {label}
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
            className='keen-slider current-scroller'
            style={{
              visibility: sliderStage === 2 ? 'visible' : 'hidden',
              opacity: sliderStage === 2 ? 1 : 0,
            }}
          >
            {durationMinutes.map((minute) => {
              const { value, label } = minute;
              return (
                <React.Fragment key={`${value}-minute`}>
                  <div className='keen-slider__slide number-slide6'>
                    <button
                      type='button'
                      className='customButton'
                      onClick={() => {
                        setMinutes(label);
                        setMinutesValue(value);
                        console.log('minute', minutesValue);
                        setMinutesMessage(`Minutes riding: ${label}`);
                        setSliderStage(3);
                      }}
                    >
                      {label}
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
      {showStack && (
        <Stack direction='row' spacing={2}>
          <div className='buttonContainer'>
            {sliderStage > 0 && (
              <Button
                type='button'
                variant='contained'
                className='backButton'
                sx={{ position: 'fixed', left: 0 }}
                onClick={handleBackButtonClick}
              >
                &lt; &lt;
              </Button>
            )}

            {sliderStage === 0 && (
              <Button
                type='button'
                variant='contained'
                disabled
                className='backButton'
                sx={{
                  position: 'fixed',
                  left: 0,
                  color: 'white !important',
                  opacity: 0.4,
                  backgroundColor: 'rgb(30, 136, 229) !important',
                }}
              >
                &lt; &lt;
              </Button>
            )}

            {sliderStage < 3 && (
              <Button
                type='button'
                variant='contained'
                className='forwardButton'
                sx={{ position: 'fixed', right: 0 }}
                onClick={handleForwardButtonClick}
              >
                &gt; &gt;
              </Button>
            )}

            {sliderStage === 3 && (
              <Button
                type='button'
                variant='contained'
                disabled
                className='forwardButton'
                sx={{
                  position: 'fixed',
                  right: 0,
                  color: 'white !important',
                  opacity: 0.4,
                  backgroundColor: 'rgb(30, 136, 229) !important',
                }}
              >
                &gt; &gt;
              </Button>
            )}

            {sliderStage < 3 && (
              <Button
                type='button'
                variant='contained'
                disabled
                color='success'
                className='rideStatsButton'
                sx={{
                  position: 'fixed',
                  center: 0,
                  color: 'white !important',
                  opacity: 0.4,
                  backgroundColor: 'rgb(76, 175, 80) !important',
                }}
              >
                Get Ride Stats
              </Button>
            )}

            {sliderStage === 3 && (
              <Button
                type='button'
                variant='contained'
                color='success'
                className='rideStatsButton'
                sx={{ position: 'fixed', center: 0 }}
                onClick={handleGetRideStatsButton}
              >
                Get Ride Stats
              </Button>
            )}
          </div>
        </Stack>
      )}
      <>
        {showErrorAlert && (
          <Stack className='error-success-alert'>
            <Alert severity='error' onClose={() => setShowErrorAlert(false)}>
              <strong>Must enter weight to track stats</strong>
            </Alert>
          </Stack>
        )}

        {showSuccessAlert && (
          <Stack className='error-success-alert'>
            <Alert
              severity='success'
              onClose={() => setShowSuccessAlert(false)}
            >
              <strong>Stats successfully saved!</strong>
            </Alert>
          </Stack>
        )}

        {show2ndErrorAlert && (
          <Stack className='error-success-alert'>
            <Alert severity='error' onClose={() => setShow2ndErrorAlert(false)}>
              <strong>
                Must enter average speed and a time to track stats
              </strong>
            </Alert>
          </Stack>
        )}
      </>
    </>
  );
};

export default Scrollers;
