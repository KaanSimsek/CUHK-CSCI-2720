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
import React from 'react'
import {useState} from 'react';
function FileCard({data}) {
    const [width,setWidth]=useState(200)

    const increaseSize= ()=>{
        setWidth(220)
    }

    const decreaseSize= ()=>{
        console.log("What the hell")
        setWidth(200)
    }

    return (
        <div onMouseEnter={() => increaseSize()} onMouseLeave={()=>decreaseSize()} className="card d-inline-block m-2" style={{width:width}}>
          <img  src={"/images/"+data.filename} className="w-100" />
          <div className="card-body">
            <h6 className="card-title">{data.filename}</h6>
            <p className="card-text">{data.year}</p>
          </div>
        </div>
    )
}

export default FileCard
