import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import LeaderBoardList from './LeaderBoardList';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export interface UserandValue {
  name: string;
  value: number;
}

const LeaderBoard = () => {
  const [top10Likes, setTop10Likes] = useState<UserandValue[]>([]);
  const [top10Miles, setTop10Miles] = useState<UserandValue[]>([]);
  const [top10Post, setTop10Post] = useState<UserandValue[]>([]);
  const [top10Reports, setTop10Reports] = useState<UserandValue[]>([]);
  const [top10CreatedRoutes, setTop10CreatedRoutes] = useState<UserandValue[]>(
    []
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const user = useContext(UserContext);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const fetchUserByTotalLikes = () => {
    axios
      .get('leaderboard/likes')
      .then(({ data }) => {
        setTop10Likes(data);
      })
      .catch((err) => {
        console.error('Failed request GET users: ', err);
      });
  };

  const fetchUserByTotalMiles = () => {
    axios
      .get('leaderBoard/travelMiles')
      .then(({ data }) => {
        setTop10Miles(data);
      })
      .catch((err) => {
        console.error('Failed request GET users: ', err);
      });
  };

  const fetchUserByTotalPost = () => {
    axios
      .get('leaderBoard/totalPosts')
      .then(({ data }) => {
        setTop10Post(data);
      })
      .catch((err) => {
        console.error('Failed request GET users: ', err);
      });
  };

  const fetchUserByTotalReports = () => {
    axios
      .get('leaderBoard/reports')
      .then(({ data }) => {
        setTop10Reports(data);
      })
      .catch((err) => {
        console.error('Failed request GET users: ', err);
      });
  };

  const fetchUserByTotalRoutesCreated = () => {
    axios
      .get('leaderBoard/bikeRoutes')
      .then(({ data }) => {
        setTop10CreatedRoutes(data);
      })
      .catch((err) => {
        console.error('Failed request GET users: ', err);
      });
  };

  useEffect(() => {
    fetchUserByTotalLikes();
    fetchUserByTotalMiles();
    fetchUserByTotalPost();
    fetchUserByTotalReports();
    fetchUserByTotalRoutesCreated();
  }, []);

  return (
    <>
      <div className='navigation-wrapper'>
        <div ref={sliderRef} className='keen-slider'>
          <div className='keen-slider__slide'>
            <h2 style={{ textAlign: 'center', marginTop: '5px' }}>
              Liked Users
            </h2>
            <div
              style={{ backgroundColor: 'lightsteelblue', borderRadius: '4px' }}
            >
              {top10Likes.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
              ))}
            </div>
          </div>
          <div className='keen-slider__slide'>
            <h2 style={{ textAlign: 'center', marginTop: '5px' }}>
              Top Travelers
            </h2>
            <div
              style={{ backgroundColor: 'lightsteelblue', borderRadius: '4px' }}
            >
              {top10Miles.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
              ))}
            </div>
          </div>
          <div className='keen-slider__slide'>
            <h2 style={{ textAlign: 'center', marginTop: '5px' }}>
              Topic Chasers
            </h2>
            <div
              style={{ backgroundColor: 'lightsteelblue', borderRadius: '4px' }}
            >
              {top10Post.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
              ))}
            </div>
          </div>
          <div className='keen-slider__slide'>
            <h2 style={{ textAlign: 'center', marginTop: '5px' }}>
              Good Samaritans
            </h2>
            <div
              style={{ backgroundColor: 'lightsteelblue', borderRadius: '4px' }}
            >
              {top10Reports.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
              ))}
            </div>
          </div>
          <div className='keen-slider__slide'>
            <h2 style={{ textAlign: 'center', marginTop: '5px' }}>
              Reliable Routers
            </h2>
            <div
              style={{ backgroundColor: 'lightsteelblue', borderRadius: '4px' }}
            >
              {top10CreatedRoutes.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;
