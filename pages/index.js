import React, {useState, useEffect, useContext} from 'react'
import {MdVerified} from 'react-icons/md';
import {RiSendPlaneFill, RiCloseFill } from 'react-icons/ri';
import {AiFillLock, AiFillUnlock } from 'react-icons/ai';
import Image from 'next/image';

//internal import
import { ToDoListContext } from '../context/ToDoListApp'
import Style from '../styles/index.module.css';
import Loading from '../loading.gif';



const Home = () => {
  const {checkIfWalletIsConnect, toDoList } = useContext(ToDoListContext);

  useEffect (() => {
    checkIfWalletIsConnect();
    toDoList();
  }, []);


  return (
    <div>Home</div>
  )
}

export default Home
