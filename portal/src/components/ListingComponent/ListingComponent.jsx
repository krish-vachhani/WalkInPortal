import './ListingComponent.css';
import {useNavigate} from "react-router-dom";

function ListingComponent(props) {

    const navigate = useNavigate();
    const textContent = props.textData;
    return (<div className="listing-component">
        <h2 className="job-title">{textContent.title}</h2>
        <div className="div--datetime">
            <label className="date-time-label">Date & Time :</label>
        </div>
        <div className="date-time">
            <label className="date-range">{textContent.startDate} to {textContent.expirationDate}</label>
            <div className="verticalDivider"></div>
            <img src="/resources/location_on_black_24dp.svg" alt="" className="location-icon"/>
            <label className="location-label">{textContent.location}</label>
        </div>
        <hr className="separator"/>
        <div className="job-roles-container">
            <label className="job-roles-label">Job Roles :</label>
            <div className="job-roles-list">
                {textContent.subOpening.map((item, index) => {
                    return (
                        <div key={index} className="job-role">
                            {item.jobrole.map((role, index) => (
                                <div key={role.idjobRole} className="job-role">
                                    <div className="image-div">
                                        {String(role.role) === "Instructional Designer" ? (
                                            <img src="/resources/Instructional Designer.svg"
                                                 alt="Instructional Designer Image"/>
                                        ) : String(role.role) === "Software Engineer" ? (
                                            <img src="/resources/Instructional Designer.svg"
                                                 alt="Software Engineer Image"/>
                                        ) : (
                                            <img src="/resources/Software Quality Engineer.svg"
                                                 alt="Default Image"/>
                                        )}
                                    </div>

                                    <label className="role-name">{role.role}</label>
                                    {(index !== (item.jobrole.length - 1)) &&
                                        <div className="verticalDivider"></div>
                                    }
                                </div>
                            ))}
                        </div>
                    );
                    // return (<div></div>)
                })}
            </div>
        </div>
        {/*{textContent.extraInfoLabel.length > 0 && <div className="extraInfo-div">*/}
        {/*    <label className="extraInfo-label">Extra INFO</label>*/}
        {/*</div>}*/}
        <div className="div--button" onClick={() => {
            navigate("/listings/" + props.id);
        }}>
            <button className="details-button">VIEW MORE DETAILS</button>
        </div>
    </div>);
}

export default ListingComponent;
