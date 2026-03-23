package com.mthree.backend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class CreateFullShoppingListRequest {

    @NotBlank(message = "List title is required")
    private String title;

    @NotNull(message = "User ID is required")
    private Integer userId;

    @Valid
    private List<CreateShoppingItemInput> items;

    @Valid
    private List<CreateListIngredientInput> ingredients;

    public CreateFullShoppingListRequest() {
    }

    public String getTitle() {
        return title;
    }

    public Integer getUserId() {
        return userId;
    }

    public List<CreateShoppingItemInput> getItems() {
        return items;
    }

    public List<CreateListIngredientInput> getIngredients() {
        return ingredients;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setItems(List<CreateShoppingItemInput> items) {
        this.items = items;
    }

    public void setIngredients(List<CreateListIngredientInput> ingredients) {
        this.ingredients = ingredients;
    }
}