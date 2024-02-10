import './StageComponent.css'

function StageComponent() {
    return (
        <div className="mainStageComponent">
            <div className="mainStageComponent-subdiv">
                <div className="stages-container">
                    <div className="stage-div">
                        <label className="stage-div-number">1</label>
                    </div>
                    <label className="stage-div-label">Personal Information</label>
                </div>
                <div className="stages-container">
                    <div className="stage-div">
                        <label className="stage-div-number">2</label>
                    </div>
                    <label className="stage-div-label">Qualifications</label>
                </div>
                <div className="stages-container">
                    <div className="stage-div">
                        <label className="stage-div-number">3</label>
                    </div>
                    <label className="stage-div-label">Review and Proceed</label>
                </div>
            </div>
        </div>
    )
}

export default StageComponent
