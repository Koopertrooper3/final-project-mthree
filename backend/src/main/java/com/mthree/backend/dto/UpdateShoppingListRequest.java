package com.mthree.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateShoppingListRequest {

    @NotBlank(message = "List title is required")
    private String title;

    public UpdateShoppingListRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}