package com.sunbase.contoller;

import com.sunbase.model.Customer;
import com.sunbase.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/all")
    public ResponseEntity<Page<Customer>> getAllCustomerList (@RequestParam(required = false) String firstName,
                                                              @RequestParam(required = false) String city,
                                                              @RequestParam(required = false) String email,
                                                              @RequestParam(required = false) String phone,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size,
                                                              @RequestParam(defaultValue = "id") String sortBy,
                                                              @RequestParam(defaultValue = "asc") String sortDir)
    {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return new ResponseEntity<>(customerService.getCustomers(firstName,city,email,phone,pageable),HttpStatus.OK);

   }

   @PostMapping("/save")
    public ResponseEntity<Customer> addCustomerHandle(@Valid @RequestBody Customer customer){
        return  new ResponseEntity<>(customerService.addCustomer(customer),HttpStatus.CREATED);
   }
   @PutMapping("/update/{id}")
    public ResponseEntity<Customer> updateCustomerHandle(@Valid @RequestBody Customer customer, @PathVariable Long id){
        return new ResponseEntity<>(customerService.updateCustomerById(id,customer),HttpStatus.OK);
   }
   @DeleteMapping("/delete/{id}")
   public ResponseEntity<Customer> deleteCustomerHandle(@PathVariable Long id){

        return new ResponseEntity<>(customerService.deleteCustomerById(id),HttpStatus.ACCEPTED);
   }
   @GetMapping("/{id}")
   public ResponseEntity<Customer> getCustomerHandle(@PathVariable Long id){
        return new ResponseEntity<>(customerService.viewCustomerById(id),HttpStatus.OK);
   }

}
