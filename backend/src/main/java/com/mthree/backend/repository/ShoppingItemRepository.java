package com.mthree.backend.repository;

import com.mthree.backend.entity.ShoppingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShoppingItemRepository extends JpaRepository<ShoppingItem, Integer> {
    List<ShoppingItem> findByShoppingListId(Integer listId);
}