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
@RequestMapping("/owners")
public class OwnerController {

    private final UserService userService;

    public OwnerController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createOwner(@RequestBody User owner) {
        owner.setRole(User.Role.OWNER); 
        return ResponseEntity.ok(userService.saveUser(owner));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllOwners() {
        List<User> owners = userService.findAll().stream()
                .filter(user -> user.getRole() == User.Role.OWNER) 
                .collect(Collectors.toList());
        return ResponseEntity.ok(owners);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getOwnerById(@PathVariable Long id) {
        Optional<User> owner = userService.findById(id);
        if (owner.isPresent() && owner.get().getRole() == User.Role.OWNER) {
            return ResponseEntity.ok(owner.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
