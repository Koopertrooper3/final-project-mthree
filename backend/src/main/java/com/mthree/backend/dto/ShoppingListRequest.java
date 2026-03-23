package com.mthree.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ShoppingListRequest {

    @NotBlank(message = "List title is required")
    private String title;

    @NotNull(message = "User ID is required")
    private Integer userId;

    public ShoppingListRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}