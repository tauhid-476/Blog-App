import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'


//  ${id} is the id of the post 
// and featuredImage***
// is the id of the image

function PostCard({ $id, title, featuredImage }) {
  return (

    <div className='w-full bg-gray-300 rounded-xl p-4 flex flex-col'>
      <div className='flex-shrink-0 mb-4'>
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className='w-full h-48 object-cover rounded-xl'
        />
      </div>
      <h2 className='text-xl font-bold truncate text-base-100'>{title}</h2>
      <Link to={`/post/${$id}`}>
        <button className='mt-4 bg-base-200 hover:bg-base-300  text-white font-bold py-2 px-4 rounded'>Load full post

        </button>
      </Link>
    </div>

  );
}

export default PostCard;