package com.mthree.backend.controller;

import com.mthree.backend.dto.CreateFullShoppingListRequest;
import com.mthree.backend.dto.CreateFullShoppingListResponse;
import com.mthree.backend.dto.ShoppingListRequest;
import com.mthree.backend.dto.UpdateShoppingListRequest;
import com.mthree.backend.entity.ShoppingList;
import com.mthree.backend.service.ShoppingListService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
@CrossOrigin(origins = "*")
public class ShoppingListController {

    @Autowired
    private ShoppingListService shoppingListService;

    @PostMapping
    public String createList(@Valid @RequestBody ShoppingListRequest request) {
        return shoppingListService.createList(request);
    }

    @PostMapping("/full")
    public CreateFullShoppingListResponse createFullList(@Valid @RequestBody CreateFullShoppingListRequest request) {
        return shoppingListService.createFullList(request);
    }

    @GetMapping("/user/{userId}")
    public List<ShoppingList> getListsByUserId(@PathVariable Integer userId) {
        return shoppingListService.getListsByUserId(userId);
    }

    @GetMapping("/{listId}")
    public ShoppingList getListById(@PathVariable Integer listId) {
        return shoppingListService.getSingleList(listId);
    }

    @PutMapping("/{listId}")
    public String updateList(@PathVariable Integer listId, @Valid @RequestBody UpdateShoppingListRequest request) {
        return shoppingListService.updateList(listId, request);
    }

    @DeleteMapping("/{listId}")
    public String deleteList(@PathVariable Integer listId) {
        return shoppingListService.deleteList(listId);
    }
}