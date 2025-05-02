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
  getSummary: async (timePeriod = 3) => {
    const response = await apiClient.get(`/customers/summary`, {
      params: { timePeriod },
    });

    return {
      Delivered: response.data.delivered ?? 0,
      Waiting: response.data.waiting ?? 0,
      Canceled: response.data.canceled ?? 0,
    };
  },
};
