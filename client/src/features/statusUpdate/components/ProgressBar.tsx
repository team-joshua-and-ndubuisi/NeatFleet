//UI for the User to see the progress of the service
import { usefetchPollStatus } from '@/features/statusUpdate';
import { useParams } from 'react-router-dom';
import { ServiceStatusCode, serviceStatusLabels } from "../types/ServiceStatus";


import React from 'react'
const ProgressBar: React.FC = () => {
    const {bookingId} = useParams()
    const{data}=usefetchPollStatus(bookingId)
    const currentStatus = ServiceStatusCode[data]

  
      const statuses = Object.entries(serviceStatusLabels).map(([key, label]) => ({
        id: Number(key),
        label: label
      }));
    
      return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Service Status</h2>
          
          {/* Progress Bar Container */}
          <div className="relative mb-8">
            {/* Background Track */}
            <div className="h-2 bg-gray-200 rounded-full"></div>
            
            {/* Progress Fill */}
            <div 
              className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] transition-all duration-700 ease-in-out"
              style={{ 
                width: `${currentStatus >= 4 ? 100 : (currentStatus / 4) * 100}%` 
              }}
            ></div>
            
            {/* Status Dots */}
            {statuses.map((status, index) => (
              <div
                key={status.id}
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${(index / (statuses.length - 1)) * 100}%` }}
              >
                <div
                  className={`w-6 h-6 rounded-full border-4 transition-all duration-500 ${
                    currentStatus >= status.id
                      ? 'bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] border-white shadow-lg scale-110'
                      : 'bg-white border-gray-300'
                  }`}
                ></div>
              </div>
            ))}
          </div>
          
          {/* Status Labels */}
          <div className="flex justify-between items-start">
            {statuses.map((status) => (
              <div 
                key={status.id} 
                className="flex flex-col items-center text-center flex-1"
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentStatus >= status.id
                      ? 'bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-white shadow-md'
                      : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  {status.label}
                </div>
                
                {/* Active Status Indicator */}
                {currentStatus === status.id && (
                  <div className="mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold">
                    Current
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Status Description */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Status: <span className="font-semibold text-gray-800">{serviceStatusLabels[currentStatus] || 'Unknown'}</span>
            </p>
            <div className="mt-2 text-sm text-gray-500">
              Step {currentStatus + 1} of {statuses.length}
            </div>
          </div>
        </div>
      );
    };
    
    // Demo component to show different status states
    // const StatusBarDemo = () => {
    //   const [currentStatus, setCurrentStatus] = React.useState(ServiceStatusCode.scheduled);
      
    //   // Simulate query polling effect
    //   React.useEffect(() => {
    //     const interval = setInterval(() => {
    //       setCurrentStatus(prev => {
    //         if (prev < ServiceStatusCode.cancelled) {
    //           return prev + 1;
    //         }
    //         return ServiceStatusCode.scheduled;
    //       });
    //     }, 2000);
        
    //     return () => clearInterval(interval);
    //   }, []);
    
    //   return (
    //     <div className="min-h-screen bg-gray-100 p-4">
    //       <StatusBar currentStatus={currentStatus} />
          
    //       {/* Manual Controls */}
    //       <div className="max-w-4xl mx-auto mt-8 flex justify-center gap-2">
    //         {Object.entries(serviceStatusLabels).map(([key, label]) => (
    //           <button
    //             key={key}
    //             onClick={() => setCurrentStatus(Number(key) as ServiceStatusCode)}
    //             className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
    //               currentStatus === Number(key)
    //                 ? 'bg-gradient-to-r from-[#2DD4BF] to-[#3B82F6] text-white'
    //                 : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
    //             }`}
    //           >
    //             {label}
    //           </button>
    //         ))}
    //       </div>
    //     </div>
    //   );
    // };



export default ProgressBar