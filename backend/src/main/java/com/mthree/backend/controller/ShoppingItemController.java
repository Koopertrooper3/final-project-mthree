package com.mthree.backend.controller;

import com.mthree.backend.dto.ShoppingItemRequest;
import com.mthree.backend.dto.UpdateBoughtStatusRequest;
import com.mthree.backend.dto.UpdateShoppingItemRequest;
import com.mthree.backend.entity.ShoppingItem;
import com.mthree.backend.service.ShoppingItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ShoppingItemController {

    @Autowired
    private ShoppingItemService shoppingItemService;

    @PostMapping
    public String createItem(@RequestBody ShoppingItemRequest request) {
        return shoppingItemService.createItem(request);
    }

    @GetMapping("/list/{listId}")
    public List<ShoppingItem> getItemsByListId(@PathVariable Integer listId) {
        return shoppingItemService.getItemsByListId(listId);
    }

    @PutMapping("/{itemId}")
    public String updateItem(@PathVariable Integer itemId, @RequestBody UpdateShoppingItemRequest request) {
        return shoppingItemService.updateItem(itemId, request);
    }

    @PatchMapping("/{itemId}/bought")
    public String updateBoughtStatus(@PathVariable Integer itemId, @RequestBody UpdateBoughtStatusRequest request) {
        return shoppingItemService.updateBoughtStatus(itemId, request);
    }

    @DeleteMapping("/{itemId}")
    public String deleteItem(@PathVariable Integer itemId) {
        return shoppingItemService.deleteItem(itemId);
    }
}