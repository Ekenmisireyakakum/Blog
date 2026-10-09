document.addEventListener('DOMContentLoaded', function() {

    var params = new URLSearchParams(window.location.search);
    var id = parseInt(params.get('id'));
    var post = getPostById(id);

    if (!post) {
        showNotFound();
        return;
    }

    renderArticle(post);
    initLike(post.id);
    initBookmark(post.id);
    initShare(post);
    initComments(post.id);
    updateRecentNav(post.id);
    initUserPostControls(post.id);
    initBreadcrumb();

});

function showNotFound() {
    var main = document.querySelector('main');
    if (!main) return;
    main.innerHTML =
        '<div class="not-found-box">' +
            '<h1>Article Not Found</h1>' +
            '<p>This article does not exist or may have been removed.</p>' +
            '<a href="index.html" class="btn btn-primary">Back to Home</a>' +
        '</div>';
}

function renderArticle(post) {
    document.title = post.title + ' — Tanova Blog';

    var titleEl = document.getElementById('article-title');
    var categoryEl = document.getElementById('article-category');
    var descEl = document.getElementById('article-desc');
    var authorEl = document.getElementById('article-author');
    var dateEl = document.getElementById('article-date');
    var readingEl = document.getElementById('article-reading');
    var imageEl = document.getElementById('article-image');
    var contentEl = document.getElementById('article-content');

    if (titleEl) titleEl.textContent = post.title;
    if (categoryEl) categoryEl.textContent = post.category;
    if (descEl) descEl.textContent = post.excerpt;
    if (authorEl) authorEl.textContent = post.author;
    if (dateEl) dateEl.textContent = post.date;
    if (readingEl) readingEl.textContent = post.readingTime;
    if (imageEl) {
        imageEl.src = post.image;
        imageEl.alt = post.title;
    }
    if (contentEl) contentEl.innerHTML = post.content;
}


function initLike(postId) {
    var btn = document.getElementById('like-btn');
    if (!btn) return;

    var likes = storageGet('tanovaLikes') || [];
    var isLiked = likes.indexOf(postId) !== -1;
    updateLikeBtn(btn, isLiked);

    btn.addEventListener('click', function() {
        var current = storageGet('tanovaLikes') || [];
        var idx = current.indexOf(postId);

        if (idx !== -1) {
            current.splice(idx, 1);
            updateLikeBtn(btn, false);
            showToast('Like removed.');
        } else {
            current.push(postId);
            updateLikeBtn(btn, true);
            showToast('You liked this article!');
        }

        storageSet('tanovaLikes', current);
    });
}

function updateLikeBtn(btn, liked) {
    btn.classList.toggle('liked', liked);
    btn.setAttribute('aria-pressed', liked);
    btn.innerHTML = liked
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Liked'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Like';
}


function initBookmark(postId) {
    var btn = document.getElementById('save-btn');
    if (!btn) return;

    var bookmarks = storageGet('tanovaBookmarks') || [];
    var isSaved = bookmarks.indexOf(postId) !== -1;
    updateSaveBtn(btn, isSaved);

    btn.addEventListener('click', function() {
        var current = storageGet('tanovaBookmarks') || [];
        var idx = current.indexOf(postId);

        if (idx !== -1) {
            current.splice(idx, 1);
            updateSaveBtn(btn, false);
            showToast('Article removed from bookmarks.');
        } else {
            current.push(postId);
            updateSaveBtn(btn, true);
            showToast('Article saved to bookmarks.');
        }

        storageSet('tanovaBookmarks', current);
    });
}

function updateSaveBtn(btn, saved) {
    btn.classList.toggle('saved', saved);
    btn.setAttribute('aria-pressed', saved);
    btn.textContent = saved ? 'Saved' : 'Save Article';
}


function initShare(post) {
    var shareBtn = document.getElementById('share-btn');
    var shareMenu = document.getElementById('share-menu');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href
            }).catch(function() {});
            return;
        }
        shareMenu.hidden = !shareMenu.hidden;
    });

    var copyBtn = document.getElementById('copy-link-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(window.location.href).then(function() {
                showToast('Link copied to clipboard!');
            }).catch(function() {
                showToast('Could not copy link.', 'error');
            });
            shareMenu.hidden = true;
        });
    }

    var whatsappBtn = document.getElementById('share-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(post.title + ' ' + window.location.href);
    }

    var facebookBtn = document.getElementById('share-facebook');
    if (facebookBtn) {
        facebookBtn.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
    }

    var twitterBtn = document.getElementById('share-twitter');
    if (twitterBtn) {
        twitterBtn.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(post.title) + '&url=' + encodeURIComponent(window.location.href);
    }

    document.addEventListener('click', function(e) {
        if (!shareBtn.contains(e.target) && !shareMenu.contains(e.target)) {
            shareMenu.hidden = true;
        }
    });
}


