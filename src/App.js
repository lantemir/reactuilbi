// import React, { useRef, useState, useMemo, useEffect } from "react";
// import Counter from "./components/counter";
// import './styles/App.css';

// import PostList from "./components/PostList";
// import MyButton from "./components/UI/Button/MyButton";
// import Myinput from "./components/UI/input/Myinput";
// import PostForm from "./components/PostForm";
// import MySelect from "./components/UI/select/MySelect";
// import PostFilter from "./components/PostFilter";
// import MyModal from "./components/UI/MyModal/MyModal";
// import { usePosts } from "./hooks/usePosts";
// import axios from "axios";
// import PostService from "./API/PostService";
// import Loader from "./components/UI/Loader/Loader";
// import { useFetching } from "./hooks/useFetching";
// import { getPageCount, getPagesArray } from "./components/utils/pages";
// import Pagination from "./components/UI/pagination/Pagination";

import { BrowserRouter as Router, Routes, Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(()=> {
    if(localStorage.getItem('auth') ){
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <Router>
        <Navbar />
        <AppRouter />
      </Router>
    </AuthContext.Provider>
  )
}

export default App;




// setPosts([...posts].sort( (a, b) => a[sort].localeCompare(b[sort])))
// const sort = "title";

// const post = {
//   id: 1,
//   title: "Hello, World!",
// };

// console.log(post[sort]);