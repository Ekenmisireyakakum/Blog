document.addEventListener('DOMContentLoaded', function() {

    initMobileMenu();
    initSearch();

    if (document.querySelector('.featured-article')) {
        renderFeaturedArticle();
    }

    if (document.querySelector('.posts-grid')) {
        renderPostsGrid(getAllPosts());
        initCategoryFilter();
        renderPopularPosts();
        renderRecentPosts();
        renderCategories();
    }

    if (document.querySelector('.newsletter-form')) {
        initNewsletter();
    }

    if (document.querySelector('.contact-form')) {
        initContactForm();
    }

    if (document.querySelector('.bookmarks-list')) {
        renderBookmarks();
    }

});


function storageGet(key) {
    try {
        var value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        return null;
    }
}

function storageSet(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
    }
}


function initMobileMenu() {
    var menuBtn = document.getElementById('menu-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function() {
        var isOpen = mobileMenu.classList.contains('open');
        mobileMenu.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', !isOpen);
        menuBtn.innerHTML = isOpen ? hamburgerIcon() : closeIcon();
    });

    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.innerHTML = hamburgerIcon();
        }
    });
}

function hamburgerIcon() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
}

function closeIcon() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
}


function initSearch() {
    var searchBtn = document.getElementById('search-btn');
    var searchOverlay = document.getElementById('search-overlay');
    var searchInput = document.getElementById('search-input');
    var searchClose = document.getElementById('search-close');
    var searchResults = document.getElementById('search-results');

    if (!searchBtn || !searchOverlay) return;

    searchBtn.addEventListener('click', function() {
        searchOverlay.classList.add('open');
        searchInput.focus();
    });

    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) closeSearch();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeSearch();
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var query = searchInput.value;
            if (!query.trim()) {
                searchResults.innerHTML = '';
                return;
            }
            var results = searchPosts(query);
            renderSearchResults(results, searchResults);
        });
    }

    function closeSearch() {
        searchOverlay.classList.remove('open');
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.innerHTML = '';
    }
}

function renderSearchResults(results, container) {
    if (!results.length) {
        container.innerHTML = '<p class="search-empty">No articles found.</p>';
        return;
    }
    var html = results.map(function(post) {
        return '<a href="article.html?id=' + post.id + '" class="search-result-item">' +
            '<span class="search-result-category">' + post.category + '</span>' +
            '<span class="search-result-title">' + post.title + '</span>' +
            '<span class="search-result-meta">' + post.date + ' &bull; ' + post.readingTime + '</span>' +
        '</a>';
    }).join('');
    container.innerHTML = html;
}


function renderFeaturedArticle() {
    var featured = getFeaturedPost();
    var container = document.querySelector('.featured-article');
    if (!container || !featured) return;

    container.innerHTML =
        '<div class="featured-image-wrap">' +
            '<img src="' + featured.image + '" alt="' + featured.title + '" loading="lazy">' +
        '</div>' +
        '<div class="featured-content">' +
            '<span class="category-badge">' + featured.category + '</span>' +
            '<h2>' + featured.title + '</h2>' +
            '<p>' + featured.excerpt + '</p>' +
            '<div class="post-meta">' +
                '<span>' + featured.author + '</span>' +
                '<span>' + featured.date + '</span>' +
                '<span>' + featured.readingTime + '</span>' +
            '</div>' +
            '<a href="article.html?id=' + featured.id + '" class="btn btn-primary">Read Article</a>' +
        '</div>';
}


function renderPostsGrid(postsToRender) {
    var grid = document.getElementById('posts-grid') || document.querySelector('.posts-grid');
    if (!grid) return;

    if (!postsToRender.length) {
        grid.innerHTML = '<p class="no-results">No articles found.</p>';
        return;
    }

    var bookmarks = storageGet('tanovaBookmarks') || [];

    grid.innerHTML = postsToRender.map(function(post) {
        var saved = bookmarks.indexOf(post.id) !== -1;
        return createPostCard(post, saved);
    }).join('');

    grid.querySelectorAll('.bookmark-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var id = parseInt(btn.getAttribute('data-id'));
            toggleBookmark(id, btn);
        });
    });
}

