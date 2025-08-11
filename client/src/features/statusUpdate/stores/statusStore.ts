// import { create } from "zustand";
// import { ServiceStatusCode } from "../types/ServiceStatus"
// //api fetch on inital value
// import {fetchCurrentStatus} from "@/features/statusUpdate/"

// fetchCurrentStatus
// const statusStore=(set, get) => ({
//     //should include method that increases the service status
//     status: null,
//     isLoading: true,
//     error: false,
//     initalizeStatus: async(bookingId:string)=>{
//         try{
//             set({isLoading: true, error: false})
//             const currentStatus= await fetchCurrentStatus(bookingId);
//             set({status: ServiceStatusCode[currentStatus], isLoading: false})
//         }catch(err){
//             set({isLoading:false, error: true})
//         }
//     },
//     setStatus: (status)=>set((state)=>({status: ServiceStatusCode.nextStatus(state)}))

// })
// const useStatusStore=create(statusStore)
// export default useStatusStore
