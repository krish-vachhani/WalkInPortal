import './ListingComponent.css';
import {useNavigate} from "react-router-dom";

function ListingComponent(props) {

    const navigate = useNavigate();
    const textContent = props.textData;

    return (
        <div className="listing-component">
            <h2 className="job-title">{textContent.title}</h2>
            <div className="div--datetime">
                <label className="date-time-label">Date & Time :</label>
            </div>
            <div className="date-time">
                <label className="date-range">{textContent.dateRange}</label>
                <div className="verticalDivider"></div>
                <img src="public/resources/location_on_black_24dp.svg" alt="" className="location-icon"/>
                <label className="location-label">{textContent.locationLabel}</label>
            </div>
            <hr className="separator"/>
            <div className="job-roles-container">
                <label className="job-roles-label">Job Roles :</label>
                <div className="job-roles-list">
                    {textContent.rolesData.map((role, index) => (
                        <div key={index} className="job-role">
                            <div className="image-div">
                                {console.log(role.image)}
                                <img src={role.image} alt=""/>
                            </div>
                            <label className="role-name">{role.name}</label>
                            {(index !== (textContent.rolesData.length - 1)) && <div className="verticalDivider"></div>}
                        </div>
                    ))}
                </div>
            </div>
            {textContent.extraInfoLabel.length > 0 && <div className="extraInfo-div">
                <label className="extraInfo-label">{textContent.extraInfoLabel}</label>
            </div>}
            <div className="div--button" onClick={()=>{
                navigate("/listings/" + props.id);
            }}>
                <button className="details-button">VIEW MORE DETAILS</button>
            </div>
        </div>
    );
}

export default ListingComponent;
