
import React, {  useState } from "react";
import MyButton from "./UI/Button/MyButton";
import Myinput from "./UI/input/Myinput";

function PostForm({create}) {
    const [post, setPost] = useState({title: '', body: '',})

    const addNewPost = (e) => {
        e.preventDefault();
        
        // console.log(bodyInputRef.current.value)
    
        const newPost = {
          ...post, id: Date.now()
        }

        create(newPost)
        
        
        setPost({title: '', body: ''})
    
      }

  return (
    <form>
    {/* управляемый компонент */}
    <Myinput value={ post.title} onChange={ (e) => setPost( {...post, title: e.target.value})} type="text" placeholder="Название поста"/>

    {/* не управляемый компонент  ref*/}
    {/* <input ref={bodyInputRef} type="text" placeholder="описание поста" /> */} 
    
     <Myinput value={post.body} onChange={ (e) => setPost( {...post, body: e.target.value})} type="text" placeholder="описание поста" />
    <MyButton onClick={addNewPost} >Создать пост</MyButton>
  </form>
  )
}

export default PostForm