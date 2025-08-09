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
import React, {useState} from 'react'
import BookingDetails from './BookingDetails'
import { ServiceStatusCode, serviceStatusLabels } from "../types/ServiceStatus";
import { Button } from '@/components/ui/button';
import { usefetchCurrentStatus, useUpdateStatus } from '@/features/statusUpdate';
import LoadingComponent from "@/components/LoadingIndicator"
import ErrorComponent from "@/components/ErrorComponent"


const UpdateForm: React.FC = () => {
    const { bookingId } = useParams()
    const updateStatusMutation = useUpdateStatus()
    const [errors, setErrors] = useState('')
    const [status, setStatus] = useState(null)
    let nextStatus:number|string;


    //calling api

    // const {data}= usefetchCurrentStatus(bookingId)
    const data = 'on_the_way'

    //setting value of next status
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(status != null){
            updateStatusMutation.mutate({
                 bookingId: bookingId, 
                 newStatus: status
            });
        }else{
            setErrors('Please select an update status')
        }
    }
    
    const handleStatusUpdate =(updatedStatus:string|number)=>{
        //ServiceStatus in db
        const currentStatusValue = ServiceStatusCode[data] 
        //converint enum to number for comparison
        const nextStatusValue = Number(updatedStatus)

        setErrors('')
        if(nextStatusValue ==currentStatusValue){
            setErrors(`Already up-to-date`)
            // setStatus(null)
            return
        }
        if(currentStatusValue +1 < nextStatusValue ){
            setErrors(`Please Select next status before moving forward`)
            // setStatus(null)
            return
        }
        if(currentStatusValue > nextStatusValue){
            setErrors(`Client has already been already been updated. Please select next status update`)
            // setStatus(null)
            return
        }else if(nextStatusValue  == currentStatusValue + 1 ){
        //Valid Selection
        setErrors('')
         setStatus(ServiceStatusCode[nextStatusValue])
        console.log("what was pressed", nextStatusValue ,'valid option',nextStatus, 'ServiceStatusCode[2]', ServiceStatusCode[2])
        }
       


}


    return(
        <div className="mx-auto">
            <h1>Update Service Status</h1>
            {/* iterate through values of service status to create buttons */}
            
                <div className="flex flex-col gap-4 w-1/2 justify-center">
                    {status!=null && <p>Current status is {status}</p>}
                    {Object.entries(serviceStatusLabels).map(([key,statusOptions], index)=>{
                        return(
                            //adding conditonal if button is == or more that key
                            <Button 
                                onClick = {()=>handleStatusUpdate(key)}
                                className={(ServiceStatusCode[data]>index)? 'opacity-50':
                                          (ServiceStatusCode[data] ===index)? 'border-white':
                                          'bg-[#2DD4BF]'}
                                value={key}
                                key={index}>
                                {statusOptions}
                            </Button>
                        )
                })}
                </div>
                <Button className="my-10" onClick={handleSubmit}>
                Update Status
            </Button>
            {errors && <p style={{ color: 'red' }}> {errors}</p>}
        <div>

        </div>
        <BookingDetails/>
        </div>
    )
}

export default UpdateForm