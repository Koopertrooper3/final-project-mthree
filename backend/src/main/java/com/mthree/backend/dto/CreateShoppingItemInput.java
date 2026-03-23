package com.mthree.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CreateShoppingItemInput {

    @NotBlank(message = "Item name is required")
    private String itemName;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be greater than 0")
    private Integer quantity;

    private String category;

    public CreateShoppingItemInput() {
    }

    public String getItemName() {
        return itemName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}