package com.mthree.backend.dto;

public class UpdateBoughtStatusRequest {

    private Boolean bought;

    public UpdateBoughtStatusRequest() {
    }

    public Boolean getBought() {
        return bought;
    }

    public void setBought(Boolean bought) {
        this.bought = bought;
    }
}