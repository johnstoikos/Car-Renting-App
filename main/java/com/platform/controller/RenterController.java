package com.platform.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.platform.model.User;
import com.platform.service.UserService;

@RestController
@RequestMapping("/renters")
public class RenterController {

    private final UserService userService;

    public RenterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createRenter(@RequestBody User renter) {
        renter.setRole(User.Role.RENTER);
        return ResponseEntity.ok(userService.saveUser(renter));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllRenters() {
        List<User> renters = userService.findAll().stream()
                .filter(user -> user.getRole() == User.Role.RENTER)
                .collect(Collectors.toList());
        return ResponseEntity.ok(renters);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getRenterById(@PathVariable Long id) {
        Optional<User> renter = userService.findById(id);
        if (renter.isPresent() && renter.get().getRole() == User.Role.RENTER) {
            return ResponseEntity.ok(renter.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
