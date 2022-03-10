// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({component: Component, ...rest}) => {
//     return (

//         // Show the component only when the user is logged in
//         // Otherwise, redirect the user to /signin page
//         <Route {...rest} render={props => (
//             Dashboard() ?
//                 <Component {...props} />
//             : <Navigate to="/Register" />
//         )} />
//     );
// };

// export default ProtectedRoute;