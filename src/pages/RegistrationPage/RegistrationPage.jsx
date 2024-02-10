import './RegistrationPage.css'
import MainHeader from "../../components/MainHeaderComponent/MainHeader.jsx";
import StageComponent from "../../components/StageComponent/StageComponent.jsx";

function RegistrationPage() {
    return (
        <div className="main-registration-div">
            <MainHeader/>
            <div className="registration-back-cancel-create-container">
                <img src="/public/resources/arrow_upward_black_24dp.svg" alt="" className="registration-back-icon"/>

                <div className="registration-title">Create an account</div>

                <div className="registration-actions">
                    <button className='registration-cancel-button'>CANCEL</button>
                    <button className='registration-create-button'>CREATE</button>
                </div>
            </div>
                <StageComponent/>
                {/*<PersonalInfoComponent/>*/}
        </div>
    )
}

export default RegistrationPage