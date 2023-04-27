import { User } from '@prisma/client';
import React from 'react';
import { UserandValue } from './LeaderBoard';

interface ListProp {
  i: number;
  user: UserandValue;
  type: string;
}

const LeaderBoardList = ({ i, user, type }: ListProp) => {
  return (
    <div>
      {i === 0 ? <button>1st</button> : undefined}
      {i === 1 ? <button>2nd</button> : undefined}
      {i === 2 ? <button>3rd</button> : undefined}
      <div>{user.name}</div>
      <div>{user.value}</div>
    </div>
  );
};

export default LeaderBoardList;