function createPostCard(post, saved) {
    return '<article class="post-card">' +
        '<a href="article.html?id=' + post.id + '" class="post-card-image-link">' +
            '<img src="' + post.image + '" alt="' + post.title + '" loading="lazy">' +
        '</a>' +
        '<div class="post-card-body">' +
            '<span class="category-badge">' + post.category + '</span>' +
            '<h3><a href="article.html?id=' + post.id + '">' + post.title + '</a></h3>' +
            '<p class="post-excerpt">' + post.excerpt + '</p>' +
            '<div class="post-meta">' +
                '<span>' + post.author + '</span>' +
                '<span>' + post.date + '</span>' +
                '<span>' + post.readingTime + '</span>' +
            '</div>' +
            '<div class="post-card-actions">' +
                '<a href="article.html?id=' + post.id + '" class="btn btn-outline btn-sm">Read More</a>' +
                '<button class="bookmark-btn' + (saved ? ' saved' : '') + '" data-id="' + post.id + '" aria-label="' + (saved ? 'Remove bookmark' : 'Bookmark article') + '">' +
                    bookmarkIcon(saved) +
                '</button>' +
            '</div>' +
        '</div>' +
    '</article>';
}

function bookmarkIcon(saved) {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="' + (saved ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>';
}

function toggleBookmark(id, btn) {
    var bookmarks = storageGet('tanovaBookmarks') || [];
    var index = bookmarks.indexOf(id);

    if (index !== -1) {
        bookmarks.splice(index, 1);
        btn.classList.remove('saved');
        btn.setAttribute('aria-label', 'Bookmark article');
        btn.innerHTML = bookmarkIcon(false);
        showToast('Article removed from bookmarks.');
    } else {
        bookmarks.push(id);
        btn.classList.add('saved');
        btn.setAttribute('aria-label', 'Remove bookmark');
        btn.innerHTML = bookmarkIcon(true);
        showToast('Article saved to bookmarks.');
    }

    storageSet('tanovaBookmarks', bookmarks);
}


function initCategoryFilter() {
    var filterBtns = document.querySelectorAll('.category-filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var category = btn.getAttribute('data-category');
            var filtered = category === 'all' ? getAllPosts() : getPostsByCategory(category);
            renderPostsGrid(filtered);
        });
    });
}


function renderPopularPosts() {
    var list = document.getElementById('popular-list');
    if (!list) return;

    var popular = getPopularPosts();
    list.innerHTML = popular.map(function(post, index) {
        var num = (index + 1).toString().padStart(2, '0');
        return '<li>' +
            '<a href="article.html?id=' + post.id + '" class="popular-item">' +
                '<span class="popular-num">' + num + '</span>' +
                '<div class="popular-info">' +
                    '<span class="popular-title">' + post.title + '</span>' +
                    '<span class="popular-meta">' + post.category + ' &bull; ' + post.readingTime + '</span>' +
                '</div>' +
            '</a>' +
        '</li>';
    }).join('');
}


function renderRecentPosts() {
    var list = document.getElementById('recent-list');
    if (!list) return;

    var recent = getAllPosts().slice().sort(function(a, b) { return b.id - a.id; }).slice(0, 5);
    list.innerHTML = recent.map(function(post, index) {
        var num = (index + 1).toString().padStart(2, '0');
        return '<li>' +
            '<a href="article.html?id=' + post.id + '" class="popular-item">' +
                '<span class="popular-num">' + num + '</span>' +
                '<div class="popular-info">' +
                    '<span class="popular-title">' + post.title + '</span>' +
                    '<span class="popular-meta">' + post.category + ' &bull; ' + post.readingTime + '</span>' +
                '</div>' +
            '</a>' +
        '</li>';
    }).join('');
}


function renderCategories() {
    var grid = document.getElementById('categories-grid') || document.querySelector('.categories-grid');
    if (!grid) return;

    var categories = [
        { name: 'Technology', icon: '💻', count: getPostsByCategory('Technology').length },
        { name: 'Web Development', icon: '🌐', count: getPostsByCategory('Web Development').length },
        { name: 'JavaScript', icon: '⚡', count: getPostsByCategory('JavaScript').length },
        { name: 'Education', icon: '📚', count: getPostsByCategory('Education').length },
        { name: 'Lifestyle', icon: '🌿', count: getPostsByCategory('Lifestyle').length },
        { name: 'Personal Growth', icon: '🌱', count: getPostsByCategory('Personal Growth').length }
    ];

    grid.innerHTML = categories.map(function(cat) {
        return '<button class="category-card" data-category="' + cat.name + '" aria-label="Browse ' + cat.name + ' articles">' +
            '<span class="category-icon">' + cat.icon + '</span>' +
            '<span class="category-name">' + cat.name + '</span>' +
            '<span class="category-count">' + cat.count + ' articles</span>' +
        '</button>';
    }).join('');

    grid.querySelectorAll('.category-card').forEach(function(card) {
        card.addEventListener('click', function() {
            var category = card.getAttribute('data-category');
            var postsSection = document.querySelector('.posts-section');
            if (postsSection) {
                postsSection.scrollIntoView({ behavior: 'smooth' });
            }

            var filterBtns = document.querySelectorAll('.category-filter-btn');
            filterBtns.forEach(function(btn) {
                btn.classList.toggle('active', btn.getAttribute('data-category') === category);
            });

            var filtered = getPostsByCategory(category);
            renderPostsGrid(filtered);
        });
    });
}


