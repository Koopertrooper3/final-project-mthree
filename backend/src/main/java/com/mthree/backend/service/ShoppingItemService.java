package com.mthree.backend.service;

import com.mthree.backend.dto.ShoppingItemRequest;
import com.mthree.backend.dto.UpdateBoughtStatusRequest;
import com.mthree.backend.dto.UpdateShoppingItemRequest;
import com.mthree.backend.entity.ShoppingItem;
import com.mthree.backend.entity.ShoppingList;
import com.mthree.backend.repository.ShoppingItemRepository;
import com.mthree.backend.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingItemService {

    @Autowired
    private ShoppingItemRepository shoppingItemRepository;

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    public String createItem(ShoppingItemRequest request) {
        Optional<ShoppingList> foundList = shoppingListRepository.findById(request.getListId());

        if (foundList.isEmpty()) {
            return "Shopping list not found";
        }

        if (request.getItemName() == null || request.getItemName().trim().isEmpty()) {
            return "Item name cannot be empty";
        }

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            return "Quantity must be greater than 0";
        }

        ShoppingItem item = new ShoppingItem();
        item.setItemName(request.getItemName());
        item.setQuantity(request.getQuantity());
        item.setCategory(request.getCategory());
        item.setBought(false);
        item.setShoppingList(foundList.get());

        shoppingItemRepository.save(item);

        return "Shopping item created successfully";
    }

    public List<ShoppingItem> getItemsByListId(Integer listId) {
        return shoppingItemRepository.findByShoppingListId(listId);
    }

    public String updateItem(Integer itemId, UpdateShoppingItemRequest request) {
        Optional<ShoppingItem> foundItem = shoppingItemRepository.findById(itemId);

        if (foundItem.isEmpty()) {
            return "Shopping item not found";
        }

        if (request.getItemName() == null || request.getItemName().trim().isEmpty()) {
            return "Item name cannot be empty";
        }

        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            return "Quantity must be greater than 0";
        }

        ShoppingItem item = foundItem.get();
        item.setItemName(request.getItemName());
        item.setQuantity(request.getQuantity());
        item.setCategory(request.getCategory());

        shoppingItemRepository.save(item);

        return "Shopping item updated successfully";
    }

    public String updateBoughtStatus(Integer itemId, UpdateBoughtStatusRequest request) {
        Optional<ShoppingItem> foundItem = shoppingItemRepository.findById(itemId);

        if (foundItem.isEmpty()) {
            return "Shopping item not found";
        }

        ShoppingItem item = foundItem.get();
        item.setBought(request.getBought());

        shoppingItemRepository.save(item);

        return "Shopping item bought status updated successfully";
    }

    public String deleteItem(Integer itemId) {
        Optional<ShoppingItem> foundItem = shoppingItemRepository.findById(itemId);

        if (foundItem.isEmpty()) {
            return "Shopping item not found";
        }

        shoppingItemRepository.delete(foundItem.get());

        return "Shopping item deleted successfully";
    }
}