package com.mthree.backend.dto;

public class UpdateShoppingListRequest {

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