package com.mthree.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CreateListIngredientInput {

    @NotNull(message = "Ingredient ID is required")
    private Integer ingredientId;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be greater than 0")
    private Integer quantity;

    public CreateListIngredientInput() {
    }

    public Integer getIngredientId() {
        return ingredientId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setIngredientId(Integer ingredientId) {
        this.ingredientId = ingredientId;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}