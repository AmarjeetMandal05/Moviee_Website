import React, { useContext } from 'react'
// import { AppContext } from './context'
// import { useGlobalContext } from './context';
import Search from './Search';
import Movies from './Movies';

const Home = () => {
  // const name = useContext(AppContext)
  return (
    <>
      <Search/>
      <Movies/>
    </>
  )
};

export default Home