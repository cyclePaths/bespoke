import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import LeaderBoardList from './LeaderBoardList';

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

  const user = useContext(UserContext);

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
    <div id='leaderboard-view'>
      <div>
        {top10Likes.map((user, i) => (
          <LeaderBoardList key={i} i={i} user={user} type='Total Likes' />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
