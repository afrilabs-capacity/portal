import React, { lazy,useContext,useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ProgrammeProvider from "../../context/ProgrammeContext"
import AttendeeProvider from "../../context/AttendeeContext"
import Paginations from "../../pagination/pagination"
import SearchInput from "../../inputs/search-input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import MainChartExample from '../charts/MainChartExample.js'

import {useParams,useLocation} from 'react-router-dom'

const styles={
    noBorder:{
        border:"none"
    },
    noBorderTop:{
        borderBTop:"none"
    },
    cardStyle:{
        boxShadow: " 0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
        border:"none"
    }
}



const DashboardAttendeesUser = () => {

const {id} =useParams()

const {fetchAttendeeByIdApi,attendee}=useContext(AttendeeProvider.Context)

useEffect(()=>{
fetchAttendeeByIdApi(id)
},[])


  return (
    <><CRow>
        <CCol>
          <CCard style={styles.cardStyle}>
            <CCardHeader style={styles.noBorder}>
            <CRow  className="mt-4">
            <CCol >
               <h2 className="text-center">{attendee!==undefined? attendee.name:""}</h2>
              </CCol>

              
              </CRow>
             
            </CCardHeader>
            <CCardBody>

            <p><b>Name:</b> {attendee!==undefined?attendee.name:""}</p>
            <p><b>Email:</b> {attendee!==undefined?attendee.email:""}</p>
            <p><b>Gender:</b> {attendee!==undefined?attendee.gender:""}</p>
            <p><b>Country:</b> {attendee!==undefined?attendee.country:""}</p>
            <p><b>Job Title:</b> {attendee!==undefined?attendee.job_title:""}</p>
            <p><b>Are you a member of the AfriLabs community?:</b> {attendee!==undefined?attendee.member_yes_no:""}</p>
            <p><b>Organization:</b> {attendee!==undefined?attendee.organization:""}</p>
            <p><b>Region:</b> {attendee!==undefined?attendee.region:""}</p>
            <p><b>How long have you existed as a hub/organisation?:</b> {attendee!==undefined?attendee.time_in_organization:""}</p>
            <p><b>What stakeholder group do you belong to?:</b> {attendee!==undefined?attendee.stake_holder_group:""}</p>
             <p><b>Registered:</b> {attendee!==undefined?attendee.created_at:""}</p>

             {attendee.id && attendee.ref_by!==null? <h3>Referred By</h3>:""}
             {attendee.id && attendee.ref_by!==null ? <p>{attendee.ref_by}</p>:""}

             <br />
          
           {attendee.id && attendee.refs!==null?
              <h3>Members Referred</h3> : 
              "" }


          
            {attendee.id && attendee.refs!==null? 
               attendee['refs'].map((ref,i)=><p key={i}>{ref.name} <b>({ref.organization})</b></p>)
             
            :""}
             

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DashboardAttendeesUser