function initComments(postId) {
    var form = document.getElementById('comment-form');
    var list = document.getElementById('comments-list');
    if (!form || !list) return;

    renderComments(postId, list);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var nameInput = form.querySelector('#commenter-name');
        var textInput = form.querySelector('#commenter-text');
        var name = nameInput.value.trim();
        var text = textInput.value.trim();
        var errorEl = form.querySelector('.comment-error');

        if (errorEl) errorEl.hidden = true;

        if (!name || !text) {
            if (errorEl) {
                errorEl.textContent = 'Please fill in your name and comment.';
                errorEl.hidden = false;
            }
            return;
        }

        var allComments = storageGet('tanovaComments') || {};
        if (!allComments[postId]) allComments[postId] = [];

        allComments[postId].unshift({
            name: name,
            text: text,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        });

        storageSet('tanovaComments', allComments);
        nameInput.value = '';
        textInput.value = '';
        renderComments(postId, list);
        showToast('Comment added.');
    });
}

function renderComments(postId, container) {
    var allComments = storageGet('tanovaComments') || {};
    var comments = allComments[postId] || [];
    var countEl = document.getElementById('comments-count');

    if (countEl) countEl.textContent = comments.length;

    if (!comments.length) {
        container.innerHTML = '<p class="no-comments">No comments yet. Be the first to share your thoughts.</p>';
        return;
    }

    container.innerHTML = comments.map(function(c) {
        return '<div class="comment">' +
            '<div class="comment-header">' +
                '<span class="comment-author">' + escapeHtml(c.name) + '</span>' +
                '<span class="comment-date">' + c.date + '</span>' +
            '</div>' +
            '<p class="comment-text">' + escapeHtml(c.text) + '</p>' +
        '</div>';
    }).join('');
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


function updateRecentNav(currentId) {
    var recentSection = document.querySelector('.recent-nav');
    if (!recentSection) return;

    var others = posts.filter(function(p) { return p.id !== currentId; }).slice(0, 3);

    recentSection.innerHTML = '<h3>More Articles</h3>' +
        '<ul>' +
        others.map(function(p) {
            return '<li><a href="article.html?id=' + p.id + '">' +
                '<span class="recent-nav-category">' + p.category + '</span>' +
                '<span class="recent-nav-title">' + p.title + '</span>' +
            '</a></li>';
        }).join('') +
        '</ul>';
}


function initUserPostControls(postId) {
    var userPosts = loadUserPosts();
    var isUserPost = userPosts.some(function(p) { return p.id === postId; });
    if (!isUserPost) return;

    var actionsBar = document.querySelector('.article-actions');
    if (!actionsBar) return;

    var editBtn = document.createElement('a');
    editBtn.href = 'publish.html?edit=' + postId;
    editBtn.className = 'btn btn-outline btn-sm';
    editBtn.style.marginLeft = 'auto';
    editBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit';

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-outline btn-sm';
    deleteBtn.style.color = '#DC2626';
    deleteBtn.style.borderColor = '#DC2626';
    deleteBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg> Delete';
    deleteBtn.setAttribute('aria-label', 'Delete this article');

    deleteBtn.addEventListener('click', function() {
        if (confirm('Delete this article permanently? This cannot be undone.')) {
            deleteUserPost(postId);
            showToast('Article deleted.');
            setTimeout(function() { window.location.href = 'index.html'; }, 1200);
        }
    });

    var shareWrap = actionsBar.querySelector('.share-wrap');
    if (shareWrap) {
        shareWrap.style.marginLeft = '0';
        actionsBar.insertBefore(editBtn, shareWrap);
        actionsBar.insertBefore(deleteBtn, shareWrap);
        shareWrap.style.marginLeft = 'auto';
    } else {
        actionsBar.appendChild(editBtn);
        actionsBar.appendChild(deleteBtn);
    }
}

function initBreadcrumb() {
    var crumb = document.getElementById('article-category-crumb');
    var catBadge = document.getElementById('article-category');
    if (!crumb || !catBadge) return;

    var observer = new MutationObserver(function() {
        crumb.textContent = catBadge.textContent || 'Article';
    });
    observer.observe(catBadge, { childList: true, characterData: true, subtree: true });
}
