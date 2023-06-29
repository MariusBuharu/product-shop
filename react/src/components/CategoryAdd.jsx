import {useState} from "react";
import axiosClient from "../axios.js";
import {PhotoIcon} from "@heroicons/react/20/solid/index.js";

export default function CategoryAdd(){
    const [category,setCategory]= useState({
        name: "",
        slug: "",
        status: false,
        images: [],
        images_url: [],
    });
    const [error,setError]=useState('');

    const onImageChoose=(ev)=>{
        const files= ev.target.files;
        const imagesArray=Array.from(files);
        imagesArray.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                setProduct((prevState) => ({
                    ...prevState,
                    images: [...prevState.images, file],
                    images_url: [...prevState.images_url, reader.result],
                }));
            };
            reader.readAsDataURL(file);
        });

        ev.target.value = '';
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = { ...product,category_id: product.category  };
        if (Array.isArray(payload.images) && payload.images.length > 0) {
            payload.images = payload.images_url;
        }
        delete payload.images_url;
        console.log(payload.images);

        let res = null;
        res = axiosClient.post('/products', payload);
        console.log(payload, 'Payload');
        res
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                if (err && err.response) {
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };



    const onDelete = () => {

    }
    return(
        <form action="#" method="POST" encType="multipart/form-data" onSubmit={onSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md ">

                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    {error && <div className="bg-red-500 text-white py-3 px-3 rounded-lg ">
                        {error}
                    </div>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Photo
                        </label>
                        <div className="mt-1 flex items-center">
                            {product.images_url.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-32 h-32 object-cover mr-2"
                                />
                            ))}
                            {product.images_url.length === 0 && (
                                <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                           <PhotoIcon className="w-8 h-8" />
                                           </span>
                            )}
                            <button
                                type="button"
                                className="relative  ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <input
                                    type="file"
                                    multiple
                                    className="absolute cursor-pointer left-0 top-0 right-0 bottom-0 opacity-0"
                                    onChange={onImageChoose}
                                />
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={category.name}
                            onChange={(ev) =>
                                setCategory({...category, name: ev.target.value})
                            }
                            placeholder="Category Name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/*Title*/}
                    <div className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor="slug"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Product Slug
                        </label>
                        <input
                            type="text"
                            name="slug"
                            id="slug"
                            value={category.slug}
                            onChange={(ev) =>
                                setCategory({...category, slug: ev.target.value})
                            }
                            placeholder="Product Slug"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/*Title*/}

                    </div>


                    {/*Active*/}
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                            <input
                                id="status"
                                name="status"
                                type="checkbox"
                                checked={category.status}
                                onChange={(ev) =>
                                    setCategory({...category, status: ev.target.checked})
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="comments"
                                className="font-medium text-gray-700"
                            >
                                Active
                            </label>
                            <p className="text-gray-500">
                                Whether to make survey publicly available
                            </p>
                        </div>
                    </div>
                    <button>Save</button>
                </div>
        </form>
    )
}
