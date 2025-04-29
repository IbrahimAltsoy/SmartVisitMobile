import { CustomerStatus } from "../enum/CustomerStatus";

export interface Customer {
  id: string;
  nameSurname: string;
  phone: string;
  productName: string;
  description: string;
  createdDate: string;
  status?: CustomerStatus;
  photoUrls: string[];
  pointed: number | null;
}
