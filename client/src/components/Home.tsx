
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();


  return(
    <div>
    <div>ET Phone Home</div>
    {/* <button type='button'  onClick={() => navigate('/stopwatch')}>Stopwatch</button> */}
    </div>
  )
}


export default Home;
