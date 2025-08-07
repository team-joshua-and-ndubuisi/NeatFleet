//Data that will be needed to update the status
import { ServiceStatus } from '/Users/yassahreed/collabs/NeatFleet/client/src/features/statusUpdate/types/ServiceStatus'

export interface FormData {
    bookingID: number,
    status: ServiceStatus | 0,
    timeStamp: Date,
}
