package com.mthree.backend.service;

import com.mthree.backend.dto.*;
import com.mthree.backend.entity.*;
import com.mthree.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListService {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ShoppingItemRepository shoppingItemRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private ListIngredientRepository listIngredientRepository;

    public String createList(ShoppingListRequest request) {
        Optional<User> foundUser = userRepository.findById(request.getUserId());

        if (foundUser.isEmpty()) {
            return "User not found";
        }

        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            return "List title cannot be empty";
        }

        ShoppingList shoppingList = new ShoppingList();
        shoppingList.setTitle(request.getTitle());
        shoppingList.setUser(foundUser.get());

        shoppingListRepository.save(shoppingList);

        return "Shopping list created successfully";
    }

    public CreateFullShoppingListResponse createFullList(CreateFullShoppingListRequest request) {
        Optional<User> foundUser = userRepository.findById(request.getUserId());

        if (foundUser.isEmpty()) {
            return new CreateFullShoppingListResponse("User not found", null);
        }

        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            return new CreateFullShoppingListResponse("List title cannot be empty", null);
        }

        ShoppingList shoppingList = new ShoppingList();
        shoppingList.setTitle(request.getTitle());
        shoppingList.setUser(foundUser.get());

        shoppingListRepository.save(shoppingList);

        if (request.getItems() != null) {
            for (CreateShoppingItemInput itemInput : request.getItems()) {
                if (itemInput.getItemName() != null &&
                        !itemInput.getItemName().trim().isEmpty() &&
                        itemInput.getQuantity() != null &&
                        itemInput.getQuantity() > 0) {

                    ShoppingItem item = new ShoppingItem();
                    item.setItemName(itemInput.getItemName());
                    item.setQuantity(itemInput.getQuantity());
                    item.setCategory(itemInput.getCategory());
                    item.setBought(false);
                    item.setShoppingList(shoppingList);

                    shoppingItemRepository.save(item);
                }
            }
        }

        if (request.getIngredients() != null) {
            for (CreateListIngredientInput ingredientInput : request.getIngredients()) {
                if (ingredientInput.getIngredientId() != null &&
                        ingredientInput.getQuantity() != null &&
                        ingredientInput.getQuantity() > 0) {

                    Optional<Ingredient> foundIngredient =
                            ingredientRepository.findById(ingredientInput.getIngredientId());

                    if (foundIngredient.isPresent()) {
                        ListIngredient listIngredient = new ListIngredient();
                        listIngredient.setShoppingList(shoppingList);
                        listIngredient.setIngredient(foundIngredient.get());
                        listIngredient.setQuantity(ingredientInput.getQuantity());

                        listIngredientRepository.save(listIngredient);
                    }
                }
            }
        }

        return new CreateFullShoppingListResponse(
                "Shopping list with items and ingredients created successfully",
                shoppingList.getId()
        );
    }

    public List<ShoppingList> getListsByUserId(Integer userId) {
        return shoppingListRepository.findByUserId(userId);
    }

    public String updateList(Integer listId, UpdateShoppingListRequest request) {
        Optional<ShoppingList> foundList = shoppingListRepository.findById(listId);

        if (foundList.isEmpty()) {
            return "Shopping list not found";
        }

        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            return "List title cannot be empty";
        }

        ShoppingList shoppingList = foundList.get();
        shoppingList.setTitle(request.getTitle());

        shoppingListRepository.save(shoppingList);

        return "Shopping list updated successfully";
    }

    public String deleteList(Integer listId) {
        Optional<ShoppingList> foundList = shoppingListRepository.findById(listId);

        if (foundList.isEmpty()) {
            return "Shopping list not found";
        }

        shoppingListRepository.delete(foundList.get());

        return "Shopping list deleted successfully";
    }

    public ShoppingList getSingleList(Integer listId){
        return shoppingListRepository.findById(listId).orElse(new ShoppingList());
    }
}