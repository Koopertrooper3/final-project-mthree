package com.mthree.backend.dto;

import jakarta.validation.constraints.NotNull;

public class MoveListToPantryRequest {

    @NotNull(message = "List ID is required")
    private Integer listId;

    @NotNull(message = "User ID is required")
    private Integer userId;

    public MoveListToPantryRequest() {
    }

    public Integer getListId() {
        return listId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setListId(Integer listId) {
        this.listId = listId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}