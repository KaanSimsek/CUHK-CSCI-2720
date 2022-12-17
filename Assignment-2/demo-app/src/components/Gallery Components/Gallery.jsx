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
import FileCard from '../Commons/FileCard'





function Gallery() {
  const pictures = [
    {filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK"},
    {filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK"},
    {filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem"},
    {filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings"},
    {filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus"},
  ];
    console.log(pictures[0].filename)
    return (
      <div>
        {pictures.map((data) => (
          
            <FileCard data={data}>

            </FileCard>
           
        ))}
      </div>
    )
}

export default Gallery
