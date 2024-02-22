import './ListingExpanded.css';
import {useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import React from "react";
import RoleDescriptionComponent from "../../components/RoleDescriptionComponent/RoleDescriptionComponent.jsx";
import MainHeader from "../../components/MainHeaderComponent/MainHeader.jsx";
import {GET_SINGLE_LISTING} from "../../gqlOperations/queries.js";
import {useMutation, useQuery} from "@apollo/client";
import {APPLY_FOR_JOB, LOGIN_USER} from "../../gqlOperations/mutations.js";

function ListingExpanded() {
    const {id} = useParams();
    const [applyForTheListing] = useMutation(APPLY_FOR_JOB, {
        onCompleted: (result) => {
            alert("Successfully Applied");
        },
        onError: (error) => {
            alert("Application Failed");
            console.error("Application Failed", error);

            if (error.graphQLErrors) {
                console.error("GraphQL errors:", error.graphQLErrors);
                const validationErrors = error.graphQLErrors[0]?.extensions?.validation;
                console.error("Validation errors:", validationErrors);
            }
        },
    })
    const {loading, error, data} = useQuery(GET_SINGLE_LISTING, {
        variables: {jobPostingId: id}
    });

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
            alert(values.selectedRoles)
            applyForTheListing({
                variables: {
                    "input": {
                        "openingId": "1",
                        "userId": parseInt(localStorage.getItem("userId")),
                        "timeSlot": values.timeSlot,
                        "resume": "1",
                        "applicationRoleMapping": {
                            "id": "1",
                            "applicationId": parseInt(id),
                            "roles": values.selectedRoles.join(",").toString()
                        }
                    }
                },
            }).then(r => console.log("Mutation completed"));
        },
    });

    const handleToggleExpandBasicInfo = () => {
        setIsExpandedBasicInfo((prevState) => !prevState)

    }

    if (loading) return <h1>Loading..</h1>
    if (error) console.log(error.message)
    console.log(data)
    return (
        <div>
            <MainHeader/>
            <div className="listingExpanded-component">
                <form onSubmit={formik.handleSubmit}>
                    <div className="title-div">
                        <h2 className="listingExpanded-job-title">{data.jobPosting.title}</h2>
                        <button className="apply-button" type="submit">Apply</button>
                    </div>
                    <div className="listingExpanded-div--datetime">
                        <label className="listingExpanded-date-time-label">Date & Time :</label>
                    </div>
                    <div className="listingExpanded-date-time">
                        <label
                            className="listingExpanded-date-range">{data.jobPosting.startDate} to {data.jobPosting.expirationDate}</label>
                        <div className="listingExpanded-verticalDivider"></div>
                        <img src="/public/resources/location_on_black_24dp.svg" alt=""
                             className="listingExpanded-location-icon"/>
                        <label className="listingExpanded-location-label">{data.jobPosting.location}</label>
                    </div>
                    <hr className="listingExpanded-separator"/>
                    <div className="listingExpanded-job-roles-container">
                        <label className="listingExpanded-job-roles-label">Job Roles :</label>
                        <div className="listingExpanded-job-roles-list">
                            {data.jobPosting.subOpening.map((item, index) => {
                                return (
                                    <div key={index} className="job-role">
                                        {item.jobrole.map((role, index) => (
                                            <div key={role.idjobRole} className="listingExpanded-job-role">
                                                <div className="listingExpanded-image-div">
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

                                                <label className="listingExpanded-role-name">{role.role}</label>
                                                {(index !== (item.jobrole.length - 1)) &&
                                                    <div className="listingExpanded-verticalDivider"></div>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                )
                            })}
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
                            <label className="listingExpanded-generalInstructions-label">General Instructions
                                :</label>
                            <p className="listingExpanded-generalInstructions-paragraph">
                                - We have a two–year indemnity for permanent candidates. We will provide training to
                                the
                                selected candidates.
                                <br/>
                                - Candidates who have appeared for any test held by Zeus Learning in the past 12
                                months
                                will
                                not
                                be allowed to appear for this recruitment test.
                            </p>
                        </div>
                        <hr className="listingExpanded-separator"/>
                        <div className="listingExpanded-component-basicInfoExpanded-generalInstructions-div">
                            <label className="listingExpanded-generalInstructions-label">General Instructions
                                :</label>
                            <p className="listingExpanded-generalInstructions-paragraph">
                                - Candidates are requested to log in half an hour prior to the exam start time as
                                they
                                would
                                need to capture their image using a web camera. By taking this test, you are
                                permitting
                                the
                                examination system to capture your video for invigilation purposes.
                                <br/>
                                - Candidates would not be able to appear for the exam if the web camera attached to
                                their
                                system
                                is not functional.
                                <br/>
                                - The web camera of your system must be enabled and must remain switched on
                                throughout
                                the
                                examination. In the event of non-receipt of a webcam, your examination will be
                                considered
                                null
                                and void.
                                <br/>
                                - Candidate’s audio and video will be recorded during the examination and will also
                                be
                                monitored
                                by a live proctor. The proctor may terminate your exam in case he/she observes any
                                malpractice
                                during the exam.
                                <br/>
                                - Candidates are advised to use their own Laptop/PC with a stable internet
                                connection
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
                                - Personal Laptop or Desktop computer in working condition with good quality camera
                                (you
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
                                    data.jobPosting.subOpening[0].timeslot.map((timeslot) => {
                                        return (
                                            <div key={timeslot.idtimeslot}>
                                                <input
                                                    type="radio"
                                                    id={timeslot.idtimeslot}
                                                    name="timeSlot"
                                                    value={timeslot.slot}
                                                    checked={formik.values.timeSlot === timeslot.slot}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label htmlFor={timeslot.idtimeslot}>{timeslot.slot}</label>
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
                                    data.jobPosting.subOpening[0].jobrole.map((roleData) => {
                                        return (
                                            <div key={roleData.idjobRole}>
                                                <input
                                                    type="checkbox"
                                                    id={roleData.idjobRole}
                                                    name={roleData.role}
                                                    checked={formik.values.selectedRoles.includes(roleData.role)}
                                                    onChange={() => {
                                                        formik.setFieldValue(
                                                            'selectedRoles',
                                                            formik.values.selectedRoles.includes(roleData.role)
                                                                ? formik.values.selectedRoles.filter((role) => role !== roleData.role)
                                                                : [...formik.values.selectedRoles, roleData.role]
                                                        );
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <label htmlFor={roleData.idjobRole}>{roleData.role}</label>
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
                        {data.jobPosting.subOpening[0].jobrole.map((role) => {
                            return <RoleDescriptionComponent key={role.idjobRole} roleDetails={role}/>
                        })}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ListingExpanded;
