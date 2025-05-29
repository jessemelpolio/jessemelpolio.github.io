import { highlightSearchTerm } from "./highlight-search-term.js";

document.addEventListener("DOMContentLoaded", function () {
  
  // Enhanced search functionality with more precise matching
  const normalizeText = (text) => {
    return text.toLowerCase().trim().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ');
  };

  const preciseMatch = (text, searchTerm) => {
    if (!searchTerm || searchTerm.length === 0) return true;
    if (!text || text.length === 0) return false;
    
    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(searchTerm);
    
    // First try exact phrase match
    if (normalizedText.includes(normalizedSearch)) return true;
    
    // Special handling for years (4-digit numbers)
    if (/^\d{4}$/.test(searchTerm.trim())) {
      return normalizedText.includes(searchTerm.trim());
    }
    
    // Special handling for common venue abbreviations (all caps, 3-6 letters)
    if (/^[A-Z]{3,6}$/.test(searchTerm.trim())) {
      return normalizedText.includes(searchTerm.toLowerCase());
    }
    
    // For multi-word searches, require all words to be present
    const searchWords = normalizedSearch.split(' ').filter(word => word.length > 2);
    if (searchWords.length > 1) {
      // For multi-word queries, all words must be present
      return searchWords.every(word => normalizedText.includes(word));
    }
    
    // For single words, require substantial overlap
    const textWords = normalizedText.split(' ');
    return textWords.some(textWord => 
      textWord.includes(normalizedSearch) || 
      (normalizedSearch.length > 3 && textWord.length > 3 && 
       normalizedSearch.includes(textWord.substring(0, Math.min(4, textWord.length))))
    );
  };

  const extractSearchableContent = (element) => {
    const content = {
      title: '',
      authors: '',
      abstract: '',
      categories: '',
      venue: '',
      year: ''
    };

    // Extract title
    const titleElement = element.querySelector('.title');
    if (titleElement) {
      content.title = titleElement.textContent || '';
    }

    // Extract authors
    const authorElement = element.querySelector('.author');
    if (authorElement) {
      content.authors = authorElement.textContent || '';
    }

    // Extract abstract
    const abstractElement = element.querySelector('.abstract-text, .abstract');
    if (abstractElement) {
      content.abstract = abstractElement.textContent || abstractElement.getAttribute('data-full-text') || '';
    }

    // Extract categories - look for data-category attributes
    const categoryElements = element.querySelectorAll('.badge-category[data-category]');
    if (categoryElements.length > 0) {
      content.categories = Array.from(categoryElements).map(el => 
        el.getAttribute('data-category') || ''
      ).filter(cat => cat.length > 0).join(' ');
    }

    // Enhanced venue extraction - try multiple approaches
    const venueElement = element.querySelector('abbr.badge.rounded');
    if (venueElement) {
      // Get the text content, which might be inside a link
      const venueLink = venueElement.querySelector('a');
      content.venue = venueLink ? venueLink.textContent : venueElement.textContent;
      content.venue = content.venue.trim();
    } else {
      // Fallback: look for "Under Review" or other venue patterns in periodical
      const periodicalElements = element.querySelectorAll('.periodical');
      for (const periodical of periodicalElements) {
        const text = periodical.textContent.trim();
        if (text && (text.includes('Under Review') || text.includes('under review') || 
                     text.includes('arXiv') || text.includes('Review'))) {
          content.venue = text;
          break;
        }
      }
    }

    // Extract year - look specifically for .year-badge elements
    const yearElement = element.querySelector('.year-badge');
    if (yearElement) {
      content.year = yearElement.textContent.trim();
    }

    // Clean up extracted content
    content.title = content.title.trim();
    content.authors = content.authors.trim();
    content.abstract = content.abstract.trim();
    content.categories = content.categories.trim();
    content.venue = content.venue.trim();
    content.year = content.year.trim();

    console.log(`📊 Extracted content:`, {
      title: content.title.substring(0, 30) + '...',
      authors: content.authors.substring(0, 30) + '...',
      categories: content.categories,
      venue: content.venue,
      year: content.year,
      abstract: content.abstract.substring(0, 50) + '...'
    });

    return content;
  };

  const searchInContent = (content, searchTerm) => {
    if (!searchTerm || searchTerm.trim().length === 0) return true;
    
    const normalizedSearch = normalizeText(searchTerm);
    
    // Detect search type for better handling
    const isYear = /^\d{4}$/.test(searchTerm.trim());
    
    // More specific venue detection - only for known venue patterns
    const commonVenues = ['cvpr', 'iccv', 'eccv', 'nips', 'icml', 'aaai', 'ijcai', 'acl', 'emnlp', 'naacl', 'iclr', 'icdar', 'wacv', 'acmm', 'tmlr', 'tpami', 'tog', 'jov'];
    const isVenue = commonVenues.includes(searchTerm.toLowerCase()) ||
                   searchTerm.toLowerCase().includes('under review') ||
                   searchTerm.toLowerCase().includes('arxiv') ||
                   searchTerm.toLowerCase().includes('review') ||
                   /^(under\s+review|arxiv|preprint)$/i.test(searchTerm.trim());
    
    // For specific field searches, use more targeted approach
    if (isYear) {
      return preciseMatch(content.year, searchTerm);
    }
    
    if (isVenue) {
      return preciseMatch(content.venue, searchTerm);
    }
    
    // Check each field with different priority
    const fields = [
      { name: 'categories', content: content.categories, weight: 3 },
      { name: 'title', content: content.title, weight: 2.5 },
      { name: 'authors', content: content.authors, weight: 2 },
      { name: 'venue', content: content.venue, weight: 1.5 },
      { name: 'year', content: content.year, weight: 1.5 },
      { name: 'abstract', content: content.abstract, weight: 1 }
    ];

    let totalScore = 0;
    let maxScore = 0;
    let matchedFields = [];

    for (const field of fields) {
      maxScore += field.weight;
      
      if (preciseMatch(field.content, normalizedSearch)) {
        totalScore += field.weight;
        matchedFields.push(field.name);
      }
    }

    const matchScore = totalScore / maxScore;
    // Use lower threshold for better recall
    const passes = matchScore > 0.1; 
    
    console.log(`🔍 Search "${searchTerm}" in:`, {
      year: content.year,
      venue: content.venue,
      authors: content.authors.substring(0, 50) + '...',
      matchedFields,
      score: matchScore.toFixed(3),
      passes,
      isYear,
      isVenue
    });
    
    return passes;
  };

  // Enhanced filter function with better logging
  const filterItems = (searchTerm) => {
    // Remove unloaded class from all elements first
    document.querySelectorAll(".bibliography, .unloaded").forEach((element) => element.classList.remove("unloaded"));

    if (!searchTerm || searchTerm.trim().length === 0) {
      return;
    }

    const normalizedSearchTerm = normalizeText(searchTerm);
    let totalPapers = 0;
    let hiddenPapers = 0;
    let matchedPapers = 0;
    
    console.log(`🔍 Starting search for: "${searchTerm}"`);
    
    // Search through all bibliography items
    document.querySelectorAll(".bibliography > li").forEach((element, index) => {
      totalPapers++;
      const content = extractSearchableContent(element);
      
      const matches = searchInContent(content, searchTerm);
      
      if (!matches) {
        element.classList.add("unloaded");
        hiddenPapers++;
      } else {
        matchedPapers++;
      }
    });

    console.log(`📊 Search results: ${matchedPapers}/${totalPapers} papers matched, ${hiddenPapers} hidden`);

    // Use the original highlighting if available
    if (CSS.highlights) {
      const nonMatchingElements = highlightSearchTerm({ 
        search: searchTerm, 
        selector: ".bibliography > li:not(.unloaded)" 
      });
    }

    // Hide year headers if no publications are visible in that year
    document.querySelectorAll("h2.bibliography").forEach(function (element) {
      let iterator = element.nextElementSibling;
      let hideFirstGroupingElement = true;
      
      while (iterator && iterator.tagName !== "H2") {
        if (iterator.tagName === "OL") {
          const ol = iterator;
          const unloadedSiblings = ol.querySelectorAll(":scope > li.unloaded");
          const totalSiblings = ol.querySelectorAll(":scope > li");

          if (unloadedSiblings.length === totalSiblings.length) {
            ol.previousElementSibling?.classList.add("unloaded");
            ol.classList.add("unloaded");
          } else {
            hideFirstGroupingElement = false;
          }
        }
        iterator = iterator.nextElementSibling;
      }
      
      if (hideFirstGroupingElement) {
        element.classList.add("unloaded");
      }
    });
  };

  const updateInputField = () => {
    const hashValue = decodeURIComponent(window.location.hash.substring(1));
    const searchInput = document.getElementById("bibsearch");
    if (searchInput) {
      // Handle category= prefix from about page category links
      let searchTerm = hashValue;
      if (hashValue.startsWith('category=')) {
        searchTerm = hashValue.replace('category=', '');
      }
      
      searchInput.value = searchTerm;
      filterItems(searchTerm);
    }
  };

  // Enhanced input handling with better debouncing
  let timeoutId;
  const searchInput = document.getElementById("bibsearch");
  if (searchInput) {
    // Add placeholder with better description
    searchInput.placeholder = "Search papers by title, author, category, venue, or keywords...";
    
    searchInput.addEventListener("input", function () {
      clearTimeout(timeoutId);
      const searchTerm = this.value;
      
      // Update URL hash
      if (searchTerm.trim().length > 0) {
        history.replaceState(null, null, `#${encodeURIComponent(searchTerm)}`);
      } else {
        history.replaceState(null, null, window.location.pathname);
      }
      
      timeoutId = setTimeout(() => filterItems(searchTerm), 200);
    });

    // Add search shortcuts
    searchInput.addEventListener("keydown", function(e) {
      if (e.key === 'Escape') {
        this.value = '';
        filterItems('');
        history.replaceState(null, null, window.location.pathname);
      }
    });
  }

  window.addEventListener("hashchange", updateInputField);
  updateInputField();
});
