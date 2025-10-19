package com.lft.backend.controller;

import com.lft.backend.User;
import com.lft.backend.dtos.UserDto;
import com.lft.backend.enums.Sex;
import jakarta.validation.constraints.Positive;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

@RestController
@RequestMapping("/user")
@Validated
public class UserController {
// TODO: Define POST, DELETE, PATCH
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getById(
            @PathVariable
            @Positive(message = "ID must be a positive number")
            Long id
    ) {
        LocalDate localDate = LocalDate.now().minusYears(20);

//        TODO: change to provide real data
        User user = new UserDto("Jmeno", "Prijmeni", localDate, "testovaci user", Sex.MALE).toEntity();

        UserDto userDto = UserDto.from(user);
        return ResponseEntity.ok(userDto);
    }
}
