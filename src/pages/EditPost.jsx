import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import { Container, PostForm } from '../components'


function EditPost() {

  const [post, setPosts] = useState(null)
  const { slug } = useParams()
  //The useParams hook in react-router-dom is used to access the parameters of the current route. This is useful when you need to extract dynamic parameters from the URL, such as user IDs, post IDs, or any other variable segments in the path.
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        setPosts(post)
      })
    } else {
      navigate("/")
    }

  }, [slug, navigate])
  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost