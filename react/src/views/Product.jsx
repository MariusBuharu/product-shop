import {useState} from "react";
import {Button,  Rating, Typography} from "@material-tailwind/react";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/solid/index.js";
// import {useParams} from "react-router-dom";

export default function Product() {
    const [qty,setQty]=useState(0);
    // const {product_id}=useParams();
    const inc=() =>{
        setQty(qty=>qty+1);
    };
    const dec=() =>{
        if(qty>0)
        {
            setQty(qty => qty - 1);
        }
    }
    const [rated, setRated] = useState(0);
    return (
        <section>
            <div className="relative mx-auto max-w-screen-xl flex flex-col md:flex-row gap-20 px-4 py-8">
                <div className="lg:col-span-3">
                    <div className="relative mt-4">
                        <img
                            alt="Tee"
                            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="h-72 w-full rounded-xl object-cover lg:h-[540px]"
                        />

                        <div
                            className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white"
                        >
                            <svg
                                className="h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                            </svg>

                            <span className="ms-1.5 text-xs"> Hover to zoom </span>
                        </div>
                    </div>

                    <ul className="mt-1 flex gap-1">
                        <li>
                            <img
                                alt="Tee"
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="h-16 w-16 rounded-md object-cover"
                            />
                        </li>

                        <li>
                            <img
                                alt="Tee"
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="h-16 w-16 rounded-md object-cover"
                            />
                        </li>

                        <li>
                            <img
                                alt="Tee"
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="h-16 w-16 rounded-md object-cover"
                            />
                        </li>

                        <li>
                            <img
                                alt="Tee"
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className="h-16 w-16 rounded-md object-cover"
                            />
                        </li>
                    </ul>
                </div>
                    <div className="lg:sticky lg:top-0">

                        <div className="mt-8 flex justify-between">
                            <div className=" space-y-2">
                                <h1 className="text-xl font-bold sm:text-2xl">
                                    Fun Product That Does Something Cool
                                </h1>
                                <div className="flex items-center gap-2">
                                    <Rating value={0} onChange={(value) => setRated(value)} />
                                    <Typography color="blue-gray" className="font-medium">
                                        {rated}.0 Rated
                                    </Typography>
                                </div>
                            </div>

                            <p className="text-lg font-bold">$119.99</p>
                        </div>

                        <div className="mt-4">
                            <div className="prose max-w-none">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                                    veniam dicta beatae eos ex error culpa delectus rem tenetur,
                                    architecto quam nesciunt, dolor veritatis nisi minus inventore,
                                    rerum at recusandae?
                                </p>
                            </div>

                            <button className="mt-2 text-sm font-medium underline">Read More</button>
                        </div>

                        <form className="mt-8">

                            <fieldset className="mt-4">
                                <legend className="mb-1 text-md   font-medium text-gray-700">Manufacturer</legend>

                                <Button variant="gradient"   className="rounded-full ml-2">
                                    Brand 1
                                </Button>
                                <Button variant="gradient" className="rounded-full ml-2">
                                    Brand 2
                                </Button>
                                <Button variant="gradient" className="rounded-full ml-2">
                                    Brand 3
                                </Button>
                            </fieldset>

                            <div className="mt-8 flex gap-4">
                                <Button color={"white"} onClick={inc}  className="rounded-full shadow-none hover:shadow-none scale-75 -mr-8">
                                    <PlusIcon  className="h-4 scale-150  w-4"/>
                                </Button>
                                <input
                                    type="number"
                                    id="Quantity"
                                    value={qty}
                                    className="h-10 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <Button color={"white"} onClick={dec}  className="rounded-full shadow-none hover:shadow-none scale-75 -ml-8">
                                    <MinusIcon className="h-4 scale-150  w-4"/>
                                </Button>

                                <Button color='green' variant="gradient">Add to Cart</Button>
                            </div>
                        </form>

                </div>
            </div>
        </section>
    );
}
