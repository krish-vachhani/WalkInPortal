import './ListingExpanded.css';
import {useParams} from "react-router-dom";
import textDataFull from "../../data/listingData.json";
import {useFormik} from "formik";
import * as Yup from "yup";
import React from "react";
import RoleDescriptionComponent from "../../components/RoleDescriptionComponent/RoleDescriptionComponent.jsx";
import MainHeader from "../../components/MainHeaderComponent/MainHeader.jsx";

function ListingExpanded() {
    const {id} = useParams();
    const data = textDataFull.find((item) => {
        return parseInt(item.id) === parseInt(id)
    })
    const [textContent, setTextContent] = React.useState(data)
    const [isExpandedBasicInfo, setIsExpandedBasicInfo] = React.useState(false);

    const validationSchema = Yup.object({
        timeSlot: Yup.string().required("Time slot is required"),
        selectedRoles: Yup.array()
            .of(Yup.string().required("Select at least one role"))
            .min(1, "Select at least one role"),
    });


    const formik = useFormik({
        initialValues: {
            timeSlot: "",
            selectedRoles: [],
            resumeUploaded: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            console.log(values)
        },
    });

    const handleToggleExpandBasicInfo = () => {
        setIsExpandedBasicInfo((prevState) => !prevState)

    }
    return (
        <div>
            <MainHeader/>
            <div className="listingExpanded-component">
                <form onSubmit={formik.handleSubmit}>
                    <div className="title-div">
                        <h2 className="listingExpanded-job-title">{textContent.title}</h2>
                        <button className="apply-button" type="submit">Apply</button>
                    </div>
                    <div className="listingExpanded-div--datetime">
                        <label className="listingExpanded-date-time-label">Date & Time :</label>
                    </div>
                    <div className="listingExpanded-date-time">
                        <label className="listingExpanded-date-range">{textContent.dateRange}</label>
                        <div className="listingExpanded-verticalDivider"></div>
                        <img src="/public/resources/location_on_black_24dp.svg" alt=""
                             className="listingExpanded-location-icon"/>
                        <label className="listingExpanded-location-label">{textContent.locationLabel}</label>
                    </div>
                    <hr className="listingExpanded-separator"/>
                    <div className="listingExpanded-job-roles-container">
                        <label className="listingExpanded-job-roles-label">Job Roles :</label>
                        <div className="listingExpanded-job-roles-list">
                            {textContent.rolesData.map((role, index) => (
                                <div key={index} className="listingExpanded-job-role">
                                    <div className="listingExpanded-image-div">
                                        <img src={role.image} alt=""/>
                                    </div>
                                    <label className="listingExpanded-role-name">{role.name}</label>
                                    {(index !== (textContent.rolesData.length - 1)) &&
                                        <div className="listingExpanded-verticalDivider"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="listingExpanded-basicInfoDropdownDiv" onClick={handleToggleExpandBasicInfo}>
                        <label className="listingExpanded-basicInfoDropdownDiv-label">Pre-requisites & Application
                            Process</label>
                        <div className="listingExpanded-basicInfoDropdownDiv-separatorAndImg">
                            <div className="listingExpanded-basicInfoDropdownDiv-separator"></div>
                            <img className="listingExpanded-basicInfoDropdownDiv-img"
                                 src="/public/resources/expand_less_black_24dp.svg" alt=""/>
                        </div>
                    </div>
                    {isExpandedBasicInfo && <div className="listingExpanded-component-basicInfoExpanded">
                        <div className="listingExpanded-component-basicInfoExpanded-generalInstructions-div">
                            <label className="listingExpanded-generalInstructions-label">General Instructions :</label>
                            <p className="listingExpanded-generalInstructions-paragraph">
                                - We have a two–year indemnity for permanent candidates. We will provide training to the
                                selected candidates.
                                <br/>
                                - Candidates who have appeared for any test held by Zeus Learning in the past 12 months
                                will
                                not
                                be allowed to appear for this recruitment test.
                            </p>
                        </div>
                        <hr className="listingExpanded-separator"/>
                        <div className="listingExpanded-component-basicInfoExpanded-generalInstructions-div">
                            <label className="listingExpanded-generalInstructions-label">General Instructions :</label>
                            <p className="listingExpanded-generalInstructions-paragraph">
                                - Candidates are requested to log in half an hour prior to the exam start time as they
                                would
                                need to capture their image using a web camera. By taking this test, you are permitting
                                the
                                examination system to capture your video for invigilation purposes.
                                <br/>
                                - Candidates would not be able to appear for the exam if the web camera attached to
                                their
                                system
                                is not functional.
                                <br/>
                                - The web camera of your system must be enabled and must remain switched on throughout
                                the
                                examination. In the event of non-receipt of a webcam, your examination will be
                                considered
                                null
                                and void.
                                <br/>
                                - Candidate’s audio and video will be recorded during the examination and will also be
                                monitored
                                by a live proctor. The proctor may terminate your exam in case he/she observes any
                                malpractice
                                during the exam.
                                <br/>
                                - Candidates are advised to use their own Laptop/PC with a stable internet connection
                                (min 1
                                Mbps) during the exam.
                                <br/>
                                - Candidates cannot use an iOS system/device for this exam.
                            </p>
                        </div>
                        <hr className="listingExpanded-separator"/>
                        <div className="listingExpanded-component-basicInfoExpanded-generalInstructions-div">
                            <label className="listingExpanded-generalInstructions-label">Minimum System Requirements
                                :</label>
                            <p className="listingExpanded-generalInstructions-paragraph">
                                - Personal Laptop or Desktop computer in working condition with good quality camera (you
                                can
                                use
                                Windows 7 and above).
                                <br/>
                                - The latest version of Google Chrome Browser only.
                                <br/>
                                - Please note that Internet speed should be minimum 1 Mbps.
                                <br/>
                                - Do not use a MacBook or iPad for the proctored exam.
                            </p>
                        </div>
                        <hr className="listingExpanded-separator"/>
                        <div className="listingExpanded-component-basicInfoExpanded-generalInstructions-div">
                            <label className="listingExpanded-generalInstructions-label">Process :</label>
                            <p className="listingExpanded-generalInstructions-paragraph">
                                - Every round is an elimination round. Candidates need to clear all rounds to get
                                selected.
                                <br/>
                                <br/>
                                Round I : 4th August, 2018
                                <br/>
                                Aptitude Test : 25 Questions
                                <br/>
                                <br/>
                                Round II (Interview) : 4th August, 2018.
                            </p>
                        </div>
                    </div>
                    }

                    <div className="listingExpanded-timeslot-preferences">
                        <div className="listingExpanded-timeslot-preferences--labelContainer">
                            <label className="listingExpanded-timeslot-preferences-mainLabel">Time Slots &
                                Preferences</label>
                        </div>
                        <div className="listingExpanded-timeslot-choice-container">
                            <label className="listingExpanded-timeslot-choice-container-label">Select a Time Slot
                                :</label>
                            <div className="listingExpanded-radio-buttons">
                                {
                                    textDataFull[id - 1].timeSlots.map((timeslot) => {
                                        return (
                                            <div key={timeslot.id}>
                                                <input
                                                    type="radio"
                                                    id={timeslot.id}
                                                    name="timeSlot"
                                                    value={timeslot.value}
                                                    checked={formik.values.timeSlot === timeslot.value}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label htmlFor={timeslot.id}>{timeslot.value}</label>
                                            </div>
                                        )
                                    })
                                }
                                {formik.touched.timeSlot && formik.errors.timeSlot && (
                                    <div className="error-message">{formik.errors.timeSlot}</div>
                                )}


                            </div>
                        </div>
                        <hr className="listingExpanded-separator"/>

                        <div className="listingExpanded-roles-choice-container">
                            <label className="listingExpanded-roles-choice-container-label">Select Your Preference
                                :</label>
                            <div className="listingExpanded-checkboxes">
                                {
                                    textDataFull[id - 1].rolesData.map((roleData) => {
                                        return (
                                            <div key={roleData.name}>
                                                <input
                                                    type="checkbox"
                                                    id={roleData.name}
                                                    name={roleData.name}
                                                    checked={formik.values.selectedRoles.includes(roleData.name)}
                                                    onChange={() => {
                                                        formik.setFieldValue(
                                                            'selectedRoles',
                                                            formik.values.selectedRoles.includes(roleData.name)
                                                                ? formik.values.selectedRoles.filter((role) => role !== roleData.name)
                                                                : [...formik.values.selectedRoles, roleData.name]
                                                        );
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label htmlFor={roleData.name}>{roleData.name}</label>
                                            </div>
                                        )

                                    })
                                }
                                {formik.touched.selectedRoles && formik.errors.selectedRoles && (
                                    <div className="error-message">{formik.errors.selectedRoles}</div>
                                )}
                            </div>
                        </div>
                        <hr className="listingExpanded-separator"/>
                        <div className="upload-resume-div">
                            <img src="/public/resources/Upload_black_24dp.svg" alt=""
                                 className="upload-resume-div-img"/>
                            <label className="upload-resume-div-label">Upload Updated Resume</label>
                        </div>
                    </div>
                    <div className="RoleDescriptionComponent--div">
                        {textContent.rolesData.map((role, index) => {
                            return <RoleDescriptionComponent key={index} role={role.name}/>
                        })}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ListingExpanded;
