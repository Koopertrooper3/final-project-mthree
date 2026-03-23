package com.mthree.backend.dto;

import jakarta.validation.constraints.NotNull;

public class UpdateBoughtStatusRequest {

    @NotNull(message = "Bought status is required")
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