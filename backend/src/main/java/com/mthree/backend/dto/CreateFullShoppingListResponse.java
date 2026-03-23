package com.mthree.backend.dto;

public class CreateFullShoppingListResponse {

    private String message;
    private Integer listId;

    public CreateFullShoppingListResponse() {
    }

    public CreateFullShoppingListResponse(String message, Integer listId) {
        this.message = message;
        this.listId = listId;
    }

    public String getMessage() {
        return message;
    }

    public Integer getListId() {
        return listId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setListId(Integer listId) {
        this.listId = listId;
    }
}