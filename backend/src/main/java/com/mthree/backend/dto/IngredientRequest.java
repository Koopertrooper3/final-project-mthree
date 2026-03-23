package com.mthree.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class IngredientRequest {

    @NotBlank(message = "Ingredient name is required")
    private String name;

    private String category;

    public IngredientRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}