import { create } from "zustand";
import { ServiceStatusCode } from "../types/ServiceStatus"

const statusStore=(set) => ({
    //should include method that increases the service status
    status: ServiceStatusCode.scheduled,
 
    //if ServiceStatusCode[value] > ServiceStatusCode[value]
    setStatus: (updatedStatus)=>set((state)=>({status: ServiceStatusCode.nextStatus(state)}))
     
})
const useStatusStore=create(statusStore)
export default useStatusStore