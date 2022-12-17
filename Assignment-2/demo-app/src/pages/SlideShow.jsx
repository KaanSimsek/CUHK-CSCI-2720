/**
 * CSCI2720/ESTR2106 Assignment 2
 * Simple Image System in React
 *
 * I declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * I also acknowledge that I am aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: Kaan Simsek
 * Student ID  : 1155191086
 * Date        : 19.11.2022
 */

import { clear } from '@testing-library/user-event/dist/clear';
import React from 'react'
import {useState, useEffect,useRef } from 'react'
import FileCard from '../components/Commons/FileCard'
function SlideShow() {
    let interval=0
    const pictures = [
        {filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK"},
        {filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK"},
        {filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem"},
        {filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings"},
        {filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus"},
      ];

    const [started,setStarted] = useState(false)
    const [currentInterval, setCurrentInterval] = useState(2000)
    const [currentIntervalChanged,setCurrentIntervalChanged]=useState(false)
    const [currentPictureId, setCurrentPictureId] = useState(0)
    const currentPictureIdRef = useRef(currentPictureId)
    const startedRef = useRef(started)
    const currentIntervalRef = useRef(currentInterval)
    const currentIntervalChangedRef = useRef(currentIntervalChanged)


    useEffect(() => {
        currentPictureIdRef.current = currentPictureId
        startedRef.current=started
        currentIntervalRef.current=currentInterval
        currentIntervalChangedRef.current=currentIntervalChanged
    })
    
    useEffect(()=>{
        if(started){
            interval = window.setInterval(() => changeThePicture(currentIntervalRef.current*1), currentIntervalRef.current);
        }
        else{
            clearInterval(interval);
        }
        

    },[started])

    
    const changeThePicture = (lenOfInterval)=>{

        
        if(startedRef.current===false){
            clearInterval(interval);
        }

        if(currentIntervalChangedRef.current){
            setCurrentIntervalChanged(false)
            clearInterval(interval);
            console.log(currentIntervalRef.current)
            interval = window.setInterval(() => changeThePicture(currentIntervalRef.current), currentIntervalRef.current);
        }

        else{
            if (currentPictureIdRef.current<pictures.length-1){
                setCurrentPictureId(currentPictureIdRef.current+1)
            }
            else{
                setCurrentPictureId(0)
            }
        }
    }

    const settingIntervalFunc = (n)=>{
        if(n===0){
            setCurrentInterval(currentInterval-200)
        }
        else if(n===1){
            setCurrentInterval(currentInterval+200)
        }
        else if(n===3){
            setStarted(true)
            interval = window.setInterval(() => changeThePicture(currentIntervalRef.current), currentIntervalRef.current);
            console.log(interval)
            return interval
        }
        clearInterval(interval)
        interval = window.setInterval(() => changeThePicture(currentIntervalRef.current), currentIntervalRef.current);
        console.log(interval)

    }

    

  return (
    <div>
        <div className='col'
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        <FileCard data={pictures[currentPictureId]}></FileCard>
        </div>
        <div className='col'
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <button onClick={()=>setStarted(true)}>Start</button>
            <button onClick={()=>setStarted(false)}>Stop</button>
            <button onClick={()=>{setCurrentInterval(currentInterval-200); setCurrentIntervalChanged(true)}}>Faster</button>
            <button onClick={()=>{setCurrentInterval(currentInterval+200); setCurrentIntervalChanged(true)}}>Slower</button>
        </div>



    </div>
  )
}

export default SlideShow


