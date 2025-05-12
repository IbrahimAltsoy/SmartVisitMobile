// src/services/CustomerService.ts

import apiClient from "../../utils/apiClient";
import { PagedResponse } from "../../types/common/PagedResponse";
import { Customer } from "../../types/customer/Customer";
import {
  CustomerUpdateStatusRequest,
  CustomerUpdateStatusResponse,
} from "../../types/customer/CustomerUpdateStatusRequest";
import { TimePeriodType } from "../../types/enum/TimePeriodType";

const BASE_URL = "/customers/";

export const CustomerService = {
  async getAll(
    timePeriod: number,
    page: number,
    pageSize: number
  ): Promise<PagedResponse<Customer>> {
    const response = await apiClient.get<PagedResponse<Customer>>(
      `${BASE_URL}${"customers"}`,
      {
        params: {
          TimePeriod: timePeriod,
          "PageRequest.Page": page,
          "PageRequest.PageSize": pageSize,
        },
      }
    );
    return response.data;
  },

  async getById(id: string): Promise<Customer> {
    const response = await apiClient.get<Customer>(`${BASE_URL}${"customer"}`, {
      params: { Id: id }, // dikkat: query string olarak gönderiliyor
    });
    return response.data;
  },

  async add(newCustomer: Omit<Customer, "id" | "createdDate">): Promise<void> {
    await apiClient.post(`${BASE_URL}`, newCustomer);
  },

  async update(updatedCustomer: Customer): Promise<void> {
    await apiClient.put(`${BASE_URL}/${updatedCustomer.id}`, updatedCustomer);
  },
  async updateStatu(
    request: CustomerUpdateStatusRequest
  ): Promise<CustomerUpdateStatusResponse> {
    const response = await apiClient.post(`${BASE_URL}${"update-statu"}`, {
      id: request.id,
      status: request.status,
    });
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },
  getSummary: async (timePeriod: TimePeriodType = TimePeriodType.Daily) => {
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
