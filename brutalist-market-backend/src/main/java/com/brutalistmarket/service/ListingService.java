package com.brutalistmarket.service;

import com.brutalistmarket.dto.ListingRequest;
import com.brutalistmarket.dto.ListingResponse;
import com.brutalistmarket.dto.UserResponse;
import com.brutalistmarket.entity.Listing;
import com.brutalistmarket.entity.User;
import com.brutalistmarket.exception.ResourceNotFoundException;
import com.brutalistmarket.repository.ListingRepository;
import com.brutalistmarket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import java.math.BigDecimal;
import com.brutalistmarket.repository.ListingSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    public ListingResponse createListing(ListingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Listing listing = Listing.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .category(request.getCategory())
                .user(user)
                .build();

        Listing savedListing = listingRepository.save(listing);
        return mapToResponse(savedListing);
    }

    public Page<ListingResponse> searchListings(String keyword, BigDecimal minPrice, BigDecimal maxPrice, String category, Pageable pageable) {
        Specification<Listing> spec = ListingSpecification.filterListings(keyword, minPrice, maxPrice, category);
        
        return listingRepository.findAll(spec, pageable).map(this::mapToResponse);
    }

    public ListingResponse getListingById(Long id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));
        return mapToResponse(listing);
    }

    public List<ListingResponse> getListingsByUser(Long userId) {
        return listingRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ListingResponse updateListing(Long id, ListingRequest request, String userEmail) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));

        if (!listing.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("You can only update your own listings.");
        }

        listing.setTitle(request.getTitle());
        listing.setDescription(request.getDescription());
        listing.setPrice(request.getPrice());
        listing.setImageUrl(request.getImageUrl());
        listing.setCategory(request.getCategory());

        Listing updatedListing = listingRepository.save(listing);
        return mapToResponse(updatedListing);
    }

    public void deleteListing(Long id, String userEmail) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));

        if (!listing.getUser().getEmail().equals(userEmail)) {
            throw new IllegalArgumentException("You can only delete your own listings.");
        }

        listingRepository.delete(listing);
    }

    private ListingResponse mapToResponse(Listing listing) {
        UserResponse seller = UserResponse.builder()
                .id(listing.getUser().getId())
                .name(listing.getUser().getName())
                .email(listing.getUser().getEmail())
                .createdAt(listing.getUser().getCreatedAt())
                .build();

        return ListingResponse.builder()
                .id(listing.getId())
                .title(listing.getTitle())
                .description(listing.getDescription())
                .price(listing.getPrice())
                .imageUrl(listing.getImageUrl())
                .category(listing.getCategory())
                .createdAt(listing.getCreatedAt())
                .seller(seller)
                .build();
    }
}