function initNewsletter() {
    var form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        var email = input.value.trim();

        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address.', 'error');
            return;
        }

        var existing = storageGet('tanovaNewsletter');
        if (existing === email) {
            showToast('This email is already subscribed.', 'info');
            return;
        }

        storageSet('tanovaNewsletter', email);
        form.innerHTML = '<p class="newsletter-success">You\'re subscribed! Thanks for joining.</p>';
        showToast('You\'re successfully subscribed!', 'success');
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function initContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var name = form.querySelector('#name').value.trim();
        var email = form.querySelector('#email').value.trim();
        var subject = form.querySelector('#subject').value.trim();
        var message = form.querySelector('#message').value.trim();
        var errorBox = form.querySelector('.form-error');

        clearErrors(form);

        var errors = [];
        if (!name) errors.push('Name is required.');
        if (!email) errors.push('Email is required.');
        else if (!isValidEmail(email)) errors.push('Please enter a valid email address.');
        if (!subject) errors.push('Subject is required.');
        if (!message) errors.push('Message is required.');
        else if (message.length < 20) errors.push('Message must be at least 20 characters.');

        if (errors.length) {
            errorBox.innerHTML = errors.join('<br>');
            errorBox.hidden = false;
            return;
        }

        var successMsg = form.querySelector('.form-success');
        form.querySelector('.form-fields').hidden = true;
        successMsg.hidden = false;
    });
}

function clearErrors(form) {
    var errorBox = form.querySelector('.form-error');
    if (errorBox) {
        errorBox.innerHTML = '';
        errorBox.hidden = true;
    }
}


function renderBookmarks() {
    var container = document.querySelector('.bookmarks-list');
    if (!container) return;

    var bookmarks = storageGet('tanovaBookmarks') || [];

    if (!bookmarks.length) {
        container.innerHTML = '<div class="bookmarks-empty">' +
            '<p>You haven\'t saved any articles yet.</p>' +
            '<a href="index.html" class="btn btn-primary">Browse Articles</a>' +
        '</div>';
        return;
    }

    var savedPosts = bookmarks.map(function(id) {
        return getPostById(id);
    }).filter(Boolean);

    container.innerHTML = savedPosts.map(function(post) {
        return '<article class="post-card bookmark-entry">' +
            '<a href="article.html?id=' + post.id + '" class="post-card-image-link">' +
                '<img src="' + post.image + '" alt="' + post.title + '" loading="lazy">' +
            '</a>' +
            '<div class="post-card-body">' +
                '<span class="category-badge">' + post.category + '</span>' +
                '<h3><a href="article.html?id=' + post.id + '">' + post.title + '</a></h3>' +
                '<p class="post-excerpt">' + post.excerpt + '</p>' +
                '<div class="post-meta">' +
                    '<span>' + post.author + '</span>' +
                    '<span>' + post.readingTime + '</span>' +
                '</div>' +
                '<div class="post-card-actions">' +
                    '<a href="article.html?id=' + post.id + '" class="btn btn-outline btn-sm">Read Article</a>' +
                    '<button class="remove-bookmark-btn" data-id="' + post.id + '" aria-label="Remove from bookmarks">Remove</button>' +
                '</div>' +
            '</div>' +
        '</article>';
    }).join('');

    container.querySelectorAll('.remove-bookmark-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var id = parseInt(btn.getAttribute('data-id'));
            var updated = (storageGet('tanovaBookmarks') || []).filter(function(b) { return b !== id; });
            storageSet('tanovaBookmarks', updated);
            showToast('Article removed from bookmarks.');
            renderBookmarks();
        });
    });
}


function showToast(message, type) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast' + (type ? ' toast-' + type : '');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(function() {
        toast.classList.add('show');
    });

    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}
