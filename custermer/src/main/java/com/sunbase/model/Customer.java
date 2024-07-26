package com.sunbase.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String uuid;
    @NotEmpty(message = "first name should be not Empty")
    @NotNull
    @JsonProperty("first_name")
    private String firstName;
    @NotNull
    @NotEmpty(message = "Last name should be not Empty")
    @JsonProperty("last_name")
    private String lastName;
    @NotNull
    @NotEmpty(message = "Last name should be not Empty")
    private String street;
    @NotNull
    @NotEmpty(message = "Last name should be not Empty")
    private String address;
    @NotNull
    @NotEmpty(message = "Last name should be not Empty")
    private String city;
    @NotNull
    @NotEmpty(message = "Last name should be not Empty")
    private String state;
   @Email(message = "please write email format")
    private String email;
    @NotNull
    @NotEmpty(message = "Last name should be not Empty")
    private String phone;
}
