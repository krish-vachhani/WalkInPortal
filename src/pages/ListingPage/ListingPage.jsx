import ListingComponent from "../../components/ListingComponent/ListingComponent.jsx";
import './ListingPage.css';
import textDataFull from "../../data/listingData.json";
import React from "react";

function ListingPage() {
    const [listData, setListData] = React.useState(textDataFull)

    return (
        <div className="ListingPageMainDiv">
            {listData.map((textData) => (
                <ListingComponent key={textData.id} textData={textData}/>
            ))}
        </div>
    );
}

export default ListingPage;
