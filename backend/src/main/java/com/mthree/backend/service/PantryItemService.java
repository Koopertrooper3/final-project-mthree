package com.mthree.backend.service;

import com.mthree.backend.dto.PantryItemRequest;
import com.mthree.backend.dto.UpdatePantryItemRequest;
import com.mthree.backend.entity.PantryItem;
import com.mthree.backend.entity.User;
import com.mthree.backend.repository.PantryItemRepository;
import com.mthree.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PantryItemService {

    @Autowired
    private PantryItemRepository pantryItemRepository;

    @Autowired
    private UserRepository userRepository;

    public String createPantryItem(PantryItemRequest request) {
        Optional<User> foundUser = userRepository.findById(request.getUserId());

        if (foundUser.isEmpty()) {
            return "User not found";
        }

        if (request.getItemName() == null || request.getItemName().trim().isEmpty()) {
            return "Pantry item name cannot be empty";
        }

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            return "Quantity must be greater than 0";
        }

        PantryItem pantryItem = new PantryItem();
        pantryItem.setItemName(request.getItemName());
        pantryItem.setQuantity(request.getQuantity());
        pantryItem.setCategory(request.getCategory());
        pantryItem.setUser(foundUser.get());

        if (request.getExpiryDate() != null && !request.getExpiryDate().trim().isEmpty()) {
            pantryItem.setExpiryDate(LocalDate.parse(request.getExpiryDate()));
        }

        pantryItemRepository.save(pantryItem);

        return "Pantry item created successfully";
    }

    public List<PantryItem> getPantryItemsByUserId(Integer userId) {
        return pantryItemRepository.findByUserId(userId);
    }

    public String updatePantryItem(Integer pantryItemId, UpdatePantryItemRequest request) {
        Optional<PantryItem> foundPantryItem = pantryItemRepository.findById(pantryItemId);

        if (foundPantryItem.isEmpty()) {
            return "Pantry item not found";
        }

        if (request.getItemName() == null || request.getItemName().trim().isEmpty()) {
            return "Pantry item name cannot be empty";
        }

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            return "Quantity must be greater than 0";
        }

        PantryItem pantryItem = foundPantryItem.get();
        pantryItem.setItemName(request.getItemName());
        pantryItem.setQuantity(request.getQuantity());
        pantryItem.setCategory(request.getCategory());

        if (request.getExpiryDate() != null && !request.getExpiryDate().trim().isEmpty()) {
            pantryItem.setExpiryDate(LocalDate.parse(request.getExpiryDate()));
        } else {
            pantryItem.setExpiryDate(null);
        }

        pantryItemRepository.save(pantryItem);

        return "Pantry item updated successfully";
    }

    public String deletePantryItem(Integer pantryItemId) {
        Optional<PantryItem> foundPantryItem = pantryItemRepository.findById(pantryItemId);

        if (foundPantryItem.isEmpty()) {
            return "Pantry item not found";
        }

        pantryItemRepository.delete(foundPantryItem.get());

        return "Pantry item deleted successfully";
    }
}