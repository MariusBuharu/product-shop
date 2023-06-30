import ContentLoader from "react-content-loader";

export default function CategoryPlaceholder(){
    return(
        <ContentLoader
            height={550}
            width={300}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
            style={{ marginBottom: "4px"}}
        >
            <rect x="0" y="0" rx="10" ry="10" width="250" height="400" />
            <rect x="0" y="420" rx="10" ry="10" width="250" height="28" />
            <rect x="0" y="460" rx="10" ry="10" width="250" height="28" />




        </ContentLoader>
    )
}
