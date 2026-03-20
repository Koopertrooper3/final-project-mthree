package com.mthree.backend.service;

import com.mthree.backend.dto.ShoppingListRequest;
import com.mthree.backend.dto.UpdateShoppingListRequest;
import com.mthree.backend.entity.ShoppingList;
import com.mthree.backend.entity.User;
import com.mthree.backend.repository.ShoppingListRepository;
import com.mthree.backend.repository.UserRepository;
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
}