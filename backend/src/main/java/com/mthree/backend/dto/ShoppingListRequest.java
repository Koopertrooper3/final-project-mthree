package com.mthree.backend.dto;

public class ShoppingListRequest {

    private String title;
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