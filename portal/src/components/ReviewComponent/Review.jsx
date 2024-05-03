import style from "/src/pages/RegisterPage/register.module.css";

export default function App({ formData, setformData }) {
    return (
        <>
            <div className={style.section}>
                <div className={style.personalInfoTitle}>
                    <div>Personal Information</div>
                    <div className={style.editDiv}>
                        <img
                            src="https://cdn.iconscout.com/icon/free/png-256/free-edit-mode-pencil-tool-change-30495.png"
                            alt=""
                        />
                        <div className={style.editTitle}>Edit</div>
                    </div>
                </div>

                <div className={style.personalInfo}>
                    <div className={style.nameDetails}>
                        <div className={style.inp}>
                            <p>First Name*</p>
                            <div className={style.personalDetail}>{formData.firstName}</div>
                        </div>
                        <div className={style.inp}>
                            <p>Last Name*</p>
                            <div className={style.personalDetail}>{formData.lastName}</div>
                        </div>
                        <div className={style.inp}>
                            <p>Email*</p>
                            <div className={style.personalDetail}>{formData.email}</div>
                        </div>
                        <div className={style.PhoneNumber}>
                            <p>Phone Number</p>
                            <div className={style.number}>
                                <p>+</p>
                                <div className={style.personalDetail}>
                                    {formData.phoneCode} {formData.phoneNumber}
                                </div>
                            </div>
                        </div>
                        <div className={style.inp}>
                            <p>Enter Portfolio URL (if any)</p>
                            <div className={style.personalDetail}>
                                {formData.portfoliourl ? formData.portfoliourl : "-"}
                            </div>
                        </div>
                        <div className={style.pref}>
                            <p>Preferred Job Roles</p>
                            {formData.jobRoleRes.map((item, index) => (
                                <div className={style.preferredJobRoleDetail}>{item}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={style.qualificationsInfoTitle}>
                    <div>Qualification</div>
                    <div className={style.editDiv}>
                        <img
                            src="https://cdn.iconscout.com/icon/free/png-256/free-edit-mode-pencil-tool-change-30495.png"
                            alt=""
                        />
                        <div className={style.editTitle}>Edit</div>
                    </div>
                </div>

                <div className={style.qualificationsInfo}>
                    <div className={style.eduTitle}>Educational Qualifications</div>
                    <div className={style.eduQualification}>
                        <div className={style.inp}>
                            <p>Aggregate Percentage</p>
                            <div className={style.eduQualificationDetail}>
                                {formData.percentage}
                            </div>
                        </div>
                        <div className={style.inp}>
                            <p>Year of Passing</p>
                            <div className={style.eduQualificationDetail}>
                                {formData.yearOfPassing}
                            </div>
                        </div>
                        <div className={style.eduDetail}>
                            <div className={style.gridDiv}>
                                <p>Qualification</p>
                                <div className={style.eduInfo}>{formData.qualification}</div>
                            </div>
                            <div className={style.gridDiv}>
                                <p>Stream</p>
                                <div className={style.eduInfo}>{formData.stream}</div>
                            </div>
                            <div className={style.gridDiv}>
                                <p>College</p>
                                <div className={style.eduInfo}>{formData.college}</div>
                            </div>
                        </div>

                        <div className={style.inpLast}>
                            <p>Where is your college located?</p>
                            <div className={style.eduQualificationDetail}>
                                {formData.location}
                            </div>
                        </div>
                    </div>

                    <div className={style.profTitle}>Professional Qualifications</div>
                    <div className={style.profQualification}>
                        <div className={style.inpLast}>
                            <p>Applicant Type</p>
                            <div className={style.profQualificationDetail}>
                                {formData.applicant}
                            </div>
                        </div>
                    </div>

                    <div className={style.profQualificationExp}>
                        {formData.applicant === "experienced" ? (
                            <>
                                <div className={style.inp}>
                                    <p>Years of Experience</p>
                                    <div className={style.profQualificationDetail}>
                                        {formData.yearOfExp}
                                    </div>
                                </div>
                                <div className={style.inp}>
                                    <p>Current CTC (In Rupees)</p>
                                    <div className={style.profQualificationDetail}>
                                        {formData.currentCTC}
                                    </div>
                                </div>
                                <div className={style.inp}>
                                    <p>Expected CTC (In Rupees)</p>
                                    <div className={style.profQualificationDetail}>
                                        {formData.expCTC}
                                    </div>
                                </div>
                                <div className={style.expertiseTechnology}>
                                    <p className={style.technologyTitle}>
                                        Select All The Technologies You Expertise In
                                    </p>
                                    {formData.expertTechnology.map((item, index) => (
                                        <>
                                            <div className={style.technology}>{item}</div>
                                            {item === "Others" ? (
                                                <>
                                                    <p className={style.other}>
                                                        If others, please mention
                                                    </p>
                                                    <div className={style.technology}>
                                                        {formData.expertOther ? formData.expertOther : "-"}
                                                    </div>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    ))}
                                </div>
                            </>
                        ) : (
                            ""
                        )}

                        <div className={style.familiarTechnology}>
                            <p className={style.technologyTitle}>
                                Select All The Technologies You are familiar In
                            </p>
                            {formData.familiarTechnology.map((item, index) => (
                                <>
                                    <div className={style.technology}>{item}</div>
                                    {item === "Others" ? (
                                        <>
                                            <p className={style.other}>If others, please mention</p>
                                            <div className={style.technology}>
                                                {formData.expertOther ? formData.expertOther : "-"}
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </>
                            ))}
                        </div>

                        {formData.applicant === "experienced" ? (
                            <>
                                <div className={style.noticePeriodDiv}>
                                    <div className={style.isNoticePeriod}>
                                        <p>Are you currently on notice period?</p>
                                        <div className={style.profQualificationDetail}>
                                            {formData.curNoticePeriod}
                                        </div>
                                    </div>
                                    <div className={style.noticePeriod}>
                                        <div className={style.noticePeriodInfo}>
                                            <p>If Yes, when will your notice period end?</p>
                                            <div className={style.profQualificationDetail}>
                                                {formData.endNoticePeriod}
                                            </div>
                                        </div>
                                        <div className={style.noticePeriodInfo}>
                                            <p>How long is your notice period? (Mention in months)</p>
                                            <div className={style.profQualificationDetail}>
                                                {formData.lengthOfNoticePeriod}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
