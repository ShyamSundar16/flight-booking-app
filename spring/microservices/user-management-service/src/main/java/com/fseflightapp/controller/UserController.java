package com.fseflightapp.controller;

import com.fseflightapp.entities.User;
import com.fseflightapp.repositories.UserRepository;
import com.fseflightapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @GetMapping("")
    @Cacheable(value = "users")
    public List<User> getAllUsers(){
        System.out.println("Finding users from db..");
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public String addUser(@RequestBody User user) throws Exception {
                userService.save(user);
                return "redirect:../";
    }


    @GetMapping("/{id}")
    @Cacheable(key="#id", value = "books")
    public User getBookById(@PathVariable String id){
        System.out.println("Find user with Id : "+id);
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    @CacheEvict(key="#id", value = "users")
    public User modifyUser(@PathVariable String id, @RequestBody User book) {
        return userService.modifyUser(id, book);
    }

    @DeleteMapping("/{id}")
    @CacheEvict(key="#id", value = "users")
    public boolean removeUser(@PathVariable String id) {
        System.out.println("Uer to delete: "+id);
        return userService.removeUser(id);
    }

//    @PostMapping("/validate")
//    public boolean authorize(@RequestParam("email") String email, @RequestParam("password") String password, HttpSession session) {
//        return userRepo.validateUser(email, password);
//    }

}
