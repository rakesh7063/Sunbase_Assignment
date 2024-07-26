package com.sunbase.service;

import com.sunbase.model.User;
import com.sunbase.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerUserDetailsService implements UserDetailsService {
    @Autowired
   private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> opt= userRepository.findByUserName(username);

        if(opt.isPresent()) {

            User user= opt.get();

            List<GrantedAuthority> authorities= new ArrayList<>();



            return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), authorities);



        }else
            throw new BadCredentialsException("User Details not found with this username: "+username);
    }
}
