package com.sunbase.contoller;


import com.sunbase.model.LoginDTO;
import com.sunbase.model.User;
import com.sunbase.repository.UserRepository;
import com.sunbase.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @GetMapping("/signIn")
    public ResponseEntity<User> getLoggedInHandler(Authentication auth ){

        User registerUser = userRepository.findByUserName(auth.getName())
                                        .orElseThrow(() -> new BadCredentialsException("Invalid Username or password"));
        return  new ResponseEntity<>(registerUser, HttpStatus.ACCEPTED);
    }

    @PostMapping("/singUp")
    public ResponseEntity<User>  singUpUserHandler(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return new ResponseEntity<>(userService.registerUser(user),HttpStatus.ACCEPTED);
    }
}
