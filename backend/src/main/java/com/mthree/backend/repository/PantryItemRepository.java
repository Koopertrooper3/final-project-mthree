package com.mthree.backend.repository;

import com.mthree.backend.entity.PantryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PantryItemRepository extends JpaRepository<PantryItem, Integer> {
    List<PantryItem> findByUserId(Integer userId);
    Optional<PantryItem> findByUserIdAndItemName(Integer userId, String itemName);
}