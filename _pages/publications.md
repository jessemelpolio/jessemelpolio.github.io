---
layout: page
permalink: /publications/
title: Publications
description: Publications organized by research categories in reverse chronological order.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Enhanced Bibsearch Feature -->
{% include bib_search.liquid %}

<div class="publications">

<p>My research spans several key areas in computer vision and machine learning, with a focus on developing practical and efficient solutions for real-world applications. Below are my publications organized by research category:</p>

<!-- Category Filter Expansion for All Publications -->
<div class="category-expansion">
  <div class="category-expansion-header" onclick="togglePublicationsCategoryExpansion()">
    <span>🔍 Filter by Research Category</span>
    <i class="fas fa-chevron-down" id="publications-category-chevron" style="transform: rotate(180deg);"></i>
  </div>
  <div class="category-expansion-content expanded" id="publications-category-expansion-content">
    <div class="category-buttons-container">
      <button class="category-filter-btn active" onclick="filterPublicationsByCategory('all')" data-category="all">
        All Categories
      </button>
      <button class="category-filter-btn" onclick="filterPublicationsByCategory('Multimodal Learning')" data-category="Multimodal Learning">
        Multimodal Learning
      </button>
      <button class="category-filter-btn" onclick="filterPublicationsByCategory('Continual Learning')" data-category="Continual Learning">
        Continual Learning
      </button>
      <button class="category-filter-btn" onclick="filterPublicationsByCategory('Image Generation')" data-category="Image Generation">
        Image Generation
      </button>
      <button class="category-filter-btn" onclick="filterPublicationsByCategory('Detection/Segmentation')" data-category="Object Detection/Segmentation">
        Detection/Segmentation
      </button>
    </div>
  </div>
</div>

<!-- Publications grouped by year automatically via Jekyll Scholar -->
<div class="all-publications-list">
  {% bibliography --group_by year %}
</div>

</div>

<style>
/* Category expansion styling for publications page */
.category-expansion {
  background: rgba(var(--global-theme-color-rgb), 0.02);
  border: 1px solid rgba(var(--global-theme-color-rgb), 0.1);
  border-radius: 12px;
  margin-bottom: 2rem;
  overflow: hidden;
}

.category-expansion-header {
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(var(--global-theme-color-rgb), 0.05);
  border-bottom: 1px solid rgba(var(--global-theme-color-rgb), 0.1);
  font-weight: 600;
  color: var(--global-theme-color);
  transition: all 0.2s ease;
}

.category-expansion-header:hover {
  background: rgba(var(--global-theme-color-rgb), 0.08);
}

.category-expansion-content {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  padding: 0 20px;
}

.category-expansion-content.expanded {
  max-height: 200px;
  padding: 15px 20px;
}

.category-buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
}

.category-filter-btn {
  background: rgba(var(--global-theme-color-rgb), 0.1);
  color: var(--global-theme-color);
  border: 1px solid rgba(var(--global-theme-color-rgb), 0.3);
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 0.9em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.category-filter-btn:hover {
  background: rgba(var(--global-theme-color-rgb), 0.2);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--global-theme-color-rgb), 0.2);
}

.category-filter-btn.active {
  background: var(--global-theme-color);
  color: white;
  border-color: var(--global-theme-color);
  box-shadow: 0 2px 12px rgba(var(--global-theme-color-rgb), 0.3);
}

/* Enhanced styling for all publications images */
.publications .abbr {
  display: flex;
  flex-direction: column;
  height: 100%;
  
  .preview-container {
    width: 100%;
    margin-bottom: 1rem;
    
    img {
      width: 100%;
      height: auto;
      max-height: 250px; /* Consistent with selected papers */
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s ease;
    }
    
    img:hover {
      transform: scale(1.02); /* Subtle hover effect */
    }
  }
}

.publications .teaser {
  .preview-container {
    width: 100%;
    margin-bottom: 1rem;
    
    img {
      width: 100%;
      height: auto;
      max-height: 250px; /* Consistent sizing */
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
}

/* Enhanced year header styling */
.publications h2.bibliography {
  color: var(--global-theme-color);
  border-bottom: 3px solid var(--global-theme-color);
  padding-bottom: 0.75rem;
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-weight: 700;
  font-size: 2.5rem;
  position: relative;
  text-align: center;
}

.publications h2.bibliography:first-child {
  margin-top: 1.5rem;
}

.publications h2.bibliography::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--global-theme-color), transparent);
  border-radius: 2px;
}

