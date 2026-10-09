document.addEventListener('DOMContentLoaded', function() {

    var form = document.getElementById('publish-form');
    var titleInput = document.getElementById('post-title');
    var authorInput = document.getElementById('post-author');
    var categorySelect = document.getElementById('post-category');
    var excerptInput = document.getElementById('post-excerpt');
    var imageInput = document.getElementById('post-image');
    var contentEditor = document.getElementById('content-editor');
    var errorBox = document.getElementById('publish-error');
    var wordCountEl = document.getElementById('word-count');
    var previewBody = document.getElementById('preview-body');
    var previewSection = document.getElementById('content-preview');
    var previewToggleBtn = document.getElementById('preview-toggle-btn');
    var cancelEditBtn = document.getElementById('cancel-edit-btn');
    var editingIdInput = document.getElementById('editing-id');
    var editorHeading = document.getElementById('editor-heading');
    var submitBtn = document.getElementById('submit-btn');
    var imagePreviewWrap = document.getElementById('image-preview-wrap');
    var imagePreviewEl = document.getElementById('image-preview');

    var PUBLISH_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>';
    var SAVE_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>';
    var EYE_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    var EYE_OFF_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

    renderManageList();
    checkUrlForEdit();

    contentEditor.addEventListener('input', onContentChange);

    imageInput.addEventListener('input', function() {
        var url = imageInput.value.trim();
        if (url) {
            imagePreviewEl.src = url;
            imagePreviewWrap.style.display = 'block';
            imagePreviewEl.onerror = function() {
                imagePreviewWrap.style.display = 'none';
            };
        } else {
            imagePreviewWrap.style.display = 'none';
        }
    });

    previewToggleBtn.addEventListener('click', function() {
        var isVisible = !previewSection.hidden;
        previewSection.hidden = isVisible;
        if (isVisible) {
            previewToggleBtn.innerHTML = EYE_SVG + ' Preview';
        } else {
            previewBody.innerHTML = contentEditor.value;
            previewToggleBtn.innerHTML = EYE_OFF_SVG + ' Close Preview';
        }
    });

    document.querySelectorAll('.toolbar-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            handleToolbarClick(btn);
            onContentChange();
        });
    });

    cancelEditBtn.addEventListener('click', resetForm);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSubmit();
    });


    function onContentChange() {
        var words = contentEditor.value.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
        wordCountEl.textContent = words;
        if (!previewSection.hidden) {
            previewBody.innerHTML = contentEditor.value;
        }
    }

    function handleToolbarClick(btn) {
        var cmd = btn.getAttribute('data-cmd');
        var insert = btn.getAttribute('data-insert');

        if (cmd === 'bold') {
            wrapSelection('<strong>', '</strong>');
        } else if (cmd === 'italic') {
            wrapSelection('<em>', '</em>');
        } else if (insert === 'h2') {
            insertAtCursor('\n<h2>Heading</h2>\n');
        } else if (insert === 'h3') {
            insertAtCursor('\n<h3>Subheading</h3>\n');
        } else if (insert === 'p') {
            insertAtCursor('\n<p>Paragraph text here.</p>\n');
        } else if (insert === 'ul') {
            insertAtCursor('\n<ul>\n    <li>First item</li>\n    <li>Second item</li>\n</ul>\n');
        } else if (insert === 'ol') {
            insertAtCursor('\n<ol>\n    <li>First item</li>\n    <li>Second item</li>\n</ol>\n');
        } else if (insert === 'blockquote') {
            insertAtCursor('\n<blockquote>Your quote here.</blockquote>\n');
        } else if (insert === 'code') {
            insertAtCursor('\n<pre><code>// your code here\n</code></pre>\n');
        }
    }

    function wrapSelection(before, after) {
        var start = contentEditor.selectionStart;
        var end = contentEditor.selectionEnd;
        var selected = contentEditor.value.slice(start, end);
        var replacement = selected ? before + selected + after : before + 'text' + after;
        contentEditor.setRangeText(replacement, start, end, 'end');
        contentEditor.focus();
    }

    function insertAtCursor(text) {
        var start = contentEditor.selectionStart;
        contentEditor.setRangeText(text, start, start, 'end');
        contentEditor.focus();
    }

    function handleSubmit() {
        var title = titleInput.value.trim();
        var author = authorInput.value.trim();
        var category = categorySelect.value;
        var excerpt = excerptInput.value.trim();
        var image = imageInput.value.trim();
        var content = contentEditor.value.trim();

        errorBox.hidden = true;
        errorBox.innerHTML = '';

        var errors = [];
        if (!title) errors.push('Title is required.');
        if (!author) errors.push('Author name is required.');
        if (!category) errors.push('Please select a category.');
        if (!excerpt) errors.push('Short description is required.');
        if (!content) errors.push('Article content is required.');
        else if (content.replace(/<[^>]+>/g, '').trim().length < 50) {
            errors.push('Article content is too short (minimum 50 characters of text).');
        }

        if (errors.length) {
            errorBox.innerHTML = errors.join('<br>');
            errorBox.hidden = false;
            return;
        }

        var userPosts = loadUserPosts();
        var editingId = editingIdInput.value ? parseInt(editingIdInput.value) : null;
        var today = new Date();
        var dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        if (editingId) {
            var idx = userPosts.findIndex(function(p) { return p.id === editingId; });
            if (idx !== -1) {
                userPosts[idx].title = title;
                userPosts[idx].author = author;
                userPosts[idx].category = category;
                userPosts[idx].excerpt = excerpt;
                userPosts[idx].image = image || 'images/post-1.jpg';
                userPosts[idx].content = content;
                userPosts[idx].readingTime = estimateReadingTime(content);
            }
            saveUserPosts(userPosts);
            showToast('Article updated.');
        } else {
            var newPost = {
                id: generatePostId(),
                title: title,
                category: category,
                author: author,
                date: dateStr,
                readingTime: estimateReadingTime(content),
                image: image || 'images/post-1.jpg',
                excerpt: excerpt,
                featured: false,
                popular: false,
                content: content
            };
            userPosts.push(newPost);
            saveUserPosts(userPosts);
            showToast('Article published!', 'success');
        }

        resetForm();
        renderManageList();
    }

    function resetForm() {
        form.reset();
        editingIdInput.value = '';
        editorHeading.textContent = 'New Article';
        submitBtn.innerHTML = PUBLISH_SVG + ' Publish Article';
        cancelEditBtn.hidden = true;
        previewSection.hidden = true;
        previewToggleBtn.innerHTML = EYE_SVG + ' Preview';
        wordCountEl.textContent = '0';
        imagePreviewWrap.style.display = 'none';
        errorBox.hidden = true;
        errorBox.innerHTML = '';
    }

    function renderManageList() {
        var list = document.getElementById('manage-list');
        var userPosts = loadUserPosts();

        if (!userPosts.length) {
            list.innerHTML = '<p class="manage-empty">No published articles yet.</p>';
            return;
        }

        list.innerHTML = userPosts.slice().reverse().map(function(post) {
            return '<div class="manage-item">' +
                '<div class="manage-item-info">' +
                    '<a href="article.html?id=' + post.id + '" class="manage-item-title" title="' + post.title + '">' + post.title + '</a>' +
                    '<div class="manage-item-meta">' + post.category + ' &bull; ' + post.date + '</div>' +
                '</div>' +
                '<div class="manage-item-actions">' +
                    '<button class="edit-btn" data-id="' + post.id + '" aria-label="Edit ' + post.title + '">Edit</button>' +
                    '<button class="delete-btn" data-id="' + post.id + '" aria-label="Delete ' + post.title + '">Delete</button>' +
                '</div>' +
            '</div>';
        }).join('');

        list.querySelectorAll('.edit-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                loadForEdit(parseInt(btn.getAttribute('data-id')));
            });
        });

        list.querySelectorAll('.delete-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var id = parseInt(btn.getAttribute('data-id'));
                if (confirm('Delete this article? This cannot be undone.')) {
                    deleteUserPost(id);
                    showToast('Article deleted.');
                    if (editingIdInput.value && parseInt(editingIdInput.value) === id) {
                        resetForm();
                    }
                    renderManageList();
                }
            });
        });
    }

    function loadForEdit(id) {
        var userPosts = loadUserPosts();
        var post = userPosts.find(function(p) { return p.id === id; });
        if (!post) return;

        titleInput.value = post.title;
        authorInput.value = post.author;
        categorySelect.value = post.category;
        excerptInput.value = post.excerpt;
        imageInput.value = post.image && !post.image.startsWith('images/') ? post.image : '';
        contentEditor.value = post.content;
        editingIdInput.value = post.id;
        editorHeading.textContent = 'Edit Article';
        submitBtn.innerHTML = SAVE_SVG + ' Save Changes';
        cancelEditBtn.hidden = false;

        var words = post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
        wordCountEl.textContent = words;

        imagePreviewWrap.style.display = 'none';

        document.getElementById('editor-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function checkUrlForEdit() {
        var params = new URLSearchParams(window.location.search);
        var editParam = params.get('edit');
        if (editParam) {
            var id = parseInt(editParam);
            if (!isNaN(id)) {
                loadForEdit(id);
            }
        }
    }

});
