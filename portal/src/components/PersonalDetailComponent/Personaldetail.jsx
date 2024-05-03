import style from "/src/components/PersonalDetailComponent/personaldetail.module.css";
// import Register from "./Register";

export default function Personaldetail({formData, setformData}) {
    function handleData(e) {
        const {name, value, type, checked, files} = e.target;
        const {jobRoleRes} = formData;
        if (name === "jobUpdate")
            setformData({...formData, [name]: checked ? value : "no"});
        else if (type === "file")
            setformData({...formData, [name]: files[0].name});
        else {
            setformData({
                ...formData,
                [name]:
                    type === "checkbox" && name === "jobRoleRes"
                        ? checked
                            ? [...jobRoleRes, value]
                            : jobRoleRes.filter((event) => event !== value)
                        : value,
            });
        }
    }

    return (
        <>
            <div className={style.component}>
                <form action="" className={style.form}>
                    <div className={style.basicDetails}>
                        <div className={style.nameDetails}>
                            <div className={style.inp}>
                                <p>First Name*</p>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleData}
                                />
                            </div>
                            <div className={style.inp}>
                                <p>Last Name*</p>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleData}
                                />
                            </div>
                            <div className={style.inp}>
                                <p>Email*</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleData}
                                />
                            </div>
                            <div className={style.PhoneNumber}>
                                <p>Phone Number*</p>
                                <div className={style.number}>
                                    <p>+</p>
                                    <input
                                        type="text"
                                        name="phoneCode"
                                        value={formData.phoneCode}
                                        onChange={handleData}
                                    />
                                    &nbsp;&nbsp;
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleData}
                                    />
                                </div>
                            </div>
                            <div className={style.inp}>
                                <p>Enter Portfolio URL (if any)</p>
                                <input
                                    type="text"
                                    name="portfoliourl"
                                    value={formData.portfoliourl}
                                    onChange={handleData}
                                />
                            </div>
                            <div className={style.pref}>
                                <p>Select Your Preference :</p>
                                <div className={style.checkInp}>
                                    <input
                                        type="checkbox"
                                        name="jobRoleRes"
                                        value="Instructional Designer"
                                        checked={
                                            formData.jobRoleRes.filter(
                                                (e) => e === "Instructional Designer"
                                            ).length === 1
                                        }
                                        onChange={handleData}
                                    />
                                    &nbsp;Instructional Designer
                                </div>
                                <div className={style.checkInp}>
                                    <input
                                        type="checkbox"
                                        name="jobRoleRes"
                                        value="Software Engineer"
                                        checked={
                                            formData.jobRoleRes.filter(
                                                (e) => e === "Software Engineer"
                                            ).length === 1
                                        }
                                        onChange={handleData}
                                    />
                                    &nbsp;Software Engineer
                                </div>
                                <div className={style.checkInp}>
                                    <input
                                        type="checkbox"
                                        name="jobRoleRes"
                                        value="Software Quality Engineer"
                                        checked={
                                            formData.jobRoleRes.filter(
                                                (e) => e === "Software Quality Engineer"
                                            ).length === 1
                                        }
                                        onChange={handleData}
                                    />
                                    &nbsp;Software Quality Engineer
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
