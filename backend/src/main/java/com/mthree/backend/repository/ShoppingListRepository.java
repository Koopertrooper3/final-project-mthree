package com.mthree.backend.repository;

import com.mthree.backend.entity.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShoppingListRepository extends JpaRepository<ShoppingList, Integer> {
    List<ShoppingList> findByUserId(Integer userId);
}