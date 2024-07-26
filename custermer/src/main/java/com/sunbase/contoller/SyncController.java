package com.sunbase.contoller;

import com.sunbase.model.Customer;
import com.sunbase.service.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
public class SyncController {
    private static final Logger logger = LoggerFactory.getLogger(SyncController.class);

    @Autowired
    private CustomerService customerService;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/sync-customers")
    public ResponseEntity<String> syncCustomers() {
        String token = authenticate();

        System.out.println("inside sync method");
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        }
        fetchAndSaveCustomers(token);
        return ResponseEntity.ok("Customers synchronized successfully");
    }

    // call remote api to get access token
    private String authenticate() {
        String url = "https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String body = "{\"login_id\":\"test@sunbasedata.com\",\"password\":\"Test@123\"}";

        HttpEntity<String> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
    // get access token
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Object token = response.getBody().get("access_token");
            if (token != null) {
                return token.toString();
            } else {
                logger.error("Token is missing in the authentication response: " + response.getBody());
            }
        } else {
            logger.error("Failed to authenticate. Status code: " + response.getStatusCode());
        }
        return null;
    }

    // call remote api to get customer list and insert ar update customer
    private void fetchAndSaveCustomers(String token) {
        String url = "https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Create URL with parameters
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("cmd", "get_customer_list");

        ResponseEntity<Customer[]> response = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                Customer[].class
        );

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            List<Customer> customers = Arrays.asList(response.getBody());
            customers.stream().forEach(customer -> customerService.saveOrUpdateCustomer(customer));
        } else {
            logger.error("Failed to fetch customer list. Status code: " + response.getStatusCode());
        }
    }
}
