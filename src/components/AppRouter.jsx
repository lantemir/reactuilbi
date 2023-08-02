import React, { useContext } from 'react'

import { Routes, Route } from "react-router-dom";
import Error from "../pages/Error";
import { privateRoutes, publicRoutes } from '../router';
import Login from '../pages/Login';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

function AppRouter() {
  const {isAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth)

  if(isLoading) {
    return  <Loader/>
  }
  
  return (
    isAuth
      ?
      <Routes>
        {privateRoutes.map(route =>
          <Route path={route.path} element={route.component} exact={route.exact} key={route.path} />
        )}   

        <Route path="*" element={<Error />} />
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route =>
          <Route path={route.path} element={route.component} exact={route.exact} key={route.path} />
        )}

        <Route path="*" element={<Login />} />
      </Routes>


  )
}

export default AppRouter



 {/* <Route path="/about" element={<About />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/posts/:id" element={<PostIdPage />} /> */}


