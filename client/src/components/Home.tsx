
import React from 'react';
import { useNavigate } from 'react-router-dom';
import{ RideStats } from './Profile/Profile';

// interface HomeProps {
//   rideStats: RideStats;
// }

const Home = ({ rideStats }) => {
  // const Home = (props: HomeProps) => {
    // const { rideStats } = props;
  const navigate = useNavigate();


  return(
    <div></div>
    // <div>
    // <div>ET Phone Home</div>
    //   <div style={{ position: 'absolute', marginTop: 20 }}>
    //     <ul>
    //       <li style={{ listStyleType: 'none' }}>
    //         {rideStats && `Your last ride was an ${rideStats.activity}`}
    //       </li>
    //       <li style={{ listStyleType: 'none' }}>
    //         {rideStats &&
    //           `You rode for ${Math.floor(rideStats.duration / 60)} hours and ${
    //             rideStats.duration % 60
    //           } minutes`}
    //       </li>
    //       <li style={{ listStyleType: 'none' }}>
    //         {rideStats &&
    //           `Your weight for this ride was ${rideStats.weight} lbs`}
    //       </li>
    //       <li style={{ listStyleType: 'none' }}>
    //         {rideStats && (
    //           <>
    //             You burned {rideStats.calories} calories!
    //             <br />
    //             Let's ride some more!
    //           </>
    //         )}
    //       </li>
    //       {/* {`Let's ride some more!`} */}
    //     </ul>
    //   </div>
    // </div>
  )
}


export default Home;
