package org.example.saasmanager.user.controller;

import com.example.users.api.UsersApi;
import com.example.users.model.UserCreate;
import com.example.users.model.UserDTO;
import com.example.users.model.UserPasswordUpdate;
import com.example.users.model.UserUpdate;
import jakarta.persistence.EntityNotFoundException;
import org.example.saasmanager.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
public class UserController implements UsersApi {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<UserDTO> createUser(UserCreate userCreate) {
        UserDTO createdUser = userService.createUser(userCreate);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return UsersApi.super.getRequest();
    }

    @Override
    public ResponseEntity<Void> deleteUserById(Integer id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build(); // 204 No Content on successful delete
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404 Not Found if user doesn't exist
        }
    }

    @Override
    public ResponseEntity<UserDTO> getUserById(Integer id) {
        Optional<UserDTO> userDtoOptional = userService.getUserById(id);
        return userDtoOptional
                .map(ResponseEntity::ok)  // Return 200 OK with user data if found
                .orElseGet(() -> ResponseEntity.notFound().build()); // 404 Not Found if not found
    }

    @Override
    public ResponseEntity<UserDTO> updateUserById(Integer id, UserUpdate userUpdate) {
        try {
            UserDTO updatedUser = userService.updateUser(id, userUpdate);
            return ResponseEntity.ok(updatedUser); // 200 OK with updated user data
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build(); // 404 Not Found if user or role doesn't exist
        }
    }

    @Override
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users); // 200 OK with the list of users
    }

    @Override
    public ResponseEntity<Void> updateUserPassword(Integer id, UserPasswordUpdate userPasswordUpdate){
        userService.updateUserPassword(id,userPasswordUpdate.getOldPassword(),userPasswordUpdate.getNewPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}