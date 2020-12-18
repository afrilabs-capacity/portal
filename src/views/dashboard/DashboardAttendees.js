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
import MyExcelExport from '../../exports/Excel'

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



const DashboardAttendees = () => {

const {id} =useParams()

const {fetching,fetchingFailMsg,setCurrentPage,fetchAttendeesByProgrammeIdApi,pagination,attendees}=useContext(AttendeeProvider.Context)

useEffect(()=>{
fetchAttendeesByProgrammeIdApi(id)
},[])


  return (
    <><CRow>
        <CCol>
          <CCard style={styles.cardStyle}>
            <CCardHeader style={styles.noBorder}>
            <CRow  className="mt-4">
            <CCol md="5">
              Attendees | Showing Page <b>{attendees.length ? pagination.from:""}</b>-<b>{attendees.length ? pagination.to:""}</b> of <b>{attendees.length ? pagination.total: ""  }</b> Results
              </CCol>

              <CCol>
             <SearchInput context={AttendeeProvider.Context}/>
              </CCol>
              </CRow>
             
            </CCardHeader>
            <CCardBody>


              <table className="table table-hover  mb-2 d-none d-sm-table " style={styles.noBorder}>
                <thead className=""  style={styles.noBorder}>
                  <tr style={styles.noBorder}> 
                    <th>Title</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Country</th>
                    <th className="text-left">Organization</th>
                    <th>View</th>
                    <th className="text-left"></th>
                  </tr>
                </thead>
                <tbody >
                    { attendees.length ? attendees.map((data)=>( 
                    <tr key={data.id}><td>
                    <h5>{data.name}</h5>
                      <div className="small text-muted">
                        
                      </div>
                    </td>
                    <td className="text-left">
                      <span>{data.email}</span>
                    </td>
                    <td className="text-left">
                      <span>{data.country}</span>
                    </td>
                    <td className="text-left">
                      <span>{data.organization}</span>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                        <a href={"/programmes/attendees/user/"+data.id}><span><FontAwesomeIcon icon={faEye} /></span></a>
                        </div>
                      </div> 
                    </td>
                    <td className="text-center">
                      {/* <CIcon height={25} name="cib-cc-mastercard" /> */}
                    </td>
                    </tr>


                   
                    )):null
                      
                  }
                 </tbody>
              </table>
              {!attendees.length && fetchingFailMsg!==null && <h3 className="mb-4">{fetchingFailMsg}</h3>}

              {!attendees.length && fetching && <h3 className="mb-4">Loading..</h3>}
              
              {attendees.length ? <Paginations context={AttendeeProvider.Context} /> : "" }
              
                 
              {attendees.length ? <MyExcelExport />:"" }
                

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DashboardAttendees
