import ListingComponent from "../../components/ListingComponent/ListingComponent.jsx";
import './ListingPage.css';
import MainHeader from "../../components/MainHeaderComponent/MainHeader.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_ALL_LISTINGS} from "../../gqlOperations/queries.js";

function ListingPage() {
    const {loading, error, data} = useQuery(GET_ALL_LISTINGS)
    if (loading) return <h1>Loading..</h1>
    if (error) console.log(error.message)
    console.log(data)
    return (
        <div>
            <MainHeader/>
            <div className="ListingPageMainDiv">
                {data.jobPostings &&
                    data.jobPostings.map((posting) => (
                        <ListingComponent
                            key={posting.jobId}
                            id={posting.jobId}
                            textData={posting}
                        />
                    ))}
            </div>
        </div>
    );
}

export default ListingPage;
