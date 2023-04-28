import { User } from '@prisma/client';
import React from 'react';
import { UserandValue } from './LeaderBoard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface ListProp {
  i: number;
  user: UserandValue;
  type: string;
}

const LeaderBoardList = ({ i, user, type }: ListProp) => {
  return (
    <div className='leaderList'>
      <div className='place-leaderboard'>
        {i === 0 ? (
          <EmojiEventsIcon sx={{ color: '#D4AF37', marginLeft: '5px' }} />
        ) : undefined}
        {i === 1 ? (
          <EmojiEventsIcon sx={{ color: '#C0C0C0', marginLeft: '5px' }} />
        ) : undefined}
        {i === 2 ? (
          <EmojiEventsIcon sx={{ color: '#CD7F32', marginLeft: '5px' }} />
        ) : undefined}
        {i >= 3 && i <= 8 ? (
          <div className='place-lb'>{`${i + 1}th`}</div>
        ) : undefined}
        {i === 9 ? <div className='place-10'>{`${i + 1}th`}</div> : undefined}
        <div className='user'>
          <span className='username-lb'>{user.name}</span>
        </div>
      </div>
      <div>
        <span className='leaderboard-value'>{user.value}</span>
      </div>
    </div>
  );
};

export default LeaderBoardList;
