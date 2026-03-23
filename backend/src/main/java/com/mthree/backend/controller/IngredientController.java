package com.mthree.backend.controller;

import com.mthree.backend.dto.IngredientRequest;
import com.mthree.backend.dto.ListIngredientRequest;
import com.mthree.backend.entity.Ingredient;
import com.mthree.backend.entity.ListIngredient;
import com.mthree.backend.service.IngredientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "*")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;

    @PostMapping
    public String createIngredient(@Valid @RequestBody IngredientRequest request) {
        return ingredientService.createIngredient(request);
    }

    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    @PostMapping("/link")
    public String addIngredientToList(@Valid @RequestBody ListIngredientRequest request) {
        return ingredientService.addIngredientToList(request);
    }

    @GetMapping("/list/{listId}")
    public List<ListIngredient> getIngredientsByListId(@PathVariable Integer listId) {
        return ingredientService.getIngredientsByListId(listId);
    }

    @DeleteMapping("/link/{listIngredientId}")
    public String removeIngredientFromList(@PathVariable Integer listIngredientId) {
        return ingredientService.removeIngredientFromList(listIngredientId);
    }
}