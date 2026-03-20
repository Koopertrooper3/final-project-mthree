package com.mthree.backend.controller;

import com.mthree.backend.dto.PantryItemRequest;
import com.mthree.backend.dto.UpdatePantryItemRequest;
import com.mthree.backend.entity.PantryItem;
import com.mthree.backend.service.PantryItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pantry")
@CrossOrigin(origins = "*")
public class PantryItemController {

    @Autowired
    private PantryItemService pantryItemService;

    @PostMapping
    public String createPantryItem(@RequestBody PantryItemRequest request) {
        return pantryItemService.createPantryItem(request);
    }

    @GetMapping("/user/{userId}")
    public List<PantryItem> getPantryItemsByUserId(@PathVariable Integer userId) {
        return pantryItemService.getPantryItemsByUserId(userId);
    }

    @PutMapping("/{pantryItemId}")
    public String updatePantryItem(@PathVariable Integer pantryItemId,
                                   @RequestBody UpdatePantryItemRequest request) {
        return pantryItemService.updatePantryItem(pantryItemId, request);
    }

    @DeleteMapping("/{pantryItemId}")
    public String deletePantryItem(@PathVariable Integer pantryItemId) {
        return pantryItemService.deletePantryItem(pantryItemId);
    }
}