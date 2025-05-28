module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  safelist: [
    // Category badges and related classes
    'badge-category',
    'clickable-tag',
    // Timeline sidebar classes
    'page-sidebar',
    'timeline-container',
    'sidebar-nav',
    // Other dynamic classes
    /^badge-/,
    /^btn-/,
    /^category-/,
    /^selected-/
  ]
};
