// src/services/CustomerService.ts

import apiClient from "../../utils/apiClient";
import { PagedResponse } from "../../types/common/PagedResponse";
import { Customer } from "../../types/customer/Customer";

const BASE_URL = "/customers/customers";

export const CustomerService = {
  async getAll(
    timePeriod: number,
    page: number,
    pageSize: number
  ): Promise<PagedResponse<Customer>> {
    const response = await apiClient.get<PagedResponse<Customer>>(BASE_URL, {
      params: {
        TimePeriod: timePeriod,
        "PageRequest.Page": page,
        "PageRequest.PageSize": pageSize,
      },
    });
    return response.data;
  },

  async getById(id: string): Promise<Customer> {
    const response = await apiClient.get<Customer>(`${BASE_URL}/${id}`);
    return response.data;
  },

  async add(newCustomer: Omit<Customer, "id" | "createdDate">): Promise<void> {
    await apiClient.post(`${BASE_URL}`, newCustomer);
  },

  async update(updatedCustomer: Customer): Promise<void> {
    await apiClient.put(`${BASE_URL}/${updatedCustomer.id}`, updatedCustomer);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },
};
