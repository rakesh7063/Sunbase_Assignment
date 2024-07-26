package com.sunbase.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
public class User {
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
    @Column(unique = true)
    private String userName;


    @NotNull
    @NotEmpty
    private String name;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
}
