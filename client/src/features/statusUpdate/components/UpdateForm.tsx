//Form that the tech will be using to update status

//tech should only have access to the form on the day of service

//psuedo
//if service date == current date then they can access form : "Service is not scheduled until"
//tech ID must also match ID of tech in booking 

//Series of conditionals for post(aka status updates) based on the number the status is on
    //if ServiceStatus[current] == ServiceStatus + 1 then make that button visiable and clicklable 
//Button/Click event to update status after selecting it
    //when submitted it will increment service status by 1 
    //trigger api to update backend
import { useParams } from 'react-router-dom';
import React from 'react'
import BookingDetails from './BookingDetails'
import useStatusStore from '../stores/statusStore'
import { ServiceStatusCode, serviceStatusLabels } from "../types/ServiceStatus";
import { Button } from '/Users/yassahreed/collabs/NeatFleet/client/src/components/ui/button';
import { usefetchCurrentStatus } from '/Users/yassahreed/collabs/NeatFleet/client/src/features/statusUpdate/hooks/useFetchStatus';
import LoadingComponent from "/Users/yassahreed/collabs/NeatFleet/client/src/components/LoadingIndicator"
import ErrorComponent from "/Users/yassahreed/collabs/NeatFleet/client/src/components/ErrorComponent"


const UpdateForm: React.FC = () => {
    //getting booking id
const bookingId= useParams()
    //managing change in state for client
const {status, setStatus} = useStatusStore();
    //updating state change for server
const {
    data: bookingStatus,
}=usefetchCurrentStatus(bookingId?.id)

//changing state to new status
    function handleStatus<serviceStatusLabels>(status:serviceStatusLabels){
        setStatus(serviceStatusLabels)
    }
//post req to update status 
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/bookingid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(status),
        });
  
        const result = await response.json();
        console.log('Response:', result);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }; 

    return(
        <div>
            <h1>Update Service Status</h1>
            {/* iterate through values of service status to create buttons */}
            <div>

            </div>
            <Button>Update Status</Button>
        <div>

        </div>
        <BookingDetails/>
        </div>
    )
}

export default UpdateForm