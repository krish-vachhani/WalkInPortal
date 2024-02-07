import './ListingComponent.css'

function ListingComponent() {
    let roles = [
        {name: "Software Engineer", image: "public/resources/Software Quality Engineer.svg"},
        {name: "Instructional Design", image: "public/resources/Instructional Designer.svg"}
    ];

    return (
        <div className="listing-component">
            <h2 className="job-title">Walk In For Designer Job Role</h2>
            <label className="date-time-label">Date & Time :</label>
            <br/>
            <div className="date-time">
                <label className="date-range">10-Jul-2021 to 11-Jul-2021</label>
                <div className="verticalDivider"></div>
                <img src="public/resources/location_on_black_24dp.svg" alt="" className="location-icon"/>
                <label className="location-label">Mumbai</label>
            </div>
            <hr className="separator"/>
            <div className="job-roles-container">
                <label className="job-roles-label">Job Roles :</label>
                <div className="job-roles-list">

                    {roles.map((role, index) => (
                        <div key={index} className="job-role">
                            <div className="image-div">
                                <img src={role.image} alt=""/>
                            </div>
                            <label className="role-name">{role.name}</label>
                            {(index !== (roles.length - 1)) && <div className="verticalDivider"></div>}
                        </div>

                    ))}
                </div>
            </div>
            <div className="extraInfo-div">
                <label className="extraInfo-label">Internship Opportunity for MCA Students</label>
            </div>
            <br/>
            <div className="div--button">
                <button className="details-button">VIEW MORE DETAILS</button>
            </div>
        </div>
    );
}

export default ListingComponent;
