import Category from "../components/Category.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios.js";
import {PacmanLoader} from "react-spinners";
import CategoryPlaceholder from "../placeholders/CategoryPlaceholder.jsx";

export default function Categories(){
    const [loading,setLoading]=useState(false);
    const [category,setCategory]=useState([])
    const getCategories = () => {

        axiosClient.get('/category').then(response => {
            const baseUrl = "http://localhost:8000/"; // Replace with your actual base URL
            const categories = response.data.data.map((category)=>
                ({...category,
                image_url:category.image_url.map((relativeUrl)=>
                baseUrl+relativeUrl),
                }
            ));
            if (Array.isArray(categories)) {
                setCategory(categories);
                setLoading(false);
            } else {
                console.log("Invalid category data:", categories);
            }
        }).catch(error => {
            console.error('Error fetching categories:', error);
        });
    };
    useEffect(()=>{
        setLoading(true);
        getCategories();

    },[])
    return(
        <>
            {loading && <div className="mx-auto text-lg"><PacmanLoader
                color="#059669"
                margin={2}
                size={40}
                speedMultiplier={2}
                className='absolute mt-60 left-[40%] scale-150'
            /></div>}

            {!loading && <div className="grid grid-cols-1  md:grid-cols-4 gap-10 ml-10 mr-10 mb-10 mt-20">
                {category.map((entry) => (
                    <Category  key={entry.id} image1={entry.image_url[0]} image2={entry.image_url[1]}
                              title={entry.name}/>
                ))}
            </div>}

        </>
    )
}
