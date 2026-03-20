package com.mthree.backend.service;

import com.mthree.backend.dto.IngredientRequest;
import com.mthree.backend.dto.ListIngredientRequest;
import com.mthree.backend.entity.Ingredient;
import com.mthree.backend.entity.ListIngredient;
import com.mthree.backend.entity.ShoppingList;
import com.mthree.backend.repository.IngredientRepository;
import com.mthree.backend.repository.ListIngredientRepository;
import com.mthree.backend.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    private ListIngredientRepository listIngredientRepository;

    public String createIngredient(IngredientRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            return "Ingredient name cannot be empty";
        }

        Optional<Ingredient> existingIngredient = ingredientRepository.findByName(request.getName());

        if (existingIngredient.isPresent()) {
            return "Ingredient already exists";
        }

        Ingredient ingredient = new Ingredient();
        ingredient.setName(request.getName());
        ingredient.setCategory(request.getCategory());

        ingredientRepository.save(ingredient);

        return "Ingredient created successfully";
    }

    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    public String addIngredientToList(ListIngredientRequest request) {
        Optional<ShoppingList> foundList = shoppingListRepository.findById(request.getListId());
        Optional<Ingredient> foundIngredient = ingredientRepository.findById(request.getIngredientId());

        if (foundList.isEmpty()) {
            return "Shopping list not found";
        }

        if (foundIngredient.isEmpty()) {
            return "Ingredient not found";
        }

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            return "Quantity must be greater than 0";
        }

        ListIngredient listIngredient = new ListIngredient();
        listIngredient.setShoppingList(foundList.get());
        listIngredient.setIngredient(foundIngredient.get());
        listIngredient.setQuantity(request.getQuantity());

        listIngredientRepository.save(listIngredient);

        return "Ingredient added to shopping list successfully";
    }

    public List<ListIngredient> getIngredientsByListId(Integer listId) {
        return listIngredientRepository.findByShoppingListId(listId);
    }

    public String removeIngredientFromList(Integer listIngredientId) {
        Optional<ListIngredient> foundLink = listIngredientRepository.findById(listIngredientId);

        if (foundLink.isEmpty()) {
            return "Linked ingredient not found";
        }

        listIngredientRepository.delete(foundLink.get());

        return "Ingredient removed from shopping list successfully";
    }
}