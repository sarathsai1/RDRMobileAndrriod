// import React, { useContext, useEffect, useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext, AuthContextType } from '../../services/AuthContext';
// import { parseJwt } from '../misc/Helpers';

// const OAuth2Redirect: React.FC = () => {
//   const { userLogin } = useContext(AuthContext) as AuthContextType;
//   const [redirectTo, setRedirectTo] = useState<string>('/login');
//   const location = useLocation();

//   useEffect(() => {
//     const accessToken = extractUrlParameter('token');
//     if (accessToken) {
//       handleLogin(accessToken);
//       setRedirectTo('/dashboard');
//     }
//   }, []);

//   const extractUrlParameter = (key: string): string | null => {
//     return new URLSearchParams(location.search).get(key);
//   };

//   const handleLogin = (accessToken: string) => {
//     try {
//       const data = parseJwt(accessToken);
//       const user = { data, accessToken };
//       userLogin(user);
//     } catch (error) {
//       console.error('Failed to parse JWT token or login user:', error);
//       // Optionally handle error, e.g., set an error message state
//     }
//   };

//   return <Navigate to={redirectTo} />;
// };

// export default OAuth2Redirect;
