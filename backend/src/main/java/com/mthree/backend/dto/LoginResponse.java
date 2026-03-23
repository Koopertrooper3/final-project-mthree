package com.mthree.backend.dto;

public class LoginResponse {

    private String message;
    private Integer userId;

    public LoginResponse() {
    }

    public LoginResponse(String message, Integer userId) {
        this.message = message;
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}