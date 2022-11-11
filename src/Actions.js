import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";


function Actions() {

  const [posts, setPosts] = useState([])
  const [day, setDay] = useState('')
  const [task, setTask] = useState('')
  const [completed, setCompleted] = useState(false)

  const getData = async ()=>{
    await axios.get(url)
    .then(res=> setPosts(res.data))
    .catch(error=>console.error(`Error is ${error}`))
  }

  useEffect(()=>{
    getData()
  },[])


  const postData = async (e)=>{
    e.preventDefault()
    await axios.post(url, {
      day, 
      task,
      completed
    })
    .then(res => {
      const data = res.data
      setPosts([...posts, data])
      setDay('')
      setTask('')
    })
    .catch(error=>{ console.error(`Error ${error}`)})

  }

  const deletePost = async (id)=>{
    await axios.delete(`http://localhost:8000/posts/${id}`)
    .then(setPosts( posts.filter(post =>{
      return post.id !== id
    })))
  }


  const checkPost = (id)=>{
      const data = posts.map(post=>{
        if(id === post.id){
          return {...post, completed:!post.completed}
        }
        return post
      })
      setPosts(data)
  }

  let url = 'http://localhost:8000/posts'

  return (
    <div>
        <form>
            <input placeholder='Day' type='text' value={day} onChange={(e)=>{setDay(e.target.value)}}/>
            <input placeholder='Task' type='text'value={task} onChange={(e)=>{setTask(e.target.value)}}/>
            <button onClick={postData} >Add..</button>
        </form>
        <br/>
      <h3>{posts.map(post=>{
        return <li className={ post.completed? 'done': ''} key={post.id}>Day- {post.day}   Task- {post.task} <FaCheck onClick={()=>{checkPost(post.id)}} /> <FaRegTrashAlt onClick={()=>{deletePost(post.id)}  }/>  </li>
      })}</h3>

    </div>
  )
}

export default Actions