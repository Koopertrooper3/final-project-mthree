package com.mthree.backend.controller;

import com.mthree.backend.dto.ShoppingListRequest;
import com.mthree.backend.dto.UpdateShoppingListRequest;
import com.mthree.backend.entity.ShoppingList;
import com.mthree.backend.service.ShoppingListService;
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
    public String createList(@RequestBody ShoppingListRequest request) {
        return shoppingListService.createList(request);
    }

    @GetMapping("/user/{userId}")
    public List<ShoppingList> getListsByUserId(@PathVariable Integer userId) {
        return shoppingListService.getListsByUserId(userId);
    }

    @PutMapping("/{listId}")
    public String updateList(@PathVariable Integer listId, @RequestBody UpdateShoppingListRequest request) {
        return shoppingListService.updateList(listId, request);
    }

    @DeleteMapping("/{listId}")
    public String deleteList(@PathVariable Integer listId) {
        return shoppingListService.deleteList(listId);
    }
}