/* Enhanced publication entry styling */
.all-publications-list .row {
  margin-bottom: 2.5rem !important;
  padding: 1.5rem;
  background: rgba(var(--global-bg-color), 0.8);
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--global-theme-color-rgb), 0.1);
}

.all-publications-list .row:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-color: rgba(var(--global-theme-color-rgb), 0.2);
}

/* Selected publication highlight */
.all-publications-list .row.selected-publication {
  border-left: 4px solid var(--global-theme-color);
  background: rgba(var(--global-theme-color-rgb), 0.02);
}

/* Abstract styling improvements */
.abstract-container {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(var(--global-theme-color-rgb), 0.02);
  border-left: 3px solid rgba(var(--global-theme-color-rgb), 0.3);
  border-radius: 0 8px 8px 0;
}

/* Category tag enhancements */
.category-tags {
  margin: 0.75rem 0;
}

.badge.badge-category {
  background-color: rgba(var(--global-theme-color-rgb), 0.1) !important;
  color: var(--global-theme-color) !important;
  border: 1px solid rgba(var(--global-theme-color-rgb), 0.3) !important;
  margin: 2px !important;
  font-size: 0.75em !important;
  padding: 3px 6px !important;
  border-radius: 10px !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  display: inline-block !important;
  text-decoration: none !important;
}

.badge.badge-category:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--global-theme-color-rgb), 0.3);
  background-color: rgba(var(--global-theme-color-rgb), 0.2) !important;
  color: var(--global-theme-color) !important;
}

