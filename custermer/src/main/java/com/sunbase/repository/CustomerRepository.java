package com.sunbase.repository;

import com.sunbase.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findByUuid(String uuid);
    @Query("SELECT c FROM Customer c WHERE " +
            "(:firstName IS NULL OR c.firstName LIKE %:firstName%) AND " +
            "(:city IS NULL OR c.city LIKE %:city%) AND " +
            "(:email IS NULL OR c.email LIKE %:email%) AND " +
            "(:phone IS NULL OR c.phone LIKE %:phone%)")
    Page<Customer> findAllWithFilter(@Param("firstName") String firstName,
                                     @Param("city") String city,
                                     @Param("email") String email,
                                     @Param("phone") String phone, Pageable pageable);
}
