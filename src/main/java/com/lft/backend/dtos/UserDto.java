package com.lft.backend.dtos;

import com.lft.backend.User;
import com.lft.backend.enums.Sex;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
public class UserDto {
    @NotBlank(message = "First name is required")
    @Size(min = 1, max = 50, message = "First name must be between 1 and 50 characters")
    private String firstName;
    @NotBlank(message = "Last name is required")
    @Size(min = 1, max = 50, message = "Last name must be between 1 and 50 characters")
    private String lastName;
    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;
    @Size(max = 30, message = "Nickname cannot exceed 30 characters")
    private String nickName;
    @NotNull(message = "Sex is required")
    private Sex sex;

    // Constructors
    public UserDto() {
    }

    public UserDto(String firstName, String lastName, LocalDate dateOfBirth, String nickName, Sex sex) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.nickName = nickName;
        this.sex = sex;
    }

    // Static factory method: Entity → DTO
    public static UserDto from(User user) {
        if (user == null) return null;

        return new UserDto(
                user.getFirstName(),
                user.getLastName(),
                user.getDateOfBirth(),
                user.getNickName(),
                user.getSex()
        );
    }

    // Convert DTO → Entity
    public User toEntity() {
        return new User(firstName, lastName, dateOfBirth, nickName, sex);
    }

    // Getters and Setters
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }
}