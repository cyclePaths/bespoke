import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import LeaderBoardList from './LeaderBoardList';
import { useKeenSlider } from 'keen-slider/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'keen-slider/keen-slider.min.css';
import { LeaderBoardDirections, LeaderBoardStatsDiv } from '../../StyledComp';

export interface UserandValue {
  name: string;
  value: number;
  selectedBadge: string;
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
  const { user, isDark } = useContext(UserContext);
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
        // for (let i = 0; i <= data.length; i++) {
        //   if (data[i].name === user.name) {
        //     user.addBadge('Likable Legend', 3);
        //   }
        // }
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
        // for (let i = 0; i <= data.length; i++) {
        //   if (data[i].name === user.name) {
        //     user.addBadge('Traveling Legend', 3);
        //   }
        // }
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
        // for (let i = 0; i <= data.length; i++) {
        //   if (data[i].name === user.name) {
        //     user.addBadge('Community Legend', 3);
        //   }
        // }
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
        // for (let i = 0; i <= data.length; i++) {
        //   if (data[i].name === user.name) {
        //     user.addBadge('Legendary Warden', 3);
        //   }
        // }
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
        // for (let i = 0; i <= data.length; i++) {
        //   if (data[i].name === user.name) {
        //     user.addBadge('Legendary Explorer', 3);
        //   }
        // }
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
        <div ref={sliderRef} className='keen-slider' style={{ height: '65vh' }}>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Liked Users</h2>
            <LeaderBoardStatsDiv>
              {top10Likes.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Like Users' />
              ))}
            </LeaderBoardStatsDiv>
          </div>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Top Travelers</h2>
            <LeaderBoardStatsDiv>
              {top10Miles.map((user, i) => (
                <LeaderBoardList
                  key={i}
                  i={i}
                  user={user}
                  type='Top Travelers'
                />
              ))}
            </LeaderBoardStatsDiv>
          </div>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Topic Chasers</h2>
            <LeaderBoardStatsDiv>
              {top10Post.map((user, i) => (
                <LeaderBoardList
                  key={i}
                  i={i}
                  user={user}
                  type='Topic Chasers'
                />
              ))}
            </LeaderBoardStatsDiv>
          </div>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Good Samaritans</h2>
            <LeaderBoardStatsDiv>
              {top10Reports.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
              ))}
            </LeaderBoardStatsDiv>
          </div>
          <div className='keen-slider__slide'>
            <h2 className='leaderboardTitles'>Reliable Routers</h2>
            <LeaderBoardStatsDiv>
              {top10CreatedRoutes.map((user, i) => (
                <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
              ))}
            </LeaderBoardStatsDiv>
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
