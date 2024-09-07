import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents.slice(0, 4));

      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='w-full py-8'>
      <Container>
      <p className='text-3xl font-bold text-base-100 p-4 pt-0'>Hello and welcome to Write Space</p>
      <p className='text-2xl text-base-100 pl-4 pb-4'>Read the most recent blogs here.</p>
        <div className='flex flex-wrap justify-center md:justify-start items-center'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/4 mb-6'>
              <PostCard {...post}  />
            </div>
          ))}
        </div>
      </Container>
      {/* Centered Button */}
      <div className='flex justify-center items-center mt-6'>
        <Link to="/all-posts" className=' bg-base-100 text-white btn flex items-center space-x-2'>
          <span>Load More</span>
          <ArrowRightIcon className='h-5 w-5' />
        </Link>
      </div>
    </div>
  );
}

export default Home;
