package com.works.glycemic.repositories;

import com.works.glycemic.models.Foods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Foods, Long> {

    Optional<Foods> findByNameEqualsIgnoreCase(String name);

    List<Foods> findByCreatedByEqualsIgnoreCase(String createdBy);

    Optional<Foods> findByCreatedByEqualsIgnoreCaseAndGidEquals(String createdBy, Long gid);

    Optional<Foods> findByUrlEqualsIgnoreCaseAllIgnoreCase(String url);

    List<Foods> findByEnabledEqualsOrderByGidDesc(boolean enabled);

}
