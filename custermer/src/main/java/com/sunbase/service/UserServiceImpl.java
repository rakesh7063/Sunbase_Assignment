package com.sunbase.service;

import com.sunbase.exception.CustomerException;
import com.sunbase.exception.UserException;
import com.sunbase.model.User;
import com.sunbase.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Override
    public User registerUser(User user) throws UserException {
      Optional<User> exstingUser = userRepository.findByUserName(user.getUserName());
      if(exstingUser.isPresent()) throw new UserException("User name all ready present");
      return userRepository.save(user);


    }
}
