import React, { useContext,useEffect } from 'react'
import {
 
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import ProgrammeProvider from "../../context/ProgrammeContext"
import Paginations from "../../pagination/pagination"
import SearchInput from "../../inputs/search-input"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from "@fortawesome/free-solid-svg-icons";

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



const DashboardProgrammes = () => {

const {fetching,fetchingFailMsg,fetchProgrammesApi,pagination,programmes}=useContext(ProgrammeProvider.Context)

useEffect(()=>{
fetchProgrammesApi()
// setCurrentPage(1)
//alert("mount")

},[])


  return (
    <><CRow>
        <CCol>
          <CCard style={styles.cardStyle}>
            <CCardHeader style={styles.noBorder}>
            <CRow  className="mt-4">
          
              <CCol md="5">
              All Programmes | Showing Page <b>{programmes.length ? pagination.from:""}</b>-<b>{programmes.length ? pagination.to:""}</b> of <b>{programmes.length ? pagination.total: ""  }</b> Results
              </CCol>

              <CCol>
             <SearchInput context={ProgrammeProvider.Context} />
              </CCol>
              </CRow>
             
            </CCardHeader>
            <CCardBody>


              <table className="table table-hover  mb-2 d-none d-sm-table" style={styles.noBorder}>
                <thead className=""  style={styles.noBorder}>
                  <tr style={styles.noBorder}> 
                    <th>Title</th>
                    <th className="text-center">Attendees</th>
                    <th>View</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                    { programmes.length ? programmes.map((post)=>( 
                    <tr key={post.id}><td>
                    <h5>{post.name}</h5>
                      <div className="small text-muted">
                        
                      </div>
                    </td>
                    <td className="text-center">
                      <a href={"/attendees/"+post.id}><span>{post.users.length}</span></a>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                        <a href={"/programmes/attendees/"+post.id}><span><FontAwesomeIcon icon={faEye} /></span></a>
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

              {!programmes.length && fetchingFailMsg!==null && <h3 className="mb-4">{fetchingFailMsg}</h3>}

              {!programmes.length && fetching && <h3 className="mb-4">Loading..</h3>}

              {programmes.length ? <Paginations context={ProgrammeProvider.Context} /> : "" }

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DashboardProgrammes
