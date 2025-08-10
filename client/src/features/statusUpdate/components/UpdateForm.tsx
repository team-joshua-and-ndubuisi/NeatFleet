//if service date == current date then they can access form : "Service is not scheduled until"
//tech ID must also match ID of tech in booking (routing)
//adding loading component
import { useParams, Navigate } from 'react-router-dom';
import React, {useState} from 'react'
import BookingDetails from './BookingDetails'
import { ServiceStatusCode, serviceStatusLabels } from "../types/ServiceStatus";
import { Button } from '@/components/ui/button';
import { usefetchCurrentStatus, useUpdateStatus } from '@/features/statusUpdate';
// import LoadingComponent from "@/components/LoadingIndicator"
// import ErrorComponent from "@/components/ErrorComponent"


const UpdateForm: React.FC = () => {
    const { bookingId } = useParams()
    const updateStatusMutation = useUpdateStatus()
    const [errors, setErrors] = useState('')
    const [status, setStatus] = useState(null)
    //getting current service status
    if(!bookingId){
       return <Navigate to='/profile' />
    }
    
    const {data}= usefetchCurrentStatus(bookingId)
   
    console.log(data)
    

    //setting value of next status
    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log('bookingid', bookingId)
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
        if(!data){
           return setErrors('Error updating status. Please reload page.')
        }
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
         
        console.log("what was pressed", nextStatusValue, 'ServiceStatusCode[2]', ServiceStatusCode[2])
        }
       


}


    return(
        <div className="mx-auto">
            <h1>Update Service Status</h1>
            {/* iterate through values of service status to create buttons */}
            
                <div className="flex flex-col gap-4 w-1/2 justify-center">
                    {status!=null ? <p> {status} is selected. Please click update to confirm your selection</p> :<p>Please select a status</p>}
                    {Object.entries(serviceStatusLabels).map(([key,statusOptions], index)=>{
                        return(
                            //adding conditonal if button is == or more that key
                            <Button 
                                onClick = {()=>handleStatusUpdate(key)}
                                className={(ServiceStatusCode[data]>index)? 'opacity-50 cursor-not-allowed bg-[#2DD4BF]':
                                          (ServiceStatusCode[data] ===index)? 'border-white bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] ':
                                          ' hover:shadow-xl hover:ring-4 hover:ring-[#2DD4BF] hover:ring-opacity-20'}
                                value={key}
                                key={index}>
                                {statusOptions}
                            </Button>
                        )
                })}
                </div>
                <Button className={`my-10
                ${status !== null 
                    ? 'bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-white shadow-2xl ring-4 ring-[#2DD4BF] ring-opacity-40 hover:ring-opacity-60 transform hover:scale-102' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `} onClick={handleSubmit}>
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