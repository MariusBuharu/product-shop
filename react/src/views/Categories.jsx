import Category from "../components/Category.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios.js";

export default function Categories(){
    const [category,setCategory]=useState([])
    const getCategories = () => {
        axiosClient.get('/category').then(response => {
            const categories = response.data;
            setCategory(categories);
        }).catch(error => {
            console.error('Error fetching categories:', error);
        });
    };
    useEffect(()=>{
        getCategories();
    },[])
    return(
        <>
        <div className="grid grid-cols-1  md:grid-cols-4 gap-10 ml-10 mr-10 mb-10 mt-20">
            <Category image1={'/images/fruits.jpg'} image2={'/images/fruits-2.jpg'}  title={'Fruits'} description={'All fruits'}/>
            <Category image1={'/images/fruits.jpg'} image2={'/images/vegetables-2.jpg'} title={'Vegetables'} description={'All Veggies'}/>
            <Category image1={'/images/exotic.jpg'} image2={'/images/exotic-2.jpg'} title={'Exotic Fruits & Vegetables'} description={'All Exotic'}/>
            <Category image1={'/images/spices.jpg'} image2={'/images/spices-2.jpg'} title={'Spices'} description={'All Spices'}/>

        </div>
            <div className="text-gray-700 text-2xl">
                {category.map((entry) => (
                    <div key={entry.id}>{entry.name}{entry.id}

                    </div>

                ))}
            </div>
        </>
    )
}
