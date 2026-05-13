package com.example.base.service;

import com.example.base.dto.CreateUserRequest;
import com.example.base.dto.UserResponse;
import com.example.base.entity.User;
import com.example.base.exception.ResourceNotFoundException;
import com.example.base.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserResponse getById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
        return toResponse(user);
    }

    @Transactional
    public UserResponse create(CreateUserRequest request) {
        User user = userRepository.save(new User(request.getName(), request.getEmail()));
        return toResponse(user);
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail());
    }
}