/* Custom styling for category headers */
.publications h3.bibliography {
  color: var(--global-text-color);
  border-bottom: 1px solid var(--global-divider-color);
  padding-bottom: 0.3rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

/* Add some spacing between category sections */
.bibliography > ol > li:first-child {
  margin-top: 0;
}

/* Style the publication entries within categories */
.bibliography ol {
  padding-left: 0;
}

.bibliography ol ol {
  padding-left: 1.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .category-expansion-header {
    padding: 12px 15px;
    font-size: 0.9em;
  }
  
  .category-expansion-content.expanded {
    padding: 12px 15px;
  }
  
  .category-buttons-container {
    gap: 6px;
  }
  
  .category-filter-btn {
    padding: 6px 12px;
    font-size: 0.85em;
  }
  
  .publications .abbr img,
  .publications .teaser img {
    max-height: 180px !important;
  }
  
  .publications h2.bibliography {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .all-publications-list .row {
    padding: 1rem;
    margin-bottom: 2rem !important;
  }
  
  .abstract-container {
    padding: 0.75rem;
  }
}

/* Joint first author styling */
.joint-first-author {
  position: relative;
  padding: 1px 2px !important;
  background: linear-gradient(135deg, 
    rgba(var(--global-theme-color-rgb), 0.15), 
    rgba(var(--global-theme-color-rgb), 0.08)) !important;
  border-radius: 3px !important;
  transition: all 0.2s ease !important;
}

.joint-first-author:hover {
  background: linear-gradient(135deg, 
    rgba(var(--global-theme-color-rgb), 0.25), 
    rgba(var(--global-theme-color-rgb), 0.15)) !important;
  transform: translateY(-1px) !important;
}

.joint-first-author sup {
  color: var(--global-theme-color) !important;
  font-weight: bold !important;
  font-size: 0.85em !important;
}

/* Dark mode support for joint first author */
html[data-theme="dark"] .joint-first-author {
  background: linear-gradient(135deg, 
    rgba(var(--global-theme-color-rgb), 0.3), 
    rgba(var(--global-theme-color-rgb), 0.15)) !important;
}

/* Accessibility improvements */
.joint-first-author {
  outline: none !important;
}

.joint-first-author:focus {
  outline: 2px solid var(--global-theme-color) !important;
  outline-offset: 2px !important;
}

/* Additional info styling improvements for joint first author */
.additional-info-joint {
  background: rgba(var(--global-theme-color-rgb), 0.05);
  border-left: 3px solid var(--global-theme-color);
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 0 6px 6px 0;
  font-size: 1.1em !important;
  font-weight: bold !important;
  font-style: italic;
  color: var(--global-theme-color);
}
</style>

<script>
function togglePublicationsCategoryExpansion() {
  const content = document.getElementById('publications-category-expansion-content');
  const chevron = document.getElementById('publications-category-chevron');
  
  if (content.classList.contains('expanded')) {
    content.classList.remove('expanded');
    chevron.style.transform = 'rotate(0deg)';
  } else {
    content.classList.add('expanded');
    chevron.style.transform = 'rotate(180deg)';
  }
}

function sortPublicationsYearHeaders() {
  const publications = document.querySelector('.all-publications-list');
  if (!publications) {
    console.log('No publications container found');
    return;
  }
  
  // Get all year headers
  const yearHeaders = publications.querySelectorAll('h2.bibliography');
  console.log('Found year headers:', yearHeaders.length);
  
  if (yearHeaders.length === 0) {
    console.log('No year headers found');
    return;
  }
  
  const elements = [];
  
  yearHeaders.forEach((header, index) => {
    const yearText = header.textContent.trim();
    const year = parseInt(yearText);
    console.log(`Processing year header ${index}: "${yearText}" -> ${year}`);
    
    if (isNaN(year)) {
      console.log(`Skipping invalid year: ${yearText}`);
      return;
    }
    
    const yearContent = [header];
    
    // Collect all elements until the next year header
    let nextElement = header.nextElementSibling;
    while (nextElement && !nextElement.matches('h2.bibliography')) {
      yearContent.push(nextElement);
      nextElement = nextElement.nextElementSibling;
    }
    
    console.log(`Year ${year} has ${yearContent.length} elements`);
    
    elements.push({
      year: year,
      elements: yearContent
    });
  });
  
  console.log('Elements before sorting:', elements.map(e => e.year));
  
  // Sort by year descending (newest first)
  elements.sort((a, b) => {
    console.log(`Comparing ${a.year} vs ${b.year}`);
    return b.year - a.year;
  });
  
  console.log('Elements after sorting:', elements.map(e => e.year));
  
  // Create a temporary container to hold sorted elements
  const tempContainer = document.createElement('div');
  
  // Move all elements to temp container in sorted order
  elements.forEach((item, index) => {
    console.log(`Appending year ${item.year} at position ${index}`);
    item.elements.forEach(el => {
      tempContainer.appendChild(el);
    });
  });
  
  // Move all elements back to the publications container
  while (tempContainer.firstChild) {
    publications.appendChild(tempContainer.firstChild);
  }
  
  console.log('Publications year sorting completed');
}

function filterPublicationsByCategory(category) {
  console.log(`🔍 FILTERING: Starting filter for category: "${category}"`);
  
  // Update URL hash (but don't trigger hashchange event)
  const newHash = category === 'all' ? '' : '#category=' + encodeURIComponent(category);
  if (window.location.hash !== newHash) {
    history.replaceState(null, null, newHash === '' ? window.location.pathname : window.location.pathname + newHash);
  }
  
  // Update active button
  document.querySelectorAll('.category-filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Find the correct button by data-category attribute
  const activeButton = document.querySelector(`[data-category="${category}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
    console.log(`✅ FILTERING: Active button set for ${category}`);
  } else {
    console.log(`⚠️ FILTERING: Could not find button for category: ${category}, trying to find by text content`);
    
    // Fallback: try to find button by text content
    const buttons = document.querySelectorAll('.category-filter-btn');
    buttons.forEach(btn => {
      if (btn.textContent.trim() === category || 
          (category === 'all' && btn.textContent.trim() === 'All Categories')) {
        btn.classList.add('active');
        console.log(`✅ FILTERING: Active button set via text match for ${category}`);
      }
    });
  }
  
  // Get all publication list items - be very specific
  const publications = document.querySelectorAll('.all-publications-list ol.bibliography > li');
  const yearHeaders = document.querySelectorAll('.all-publications-list h2.bibliography');
  
  console.log(`📊 FILTERING: Found ${publications.length} publications and ${yearHeaders.length} year headers`);
  
  if (publications.length === 0) {
    console.error('❌ FILTERING: No publications found! Check selector.');
    return;
  }
  
  // Track which years have visible publications
  const visibleYears = new Set();
  
  publications.forEach((publicationItem, index) => {
    const publicationId = publicationItem.id || `publication-${index}`;
    console.log(`🔍 FILTERING: Processing publication ${index} (${publicationId})`);
    
    if (category === 'all') {
      publicationItem.style.display = 'list-item';
      console.log(`✅ FILTERING: Showing publication ${index} (showing all)`);
      
      // Find the year for this publication
      const yearHeader = findYearHeaderForPublicationElement(publicationItem);
      if (yearHeader) {
        const year = yearHeader.textContent.trim();
        visibleYears.add(year);
      }
    } else {
      // Look for category tags in the publication item
      const categoryTags = publicationItem.querySelectorAll('[data-category]');
      console.log(`🏷️ FILTERING: Publication ${index}: Found ${categoryTags.length} category tags`);
      
      let hasCategory = false;
      
      categoryTags.forEach((tag, tagIndex) => {
        const dataCategory = tag.getAttribute('data-category');
        const tagText = tag.textContent.trim();
        console.log(`   📝 Tag ${tagIndex}: data-category="${dataCategory}", text="${tagText}"`);
        
        if (dataCategory === category || tagText === category) {
          hasCategory = true;
          console.log(`   ✅ FILTERING: MATCH found for category: ${category}`);
        }
      });
      
      if (hasCategory) {
        publicationItem.style.display = 'list-item';
        console.log(`✅ FILTERING: Showing publication ${index} - has category ${category}`);
        
        // Find the year for this publication
        const yearHeader = findYearHeaderForPublicationElement(publicationItem);
        if (yearHeader) {
          const year = yearHeader.textContent.trim();
          visibleYears.add(year);
        }
      } else {
        publicationItem.style.display = 'none';
        console.log(`❌ FILTERING: Hiding publication ${index} - no category ${category}`);
      }
    }
  });
  
  console.log('📅 FILTERING: Visible years:', Array.from(visibleYears));
  
  // Show/hide year headers based on whether they have visible publications
  yearHeaders.forEach(header => {
    const year = header.textContent.trim();
    const shouldShow = visibleYears.has(year);
    header.style.display = shouldShow ? 'block' : 'none';
    console.log(`📅 FILTERING: Year header ${year}: ${shouldShow ? 'visible' : 'hidden'}`);
  });
  
  console.log(`🎯 FILTERING: Completed filtering for category: ${category}`);
}

function findYearHeaderForPublicationElement(element) {
  let currentElement = element.previousElementSibling;
  
  while (currentElement) {
    if (currentElement.tagName === 'H2' && currentElement.classList.contains('bibliography')) {
      return currentElement;
    }
    currentElement = currentElement.previousElementSibling;
  }
  
  return null;
}

// Initialize sorting when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Publications page DOMContentLoaded: Starting initialization...');
  
  // Wait for Jekyll Scholar to finish rendering
  setTimeout(() => {
    console.log('Starting initial publications sort...');
    sortPublicationsYearHeaders();
    
    // Check for category filter in URL hash
    const hash = window.location.hash;
    if (hash && hash.startsWith('#category=')) {
      const category = decodeURIComponent(hash.replace('#category=', ''));
      console.log('Found category in URL hash:', category);
      
      // Apply the filter
      filterPublicationsByCategory(category);
      
      // Scroll to the filter section to show the active filter
      const filterSection = document.querySelector('.category-expansion');
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, 500);
  
  // Also try again after a longer delay in case Jekyll Scholar takes time
  setTimeout(() => {
    console.log('Starting backup publications sort...');
    sortPublicationsYearHeaders();
    
    // Apply URL hash filter again if needed (backup)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#category=')) {
      const category = decodeURIComponent(hash.replace('#category=', ''));
      filterPublicationsByCategory(category);
    }
  }, 2000);
});

// Also try to sort when the window loads
window.addEventListener('load', function() {
  console.log('Publications page window loaded: Starting sort...');
  setTimeout(() => {
    sortPublicationsYearHeaders();
    
    // Apply URL hash filter if needed
    const hash = window.location.hash;
    if (hash && hash.startsWith('#category=')) {
      const category = decodeURIComponent(hash.replace('#category=', ''));
      filterPublicationsByCategory(category);
    }
  }, 100);
});

// Handle hash changes (if user manually changes URL or browser back/forward)
window.addEventListener('hashchange', function() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#category=')) {
    const category = decodeURIComponent(hash.replace('#category=', ''));
    console.log('Hash changed, filtering by category:', category);
    filterPublicationsByCategory(category);
  } else if (hash === '' || hash === '#') {
    // Show all if hash is cleared
    filterPublicationsByCategory('all');
  }
});
</script>
