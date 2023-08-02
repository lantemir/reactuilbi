import React, { useRef, useState, useMemo, useEffect } from "react";
// import Counter from "./components/counter";
import '../styles/App.css';

import PostList from "../components/PostList";


import MyButton from "../components/UI/Button/MyButton";
import Myinput from "../components/UI/input/Myinput";
import PostForm from "../components/PostForm";
import MySelect from "../components/UI/select/MySelect";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import { usePosts } from "../hooks/usePosts";
import axios from "axios";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount, getPagesArray } from "../components/utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";

function Posts() {

  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({ sort: '', query: '' }) // sort: 'title' query: pyt...
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const lastElement = useRef();
  // const observer = useRef();
  console.log(lastElement)


  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit))
  })

  // useEffect(()=> {
  //   if(isPostsLoading) return
  //   if(observer.current) observer.current.disconnect();
  //   var callback = function (entries, observer) {

  //     if(entries[0].isIntersecting && page < totalPages ) {

  //       console.log(page)
  //       setPage(page+1)
  //     };


  //   };

  //   observer.current = new IntersectionObserver(callback);
  //   observer.current.observe(lastElement.current)
  // }, [isPostsLoading])

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])


  //const sortedPosts = getSortedPosts();

  //const [title, setTitle] = useState('')
  //const bodyInputRef = useRef(); // для доступа к дому элементу
  //const [body, setBody] = useState('')


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  // async function fetchPosts() {
  //   setIsPostsLoading(true);
  //   setTimeout( async()=> {     
  //     setIsPostsLoading(false);
  //   }, 1000)    
  // }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    // fetchPosts(limit, page)
  }



  return (
    <div className="App">
      <button onClick={fetchPosts}>Get posts</button>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>


      <hr style={{ margin: '15px 0' }}></hr>

      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue="Количество элементов на странице"
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'показать всё'},
        ]}
      />

      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов 1"} />
      <div ref={lastElement} style={{ height: 20, background: 'red' }} />

      {isPostsLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}> <Loader /> </div>
      }




      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />



    </div>
  );
}

export default Posts;




// setPosts([...posts].sort( (a, b) => a[sort].localeCompare(b[sort])))
// const sort = "title";

// const post = {
//   id: 1,
//   title: "Hello, World!",
// };

// console.log(post[sort]);