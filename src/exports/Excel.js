import React,{useContext} from 'react';
//@ts-ignore 
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import AttendeeProvider from '../context/AttendeeContext'





const MyExcelExport=()=>{

    const {excelAttendees}=useContext(AttendeeProvider.Context)


    return (
        <div>
            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="btn btn-primary"
                table="table-to-xls"
                filename="hlw_attendees"
                sheet="tablexls"
                buttonText="Export List (Excel XLS)"/>
            <table id="table-to-xls" style={{display:"none"}}>
                <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Job Title</th>
                <th>Are you a member of the AfriLabs community?</th>
                <th>Organization</th>
                <th>Region</th>
                <th>How long have you existed as a hub/organisation?</th>
                <th>What stakeholder group do you belong to?</th>
                <th>Registered</th>
                </tr>
                </thead>
                <tbody>
                {excelAttendees.length? excelAttendees.map(attendee=>(
                <tr key={attendee.id}>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>{attendee.gender}</td>
                <td>{attendee.country}</td>
                <td>{attendee.job_title}</td>
                <td>{attendee.member_yes_no}</td>
                <td>{attendee.organization}</td>
                <td>{attendee.region}</td>
                <td>{attendee.time_in_organization}</td>
                <td>{attendee.stake_holder_group}</td>
                <td>{attendee.created_at}</td>
                </tr> )):""}
                </tbody>
            </table>

        </div>
    );



}


export default MyExcelExport
