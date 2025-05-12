import { CustomerStatus } from "../enum/CustomerStatus";

export interface CustomerUpdateStatusRequest {
  id: string;
  status: CustomerStatus;
}
export interface CustomerUpdateStatusResponse {
  message: string;
  success: boolean;
}
