import PageComponent from "../components/PageComponent";
import ProductAdd from "../components/ProductAdd.jsx";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import CategoryAdd from "../components/CategoryAdd.jsx";
import {useState} from "react";
function Icon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
             className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>


    );
}

export default function Dashboard() {
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <PageComponent title="Dashboard">

            <Accordion open={open === 1} icon={<Icon/>}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                    Create a new Product
                </AccordionHeader>
                <AccordionBody>
                    <ProductAdd />
                </AccordionBody>
            </Accordion>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                    Create a new Category
                </AccordionHeader>
                <AccordionBody>
                    <CategoryAdd />
                </AccordionBody>
            </Accordion>
        </PageComponent>
    );
}
