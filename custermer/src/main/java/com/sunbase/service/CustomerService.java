package com.sunbase.service;

import com.sunbase.exception.CustomerException;
import com.sunbase.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {
    public void saveOrUpdateCustomer(Customer customer);
    public Page<Customer> getCustomers(String firstName, String city, String email, String phone, Pageable pageable);
    public Customer updateCustomerById(Long id, Customer updateCustomer) throws CustomerException;
    public Customer addCustomer(Customer customer);
    public Customer deleteCustomerById(Long id) throws CustomerException;
    public Customer viewCustomerById(Long id) throws CustomerException;
}
