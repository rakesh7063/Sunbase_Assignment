package com.sunbase.service;

import com.sunbase.exception.CustomerException;
import com.sunbase.model.Customer;
import com.sunbase.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class CustomerServiceImpl implements CustomerService{
    @Autowired
    private CustomerRepository customerRepository;

    private static final String PREFIX = "test";
    private static final String ALPHANUMERIC_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public static String generateUuidWithPrefix() {
        // Generate a random alphanumeric string
        String uuid = generateRandomAlphanumeric(10); // Adjust length as needed

        // Ensure the generated string has at least one number
        while (!uuid.matches(".*\\d.*")) {
            uuid = generateRandomAlphanumeric(10);
        }

        // Prefix the UUID with "test"
        return PREFIX + uuid;
    }

    private static String generateRandomAlphanumeric(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(ALPHANUMERIC_CHARACTERS.length());
            sb.append(ALPHANUMERIC_CHARACTERS.charAt(index));
        }

        return sb.toString();
    }
    @Override
    public void saveOrUpdateCustomer(Customer customer) {
        Optional<Customer> existingCustomer = customerRepository.findByUuid(customer.getUuid());
        if (existingCustomer.isPresent()) {
            Customer dbCustomer = existingCustomer.get();
            dbCustomer.setFirstName(customer.getFirstName());
            dbCustomer.setLastName(customer.getLastName());
            dbCustomer.setStreet(customer.getStreet());
            dbCustomer.setAddress(customer.getAddress());
            dbCustomer.setCity(customer.getCity());
            dbCustomer.setState(customer.getState());
            dbCustomer.setEmail(customer.getEmail());
            dbCustomer.setPhone(customer.getPhone());
            customerRepository.save(dbCustomer);
        } else {
            customerRepository.save(customer);
        }
    }

    @Override
    public Page<Customer> getCustomers(String firstName, String city, String email, String phone, Pageable pageable) {
        return customerRepository.findAllWithFilter(firstName, city, email, phone, pageable);
    }

    @Override
    public Customer updateCustomerById(Long id,Customer updateCustomer) throws CustomerException {
        Customer exstingCustomer = customerRepository.findById(id)
                .orElseThrow(()-> new CustomerException("Customer not found with id "+ id));
       exstingCustomer.setFirstName(updateCustomer.getFirstName());
       exstingCustomer.setLastName(updateCustomer.getLastName());
        exstingCustomer.setAddress(updateCustomer.getAddress());
        exstingCustomer.setPhone(updateCustomer.getPhone());
        exstingCustomer.setCity(updateCustomer.getCity());
        exstingCustomer.setState(updateCustomer.getState());
        exstingCustomer.setEmail(updateCustomer.getEmail());
        exstingCustomer.setStreet(updateCustomer.getStreet());
        return customerRepository.save(exstingCustomer);
    }

    @Override
    public Customer addCustomer(Customer customer) {
       customer.setUuid(generateUuidWithPrefix());// Generate a UUID with the "test" prefix
       return  customerRepository.save(customer);
    }

    @Override
    public Customer deleteCustomerById(Long id) throws CustomerException {
        Customer exstingCustomer = customerRepository.findById(id)
                .orElseThrow(()-> new CustomerException("Customer not found with id "+ id));
        customerRepository.delete(exstingCustomer);
        return exstingCustomer;
    }

    @Override
    public Customer viewCustomerById(Long id) throws CustomerException {
        Customer viewCustomer = customerRepository.findById(id)
                .orElseThrow(()-> new CustomerException("Not found customer with id " + id));
        return viewCustomer;
    }


}
