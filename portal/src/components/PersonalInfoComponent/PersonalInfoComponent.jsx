import './PersonalInfoComponent.css'
import React from "react";
import totalRoles from "../../data/totalRoles.json";
import {useFormik} from "formik";
import * as Yup from "yup";

function PersonalInfoComponent() {

    const validationSchema = Yup.object({
        selectedRoles: Yup.array()
            .min(1, 'Select at least one role.')
            .required('Select at least one role.'),
        jobUpdates: Yup.boolean()
            .oneOf([true], 'You must accept job-related updates.')
            .required('You must accept job-related updates.'),
    });

    const initialValues = {
        selectedRoles: [],
        jobUpdates: false,
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission logic here
            console.log(values);
        },
    });

    return (<div className="PersonalInfoComponent-mainComponent">
            <form className="PersonalInfoComponent-form">
                <div className="PersonalInfoComponent-firstNameAndInput-div">
                    <div>
                        <div className="PersonalInfoComponent-firstName">First Name*</div>
                        <input type="text" className="PersonalInfoComponent-bigInput" name="firstName"
                               placeholder="John"
                               required/>
                    </div>
                    <div className="PersonalInfoComponent-uploadProfile-div">
                        <img className="PersonalInfoComponent-profilePic-img"
                             src="/public/resources/profile-user.svg"
                             alt=""/>
                        <div className="PersonalInfoComponent-uploadProfile-text">UPLOAD DISPLAY PICTURE</div>
                        <div className="PersonalInfoComponent-uploadProfile-maxSizeText">Max. image size: 5 MB</div>
                    </div>
                </div>
                <div className="PersonalInfoComponent-lastNameAndInput-div">
                    <div className="PersonalInfoComponent-lastName">Last Name*</div>
                    <input type="text" className="PersonalInfoComponent-bigInput" name="lastName"
                           placeholder="Watson"
                           required/>
                </div>
                <div className="PersonalInfoComponent-lastNameAndInput-div">
                    <div className="PersonalInfoComponent-lastName">Email*</div>
                    <input type="email" className="PersonalInfoComponent-bigInput" name="email"
                           placeholder="Johnwatson@example.com"
                           required/>
                </div>
                <div className="PersonalInfoComponent-lastNameAndInput-div">
                    <div className="PersonalInfoComponent-lastName">Phone Number*</div>
                    <div className="PersonalInfoComponent-number-div">
                        <label className="PersonalInfoComponent-number-plus">+</label>
                        <input type="text" className="countryCodeInput" name="countryCode"
                               placeholder="91"
                               required/>
                        <input type="text" className="phoneNumberInput" name="phoneNumber"
                               placeholder="9876543210"
                               required/>
                    </div>
                    <div className="PersonalInfoComponent-upload-resume-div">
                        <img src="/public/resources/Upload_black_24dp.svg" alt=""
                             className="PersonalInfoComponent-upload-resume-div-img"/>
                        <label className="PersonalInfoComponent-upload-resume-div-label">UPLOAD RESUME</label>
                    </div>
                    <div className="PersonalInfoComponent-portfolio-div">
                        <div className="PersonalInfoComponent-lastName">Enter Portfolio URL (if any)</div>
                        <input type="email" className="PersonalInfoComponent-bigInput" name="email"
                               placeholder="www.myportfolio.in"
                               required/>
                    </div>
                    <div className="PersonalInfoComponent-roles-choice-container">
                        <label className="PersonalInfoComponent-roles-choice-container-label">Preferred Job
                            Roles*</label>
                        <div className="PersonalInfoComponent-checkboxes">
                            {totalRoles.roles.map((roleName) => (<div key={roleName}>
                                <input
                                    type="checkbox"
                                    id={roleName}
                                    name={roleName}
                                    checked={formik.values.selectedRoles.includes(roleName)}
                                    onChange={() => {
                                        formik.setFieldValue('selectedRoles', formik.values.selectedRoles.includes(roleName) ? formik.values.selectedRoles.filter((role) => role !== roleName) : [...formik.values.selectedRoles, roleName]);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                <label htmlFor={roleName}>{roleName}</label>
                            </div>))}
                            {formik.touched.selectedRoles && formik.errors.selectedRoles && (
                                <div className="error-message">{formik.errors.selectedRoles}</div>)}

                        </div>
                    </div>
                    <div className="PersonalInfoComponent-portfolio-div">
                        <div className="PersonalInfoComponent-lastName">If You Are Registering Via A Referral, Please
                            Mention Full Name Of The Employee Who Referred You
                        </div>
                        <input type="email" className="PersonalInfoComponent-bigInput" name="email"
                               placeholder=""
                               required/>
                    </div>
                    <div className="PersonalInfoComponent-updateCheckbox">
                        <input
                            type="checkbox"
                            id="jobUpdatesCheckbox"
                            name="jobUpdatesCheckbox"
                            checked={formik.values.jobUpdates}
                            onChange={() => {
                                formik.setFieldValue('jobUpdates', !formik.values.jobUpdates);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="jobUpdatesCheckbox">Send me job-related updates via mail</label>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default PersonalInfoComponent