package com.mthree.backend.repository;

import com.mthree.backend.entity.ListIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ListIngredientRepository extends JpaRepository<ListIngredient, Integer> {
    List<ListIngredient> findByShoppingListId(Integer listId);
}