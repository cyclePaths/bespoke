import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import LeaderBoardList from './LeaderBoardList';
import { useKeenSlider } from 'keen-slider/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'keen-slider/keen-slider.min.css';
import { LeaderBoardDirections } from '../../StyledComp';

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
    loop: true,
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
        <div ref={sliderRef} className='keen-slider' style={{ height: '60vh' }}>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Liked Users</h2>
            <div className='leaderBoxOverride'>
              {top10Likes.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Like Users' />
              ))}
            </div>
          </div>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Top Travelers</h2>
            <div className='leaderBoxOverride'>
              {top10Miles.map((user, i) => (
                <LeaderBoardList
                  key={i}
                  i={i}
                  user={user}
                  type='Top Travelers'
                />
              ))}
            </div>
          </div>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Topic Chasers</h2>
            <div className='leaderBoxOverride'>
              {top10Post.map((user, i) => (
                <LeaderBoardList
                  key={i}
                  i={i}
                  user={user}
                  type='Topic Chasers'
                />
              ))}
            </div>
          </div>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Good Samaritans</h2>
            <div className='leaderBoxOverride'>
              {top10Reports.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
              ))}
            </div>
          </div>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Reliable Routers</h2>
            <div className='leaderBoxOverride'>
              {top10CreatedRoutes.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
              ))}
            </div>
          </div>
        </div>
      </div>
      <LeaderBoardDirections>
        <ArrowBackIcon sx={{ fontSize: '2rem' }} />
        Swipe
        <ArrowForwardIcon sx={{ fontSize: '2rem' }} />
      </LeaderBoardDirections>
    </>
  );
};

export default LeaderBoard;
