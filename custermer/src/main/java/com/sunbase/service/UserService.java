package com.sunbase.service;

import com.sunbase.exception.UserException;
import com.sunbase.model.User;

public interface UserService {
    public User registerUser(User user) throws UserException;
}
