package com.mthree.backend.dto;

public class IngredientRequest {

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