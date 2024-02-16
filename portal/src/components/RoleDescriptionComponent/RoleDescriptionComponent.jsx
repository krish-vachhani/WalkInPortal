import './RoleDescriptionComponent.css';
import roleData from "../../data/roleData.json";
import React from "react";
import {useQuery} from "@apollo/client";
import {GET_SINGLE_LISTING} from "../../gqlOperations/queries.js";


function RoleDescriptionComponent(props) {
    function formatSalary(value) {
        return value.toLocaleString('en-IN', {
            maximumFractionDigits: 0
        });
    }

    const roleDetails = props.roleDetails
    const id = roleDetails.idjobRole
    const role = roleDetails.role
    const roleDescription = roleDetails.description
    const requirements = roleDetails.requirements
    let salary = formatSalary(roleDetails.compensation);

    const [isExpandedRole, setIsExpandedRole] = React.useState(false);
    const handleToggleExpandRole = () => {
        setIsExpandedRole((prevState) => !prevState)
    }
    return (
        <div>
            <div className="listingExpanded-role-basicInfoDropdownDiv" onClick={handleToggleExpandRole}>
                <label className="listingExpanded-role-basicInfoDropdownDiv-label">{role}</label>
                <div className="listingExpanded-role-basicInfoDropdownDiv-separatorAndImg">
                    <div className="listingExpanded-role-basicInfoDropdownDiv-separator"></div>
                    <img className="listingExpanded-role-basicInfoDropdownDiv-img"
                         src="/public/resources/expand_less_black_24dp.svg" alt=""/>
                </div>
            </div>
            {isExpandedRole && <div className="listingExpanded-role-component-basicInfoExpanded">
                <div className="listingExpanded-role-component-basicInfoExpanded-generalInstructions-div">
                    <label className="listingExpanded-role-generalInstructions-label">Gross Compensation Package
                        :</label>
                    <p className="listingExpanded-role-generalInstructions-paragraph">
                        Rs. {salary} lpa
                    </p>
                </div>
                <hr className="listingExpanded-role-separator"/>
                <div className="listingExpanded-role-component-basicInfoExpanded-generalInstructions-div">
                    <label className="listingExpanded-role-generalInstructions-label">Role Description :</label>
                    <p className="listingExpanded-role-generalInstructions-paragraph">
                        {
                            roleDescription.split(' - ').map((line, index) => {
                                return <p key={index}>{index !== 0 ? ` - ${line.trim()}` : line.trim()}</p>
                            })
                        }
                    </p>
                </div>
                <hr className="listingExpanded-role-separator"/>
                <div className="listingExpanded-role-component-basicInfoExpanded-generalInstructions-div">
                    <label className="listingExpanded-role-generalInstructions-label">Requirements :</label>
                    <p className="listingExpanded-role-generalInstructions-paragraph">
                        {
                            requirements.split(' - ').map((line, index) => {
                                return <p key={index}>{index !== 0 ? ` - ${line.trim()}` : line.trim()}</p>
                            })
                        }
                    </p>
                </div>
            </div>}
        </div>
    )
}

export default RoleDescriptionComponent