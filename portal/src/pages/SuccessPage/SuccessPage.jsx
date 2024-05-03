import React from "react";
import './SuccessPage.css';
import MainHeader from "../../components/MainHeaderComponent/MainHeader.jsx";
import {GET_SINGLE_LISTING} from "../../gqlOperations/queries.js";
import {useQuery} from "@apollo/client";
import { useParams} from "react-router-dom";
function SuccessPage() {
    const {id} = useParams();
    const {loading, error, data} = useQuery(GET_SINGLE_LISTING, {
        variables: {jobPostingId: id}
    });
    return (
        <div>
            <MainHeader/>
            <div className="success-mainDiv">
                <div className="success-tick-circle-div">
                    <img src="/public/resources/check_black_24dp.svg" className="success-tick-img" alt=""/>
                </div>
                <div className="success-title-container">
                    <label className="success-title-label">Congratulations ! You have successfully applied for the
                        walk-in
                        opportunity</label>
                </div>
                <hr className="success-separator"/>
                <div className="success-dateTimeDiv">
                    <label className="success-dateTime-title">Date & Time of Walk-In :</label>
                    <label className="success-dateAndTime-label">{data.jobPosting.startDate}</label>
                    <label className="success-dateAndTime-label">9:00 AM to 11:00 AM</label>
                </div>
                <hr className="success-separator"/>
                <div className="success-venue">
                    <label className="success-dateTime-title">Venue of Walk-In :</label>
                    <label className="success-dateAndTime-label">Zeus Systems Pvt. Ltd.</label>
                    <label className="success-dateAndTime-label">1402, 14th Floor, Tower B, Peninsula Business Park.
                        Ganpatrao Kadam Marg</label>
                    <label className="success-dateAndTime-label">Lower Parel (W) </label>
                    <label className="success-dateAndTime-label">Mumbai - 400 013</label>
                    <label className="success-dateAndTime-label">Phone: +91-22-66600000</label>
                </div>
                <hr className="success-separator"/>
                <div className="success-venue">
                    <label className="success-dateTime-title">THINGS TO REMEMBER :</label>
                    <label className="success-dateAndTime-label">- Please report 30 MINUTES prior to your reporting
                        time. </label>
                    <label className="success-dateAndTime-label">- Download your Hall Ticket from below and carry it
                        with
                        you during your Walk-In.</label>
                </div>
                {/* <hr className="success-separator"/> */}
                {/* <div className="success-downloadHallTicket-div">
                    <button className="success-downloadHallTicket-button">DOWNLOAD HALL TICKET</button>
                </div> */}
            </div>
        </div>
    )
}

export default SuccessPage