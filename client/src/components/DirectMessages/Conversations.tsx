// import * as React from 'react';
// import axios from 'axios';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';

// // interface DirectMessages = [{
// //   id: number;

// // }]

// const Conversations = () => {
//   const [users, setUsers] = React.useState();
//   // const [convos, setConvos] = React.useState<DirectMessages[]>([]);

//   const getConvos = async () => {
//     try {
//       const conversations = await axios.get('/dms/conversations');
//       console.log('Thread', conversations);
//       const { data } = conversations;

//       setConvos(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   React.useEffect(() => {
//     axios
//       .get('/dms/findUsers')
//       .then(({ data }) => {
//         // console.log('Users', data)
//         setUsers(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     getConvos();
//   }, []);

//   React.useEffect(() => {
//     console.log('Users', users);
//     console.log('converstions', convos);
//   }, [users, convos]);

//   return (
//     <List
//       sx={{ width: '100%', marginTop: '55px', bgcolor: 'rgba(11, 35, 1, 0.5)' }}
//     >
//       {convos &&
//         convos.map((convo) => {
//           return (
//             <React.Fragment key={convo.id}>
//               <ListItem alignItems='flex-start'>
//                 <ListItemAvatar>
//                   <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={convo.receiverId}
//                   secondary={
//                     <React.Fragment>
//                       <Typography
//                         sx={{ display: 'inline' }}
//                         component='span'
//                         variant='body2'
//                         color='text.primary'
//                       >
//                         Ali Connors
//                       </Typography>
//                       {" — I'll be in your neighborhood doing errands this…"}
//                     </React.Fragment>
//                   }
//                 />
//               </ListItem>
//               ;
//             </React.Fragment>
//           );
//         })}

//       {/* <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Summer BBQ"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 to Scott, Alex, Jennifer
//               </Typography>
//               {" — Wish I could come, but I'm out of town this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Oui Oui"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 Sandra Adams
//               </Typography>
//               {' — Do you have Paris recommendations? Have you ever…'}
//             </React.Fragment>
//           }
//         />
//       </ListItem> */}
//     </List>
//   );
// };

// export default Conversations;
