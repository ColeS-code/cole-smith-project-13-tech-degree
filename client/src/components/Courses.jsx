import React from 'react';
import { useState, useEffect } from 'react'

const fetchData = () => {
    const [coursesData, setCoursesData] = useState([]);

    useEffect = () => {
        const data = async () => {
            try {
                const response = await fetch('');
                if (!response.ok) {
                    throw new Error ('network not responding')
                }
                const jsonData = await response.json()
                setCoursesData(jsonData);
            } catch (err) {
                //error message//
            }
        }
    }
}