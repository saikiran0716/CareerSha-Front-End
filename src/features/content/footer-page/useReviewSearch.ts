import React, { useEffect, useRef, useState } from 'react';
import { PageData } from '../../../data/types';
import { getCollegeReviews, getCollegeSuggestions } from '../../../services/aiService';

/** College review search with debounced autocomplete. Results are written via `setData`. */
export const useReviewSearch = (setData: React.Dispatch<React.SetStateAction<PageData>>) => {
  // State for Review Search
  const [reviewSearch, setReviewSearch] = useState('');
  const [searchingReview, setSearchingReview] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Latest value for the debounced effect below, without re-running it on every open/close
  const showSuggestionsRef = useRef(showSuggestions);
  showSuggestionsRef.current = showSuggestions;
  const [hasSearched, setHasSearched] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const isTyping = useRef(false); // Track if update is from user typing

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced API Call for Autocomplete
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (reviewSearch.length > 2 && !showSuggestionsRef.current && isTyping.current) {
        // Only search if user typed > 2 chars, dropdown isn't open (or needs update), AND it's a typed update
        try {
          const results = await getCollegeSuggestions(reviewSearch);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (e) {
          console.error('Failed to fetch suggestions', e);
        }
      } else if (reviewSearch.length <= 2) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 500); // 500ms debounce
    return () => clearTimeout(timeoutId);
  }, [reviewSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isTyping.current = true;
    setReviewSearch(e.target.value);
    if (e.target.value.length <= 2) setShowSuggestions(false);
  };

  const selectSuggestion = (college: string) => {
    isTyping.current = false; // Programmatic update
    setReviewSearch(college);
    setShowSuggestions(false);
    handleReviewSearch(college);
  };

  const [loadingStage, setLoadingStage] = useState(0); // 0: Idle, 1: Scanning, 2: Reading, 3: Compiling

  // Loading Messages for Interactive Feel
  const LOADING_STEPS = [
    'Scanning recent student discussions...',
    'analyzing placement reports...',
    'Identifying specific campus spots...',
    'Compiling final verdict...',
  ];

  const handleReviewSearch = async (term: string = reviewSearch) => {
    if (!term.trim()) return;
    setSearchingReview(true);
    setShowSuggestions(false);
    setHasSearched(true);
    setData((prev) => ({ ...prev, items: [] })); // Clear previous results immediately

    // Simulate loading steps for user engagement
    setLoadingStage(0);
    const interval = setInterval(() => {
      setLoadingStage((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 800);

    try {
      const result = await getCollegeReviews(term);
      setData(result);
    } catch (e) {
      console.error('Failed to search reviews', e);
    } finally {
      clearInterval(interval);
      setSearchingReview(false);
      setLoadingStage(0);
    }
  };

  return {
    searchRef,
    reviewSearch,
    handleInputChange,
    handleReviewSearch,
    setShowSuggestions,
    searchingReview,
    showSuggestions,
    suggestions,
    selectSuggestion,
    hasSearched,
    loadingStage,
    LOADING_STEPS,
  };
};

export type ReviewSearch = ReturnType<typeof useReviewSearch>;
