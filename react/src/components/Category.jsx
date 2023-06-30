

export default function Category({image1,image2,title}){

    return(
        <a href="#" className="group block">
            <div className="relative h-[350px] sm:h-[450px]">
                <img
                    src={image1}
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-md object-cover opacity-100 group-hover:opacity-0 group-hover:brightness-75"
                />

                <img
                    src={image2}
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-md object-cover opacity-0 group-hover:opacity-100 group-hover:brightness-75"
                />
            </div>

            <div className="mt-3">
                <h3
                    className="text-xl text-gray-700 font-semibold uppercase group-hover:underline group-hover:underline-offset-4"
                >
                    {title}
                </h3>


            </div>
        </a>
    )
}
