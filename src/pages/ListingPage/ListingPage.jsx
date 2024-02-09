import ListingComponent from "../../components/ListingComponent/ListingComponent.jsx";
import './ListingPage.css';
import textDataFull from "../../data/listingData.json";
import React from "react";
import MainHeader from "../../components/MainHeaderComponent/MainHeader.jsx";

function ListingPage() {
    const [listData, setListData] = React.useState(textDataFull)
    return (<div>
            <MainHeader/>

            <div className="ListingPageMainDiv">
                {listData.map((textData) => (<ListingComponent key={textData.id} textData={textData}/>))}
            </div>
        </div>);
}

export default ListingPage;
