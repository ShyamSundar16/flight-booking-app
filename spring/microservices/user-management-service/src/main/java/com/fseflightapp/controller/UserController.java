package com.fseflightapp.controller;

import com.fseflightapp.entities.User;
import com.fseflightapp.repositories.UserRepository;
import com.fseflightapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:4200"})

public class UserController {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @GetMapping("")
    public List<User> getAllUsers() {
        System.out.println("Finding users from db..");
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public String addUser(@RequestBody User user) throws Exception {
        userService.save(user);
        return "redirect:../";
    }


    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        System.out.println("Find user with Id : " + id);
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User modifyUser(@PathVariable String id, @RequestBody User user) {
        return userService.modifyUser(id, user);
    }

    @DeleteMapping("/{id}")
    public boolean removeUser(@PathVariable String id) {
        System.out.println("User to delete: " + id);
        return userService.removeUser(id);
    }

//    @PostMapping("/validate")
//    public boolean authorize(@RequestParam("email") String email, @RequestParam("password") String password, HttpSession session) {
//        return userRepo.validateUser(email, password);
//    }

}
