package org.example.saasmanager.user.service;

import com.example.users.model.UserCreate;
import com.example.users.model.UserDTO;
import com.example.users.model.UserUpdate;
import jakarta.persistence.EntityNotFoundException;
import org.example.saasmanager.user.mapper.UserMapper;
import org.example.saasmanager.user.repository.RoleRepository;
import org.example.saasmanager.user.repository.UserRepository;
import org.example.shared.entities.Role;
import org.example.shared.entities.User;
import org.example.shared.enums.RoleName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
    }

    public List<UserDTO> getAllUsers() {
        List<User> foundUsers = userRepository.findAll();
        return userMapper.toDtoList(foundUsers);
    }

    public Optional<UserDTO> getUserById(Integer userId) {
        Optional<User> foundUser = userRepository.findById(userId);
        return foundUser.map(userMapper::toDto);
    }

    public UserDTO createUser(UserCreate userInfo) {
        Role role = roleRepository.findByRoleName(RoleName.ROLE_USER)
                .orElseThrow(() -> new IllegalArgumentException("Default role not found"));
        User userEntity = User.builder().email(userInfo.getEmail())
                .password(passwordEncoder.encode(userInfo.getPassword()))
                .role(role)
                .build();
        User savedUser = userRepository.save(userEntity);
        return userMapper.toDto(savedUser);
    }

    public UserDTO updateUser(Integer userId, UserUpdate userUpdateData) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));

        // Update fields based on UserUpdate input
        if (userUpdateData.getEmail() != null) {
            existingUser.setEmail(userUpdateData.getEmail());
        }

        if (userUpdateData.getName() != null) {
            existingUser.setName(userUpdateData.getName());
        }

        if (userUpdateData.getStatus() != null) {
            existingUser.setStatus(userUpdateData.getStatus().name());
        }
        if (userUpdateData.getPassword() != null) {
            existingUser.setPassword(userUpdateData.getPassword());
        }
        if (userUpdateData.getRole() != null) {
            Role role = roleRepository.findById(userUpdateData.getRole())
                    .orElseThrow(() -> new NoSuchElementException("Role not found with ID: " + userUpdateData.getRole()));
            existingUser.setRole(role);
        }
        // Update the updatedAt timestamp
        existingUser.setUpdatedAt(LocalDateTime.now());
        // Save and return the updated user as a UserDTO
        User savedUser = userRepository.save(existingUser);
        return userMapper.toDto(savedUser);

    }

    public void deleteUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        user.setStatus("deleted");
        userRepository.save(user);
    }

    public void updateUserPassword (Integer userId, String oldPassword, String newPassword ){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        // Validate old password
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Current Password is incorrect!");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}