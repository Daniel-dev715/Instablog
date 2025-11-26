/* ==================== DATA STRUCTURES ==================== */
let postsData = [
    {
        id: 1,
        username: "Damian Vado",
        location: "Dubai",
        time: "15 minutes ago",
        profileImg: "./img/13.jpeg",
        postImg: "./img/feed_1.jpeg",
        caption: "Living the family life",
        hashtags: "#VivaLaVidaSzn#",
        likes: 1323,
        likedBy: ["./img/10.jpeg", "./img/4.jpeg", "./img/15.jpeg"],
        comments: 120,
        isLiked: false,
        isBookmarked: false
    },
    {
        id: 2,
        username: "Timmy Terner",
        location: "Johannesburg",
        time: "30 minutes ago",
        profileImg: "./img/14.jpeg",
        postImg: "./img/feed_2.jpeg",
        caption: "NightLife of the town",
        hashtags: "#DettyParty#",
        likes: 913,
        likedBy: ["./img/3.jpeg", "./img/6.jpeg", "./img/12.jpeg"],
        comments: 50,
        isLiked: false,
        isBookmarked: false
    },
    {
        id: 3,
        username: "Kid Cray",
        location: "New York",
        time: "1 hour ago",
        profileImg: "./img/16.jpeg",
        postImg: "./img/feed_3.jpeg",
        caption: "Do you know what time it is?",
        hashtags: "#PaRtY#",
        likes: 2423,
        likedBy: ["./img/2.jpeg", "./img/8.jpeg", "./img/17.jpeg"],
        comments: 2032,
        isLiked: false,
        isBookmarked: false
    },
    {
        id: 4,
        username: "Poe Shurmeda",
        location: "Nairobi",
        time: "45 minutes ago",
        profileImg: "./img/17.jpeg",
        postImg: "./img/feed_4.jpeg",
        caption: "Guess who's the latest graduate?",
        hashtags: "#Classof2025#",
        likes: 3543,
        likedBy: ["./img/1.jpeg", "./img/9.jpeg", "./img/18.jpeg"],
        comments: 1000,
        isLiked: false,
        isBookmarked: false
    },
    {
        id: 5,
        username: "Larry Jackson",
        location: "Monrovia",
        time: "3 minutes ago",
        profileImg: "./img/18.jpeg",
        postImg: "./img/feed_5.jpeg",
        caption: "Slam Dunk",
        hashtags: "#LoveBasketBall#",
        likes: 4323,
        likedBy: ["./img/4.jpeg", "./img/12.jpeg", "./img/20.jpeg"],
        comments: 220,
        isLiked: false,
        isBookmarked: false
    },
    {
        id: 6,
        username: "Micheal Kotley",
        location: "Lome",
        time: "15 minutes ago",
        profileImg: "./img/19.jpeg",
        postImg: "./img/feed_6.jpeg",
        caption: "Big Sis is a graduate",
        hashtags: "#Congratulations#",
        likes: 5000,
        likedBy: ["./img/5.jpeg", "./img/10.jpeg", "./img/15.jpeg"],
        comments: 4000,
        isLiked: false,
        isBookmarked: false
    },
    {
        id: 7,
        username: "Ben Dickson",
        location: "Dubai",
        time: "15 minutes ago",
        profileImg: "./img/20.jpeg",
        postImg: "./img/feed_7.jpeg",
        caption: "A lonely road to the top",
        hashtags: "#NewBeginning#",
        likes: 923,
        likedBy: ["./img/10.jpeg", "./img/4.jpeg", "./img/15.jpeg"],
        comments: 50,
        isLiked: false,
        isBookmarked: false
    }
];

let friendRequests = [
    { id: 1, name: "William Szobo", profileImg: "./img/6.jpeg", mutualFriends: 8 },
    { id: 2, name: "Bel Phina", profileImg: "./img/8.jpeg", mutualFriends: 8 },
    { id: 3, name: "Larry Z", profileImg: "./img/10.jpeg", mutualFriends: 8 },
    { id: 4, name: "Cherry Patton", profileImg: "./img/2.jpeg", mutualFriends: 8 }
];

let currentUser = {
    name: "Danny Styles",
    username: "DannyS",
    profileImg: "./img/mine.jpg"
};

/* ==================== LOGIN PAGE FUNCTIONALITY ==================== */
function initLoginPage() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
            document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
            
            let hasError = false;
            
            if (!email) {
                document.getElementById('login-email-error').textContent = 'Email/Username is required';
                document.getElementById('login-email-error').classList.add('show');
                document.getElementById('login-email').classList.add('error');
                hasError = true;
            }
            
            if (!password) {
                document.getElementById('login-password-error').textContent = 'Password is required';
                document.getElementById('login-password-error').classList.add('show');
                document.getElementById('login-password').classList.add('error');
                hasError = true;
            }
            
            if (hasError) return;
            
            const users = JSON.parse(localStorage.getItem('instablogUsers') || '[]');
            
            const user = users.find(u => 
                (u.email === email || u.username === email) && u.password === password
            );
            
            if (user) {
                const userData = {
                    name: user.fullname,
                    username: user.username,
                    email: user.email,
                    profileImg: user.profileImg || "./img/mine.jpg",
                    rememberMe: rememberMe
                };
                
                localStorage.setItem('currentUser', JSON.stringify(userData));
                showNotification('Login successful! Redirecting...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showNotification('Invalid email/username or password', 'error');
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullname = document.getElementById('register-fullname').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const username = document.getElementById('register-username').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
            document.querySelectorAll('input').forEach(el => el.classList.remove('error'));
            
            let hasError = false;
            
            if (!fullname || fullname.length < 3) {
                document.getElementById('register-fullname-error').textContent = 'Full name must be at least 3 characters';
                document.getElementById('register-fullname-error').classList.add('show');
                document.getElementById('register-fullname').classList.add('error');
                hasError = true;
            }
            
            if (!validateEmail(email)) {
                document.getElementById('register-email-error').textContent = 'Please enter a valid email';
                document.getElementById('register-email-error').classList.add('show');
                document.getElementById('register-email').classList.add('error');
                hasError = true;
            }
            
            if (!username || username.length < 3) {
                document.getElementById('register-username-error').textContent = 'Username must be at least 3 characters';
                document.getElementById('register-username-error').classList.add('show');
                document.getElementById('register-username').classList.add('error');
                hasError = true;
            }
            
            if (password.length < 6) {
                document.getElementById('register-password-error').textContent = 'Password must be at least 6 characters';
                document.getElementById('register-password-error').classList.add('show');
                document.getElementById('register-password').classList.add('error');
                hasError = true;
            }
            
            if (password !== confirmPassword) {
                document.getElementById('register-confirm-error').textContent = 'Passwords do not match';
                document.getElementById('register-confirm-error').classList.add('show');
                document.getElementById('register-confirm-password').classList.add('error');
                hasError = true;
            }
            
            if (hasError) return;
            
            const users = JSON.parse(localStorage.getItem('instablogUsers') || '[]');
            
            if (users.find(u => u.email === email)) {
                showNotification('Email already registered', 'error');
                return;
            }
            
            if (users.find(u => u.username === username)) {
                showNotification('Username already taken', 'error');
                return;
            }
            
            const newUser = {
                id: Date.now(),
                fullname,
                email,
                username,
                password,
                profileImg: "./img/mine.jpg",
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('instablogUsers', JSON.stringify(users));
            
            showNotification('Account created successfully!', 'success');
            
            registerForm.reset();
            
            setTimeout(() => {
                document.querySelector('[data-tab="login"]').click();
            }, 1500);
        });
    }

    (function initializeDemoAccount() {
        const users = JSON.parse(localStorage.getItem('instablogUsers') || '[]');
        const demoExists = users.find(u => u.email === 'demo@instablog.com');
        
        if (!demoExists) {
            users.push({
                id: 1,
                fullname: 'Danny Styles',
                email: 'demo@instablog.com',
                username: 'DannyS',
                password: 'demo123',
                profileImg: './img/mine.jpg',
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('instablogUsers', JSON.stringify(users));
        }
    })();

    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Social login coming soon!', 'error');
        });
    });

    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Password reset feature coming soon!', 'error');
        });
    }
}

/* ==================== UTILITY FUNCTIONS ==================== */
function loadDataFromStorage() {
    const savedPosts = localStorage.getItem('instablogPosts');
    const savedRequests = localStorage.getItem('friendRequests');
    
    if (savedPosts) {
        const parsed = JSON.parse(savedPosts);
        if (parsed.length >= 7) {
            postsData = parsed;
        }
    }
    if (savedRequests) {
        friendRequests = JSON.parse(savedRequests);
    }
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

function saveDataToStorage() {
    localStorage.setItem('instablogPosts', JSON.stringify(postsData));
    localStorage.setItem('friendRequests', JSON.stringify(friendRequests));
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 6rem;
        right: 2rem;
        background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

/* ==================== MAIN APP INITIALIZATION ==================== */
function initMainApp() {
    loadDataFromStorage();
    renderPosts();
    renderFriendRequests();
    
    // Sidebar functionality
    const menuItems = document.querySelectorAll('.menu-item');
    
    const changeActiveItem = () => {
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
    };
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            changeActiveItem();
            item.classList.add('active');
            if (item.id != 'notifications') {
                const notifPopup = document.querySelector('.notifications-popup');
                if (notifPopup) notifPopup.style.display = 'none';
            } else {
                const notifPopup = document.querySelector('.notifications-popup');
                if (notifPopup) notifPopup.style.display = 'block';
                const notifCount = document.querySelector('#notifications .notification-count');
                if (notifCount) notifCount.style.display = 'none';
            }
        });
    });
    
    // Messages search
    const messagesNotification = document.querySelector('#messages-notification');
    const messages = document.querySelector('.messages');
    const messageSearch = document.querySelector('#message-search');
    
    if (messages && messageSearch) {
        const message = messages.querySelectorAll('.message');
        
        const searchMessage = () => {
            const val = messageSearch.value.toLowerCase();
            message.forEach(chat => {
                let nameElement = chat.querySelector('h5');
                let name = nameElement ? nameElement.textContent.toLowerCase() : '';
                if (name.indexOf(val) != -1) {
                    chat.style.display = 'flex';
                } else {
                    chat.style.display = 'none';
                }
            });
        };
        
        messageSearch.addEventListener('keyup', searchMessage);
    }
    
    if (messagesNotification) {
        messagesNotification.addEventListener('click', () => {
            if (messages) {
                messages.style.boxShadow = '0 0 1rem var(--color-primary)';
                const notifCount = messagesNotification.querySelector('.notification-count');
                if (notifCount) notifCount.style.display = 'none';
                setTimeout(() => {
                    messages.style.boxShadow = 'none';
                }, 2000);
            }
        });
    }
    
    // Theme customization
    const theme = document.querySelector('#theme');
    const themeModal = document.querySelector('.customize-theme');
    
    if (theme && themeModal) {
        const fontSizes = document.querySelectorAll('.choose-size span');
        var root = document.querySelector(':root');
        const colorPalette = document.querySelectorAll('.choose-color span');
        const Bg1 = document.querySelector('.bg-1');
        const Bg2 = document.querySelector('.bg-2');
        const Bg3 = document.querySelector('.bg-3');
        
        const openThemeModal = () => {
            themeModal.style.display = 'grid';
        };
        
        const closeThemeModal = (e) => {
            if (e.target.classList.contains('customize-theme')) {
                themeModal.style.display = 'none';
            }
        };
        
        themeModal.addEventListener('click', closeThemeModal);
        theme.addEventListener('click', openThemeModal);
        
        const removeSizeSelector = () => {
            fontSizes.forEach(size => {
                size.classList.remove('active');
            });
        };
        
        fontSizes.forEach(size => {
            size.addEventListener('click', () => {
                removeSizeSelector();
                let fontSize;
                size.classList.toggle('active');
                
                if (size.classList.contains('font-size-1')) {
                    fontSize = '10px';
                    root.style.setProperty('--sticky-top-left', '5.4rem');
                    root.style.setProperty('--sticky-top-right', '5.4rem');
                } else if (size.classList.contains('font-size-2')) {
                    fontSize = '13px';
                    root.style.setProperty('--sticky-top-left', '5.4rem');
                    root.style.setProperty('--sticky-top-right', '-7rem');
                } else if (size.classList.contains('font-size-3')) {
                    fontSize = '16px';
                    root.style.setProperty('--sticky-top-left', '2rem');
                    root.style.setProperty('--sticky-top-right', '-17rem');
                } else if (size.classList.contains('font-size-4')) {
                    fontSize = '19px';
                    root.style.setProperty('--sticky-top-left', '-5rem');
                    root.style.setProperty('--sticky-top-right', '-25rem');
                } else if (size.classList.contains('font-size-5')) {
                    fontSize = '22px';
                    root.style.setProperty('--sticky-top-left', '-12rem');
                    root.style.setProperty('--sticky-top-right', '-35rem');
                }
                
                document.querySelector('html').style.fontSize = fontSize;
            });
        });
        
        const changeActiveColorClass = () => {
            colorPalette.forEach(colorPicker => {
                colorPicker.classList.remove('active');
            });
        };
        
        colorPalette.forEach(color => {
            color.addEventListener('click', () => {
                let primaryHue;
                changeActiveColorClass();
                
                if (color.classList.contains('color-1')) {
                    primaryHue = 252;
                } else if (color.classList.contains('color-2')) {
                    primaryHue = 52;
                } else if (color.classList.contains('color-3')) {
                    primaryHue = 352;
                } else if (color.classList.contains('color-4')) {
                    primaryHue = 152;
                } else if (color.classList.contains('color-5')) {
                    primaryHue = 202;
                }
                color.classList.add('active');
                root.style.setProperty('--primary-color-hue', primaryHue);
            });
        });
        
        let lightColorLightness;
        let whiteColorLightness;
        let darkColorLightness;
        
        const changeBG = () => {
            root.style.setProperty('--light-color-lightness', lightColorLightness);
            root.style.setProperty('--white-color-lightness', whiteColorLightness);
            root.style.setProperty('--dark-color-lightness', darkColorLightness);
        };
        
        if (Bg1) {
            Bg1.addEventListener('click', () => {
                Bg1.classList.add('active');
                Bg2.classList.remove('active');
                Bg3.classList.remove('active');
                window.location.reload();
            });
        }
        
        if (Bg2) {
            Bg2.addEventListener('click', () => {
                darkColorLightness = '95%';
                whiteColorLightness = '20%';
                lightColorLightness = '15%';
                Bg2.classList.add('active');
                Bg1.classList.remove('active');
                Bg3.classList.remove('active');
                changeBG();
            });
        }
        
        if (Bg3) {
            Bg3.addEventListener('click', () => {
                darkColorLightness = '95%';
                whiteColorLightness = '10%';
                lightColorLightness = '0%';
                Bg3.classList.add('active');
                Bg1.classList.remove('active');
                Bg2.classList.remove('active');
                changeBG();
            });
        }
    }
    
    // Settings modal
    const settingsMenuItem = Array.from(document.querySelectorAll('.menu-item')).find(item => {
        const h3 = item.querySelector('h3');
        return h3 && h3.textContent.trim() === 'Settings';
    });
    
    if (settingsMenuItem) {
        settingsMenuItem.addEventListener('click', (e) => {
            e.preventDefault();
            openSettingsModal();
        });
    }
    
    const settingsModal = document.querySelector('.settings-modal');
    if (settingsModal) {
        settingsModal.addEventListener('click', closeSettingsModal);
        
        const settingsTabs = document.querySelectorAll('.settings-nav-btn');
        const settingsSections = document.querySelectorAll('.settings-section-content');
        
        settingsTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                settingsTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                settingsSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === `${tab.dataset.section}-settings`) {
                        section.classList.add('active');
                    }
                });
            });
        });
        
        setupSettingsHandlers();
    }
    
    // Create post functionality
    const createPostForm = document.querySelector('.create-post');
    const createPostInput = document.getElementById('create-post');
    
    if (createPostForm && createPostInput) {
        createPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const postText = createPostInput.value.trim();
            const fileInput = document.getElementById('post-photo-upload');
            const file = fileInput ? fileInput.files[0] : null;
            
            if (!postText && !file) {
                showNotification('Please write something or add a photo!', 'error');
                return;
            }
            
            const savePost = (imgUrl) => {
                const newPost = {
                    id: Date.now(),
                    username: currentUser.name,
                    location: "Just Now",
                    time: "Just now",
                    profileImg: currentUser.profileImg,
                    postImg: imgUrl || "",
                    caption: postText,
                    hashtags: "",
                    likes: 0,
                    likedBy: [],
                    comments: 0,
                    isLiked: false,
                    isBookmarked: false
                };
                
                postsData.unshift(newPost);
                saveDataToStorage();
                renderPosts();
                createPostInput.value = '';
                if (fileInput) fileInput.value = '';
                showNotification('Post created successfully!');
            };
            
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    savePost(e.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                savePost("./img/feed_1.jpeg");
            }
        });
    }
    
    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            showNotification('Logging out...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }
}

/* ==================== POSTS FUNCTIONALITY ==================== */
function createPostHTML(post) {
    return `
        <div class="feed" data-post-id="${post.id}">
            <div class="head">
                <div class="user">
                    <div class="profile-photo">
                        <img src="${post.profileImg}">
                    </div>
                    <div class="logo">
                        <h3>${post.username}</h3>
                        <small>${post.location}, ${post.time}</small>
                    </div>
                </div>
                <span class="edit">
                    <i class="uil uil-ellipsis-h"></i>
                </span>
            </div>

            <div class="photo">
                <img src="${post.postImg}">
            </div>

            <div class="action-buttons">
                <div class="interaction-buttons">
                    <span class="like-btn ${post.isLiked ? 'liked' : ''}">
                        <i class="uil uil-thumbs-up"></i>
                    </span>
                    <span class="comment-btn"><i class="uil uil-comment"></i></span>
                    <span class="share-btn"><i class="uil uil-share"></i></span>
                </div>
                <div class="bookmark">
                    <span class="bookmark-btn ${post.isBookmarked ? 'bookmarked' : ''}">
                        <i class="uil uil-bookmark"></i>
                    </span>
                </div>
            </div>

            <div class="liked-by">
                ${post.likedBy.map((img) => `<span><img src="${img}"></span>`).join('')}
                <p>Liked by <b>${post.username}</b> and <b>${post.likes.toLocaleString()} others</b></p>
            </div>

            <div class="caption">
                <p><b>${post.username}</b> ${post.caption} <span class="harsh-tag">${post.hashtags}</span></p>
            </div>

            <div class="comments text-muted">View all ${post.comments} comments</div>
        </div>
    `;
}

function renderPosts() {
    const feedsContainer = document.querySelector('.feeds');
    if (feedsContainer) {
        feedsContainer.innerHTML = postsData.map(post => createPostHTML(post)).join('');
        attachPostEventListeners();
    }
}

function attachPostEventListeners() {
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', handleLike);
    });

    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', handleBookmark);
    });

    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.addEventListener('click', handleComment);
    });

    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', handleShare);
    });
}

function handleLike(e) {
    const feedElement = e.target.closest('.feed');
    const postId = parseInt(feedElement.dataset.postId);
    const post = postsData.find(p => p.id === postId);
    
    if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        saveDataToStorage();
        renderPosts();
    }
}

function handleBookmark(e) {
    const feedElement = e.target.closest('.feed');
    const postId = parseInt(feedElement.dataset.postId);
    const post = postsData.find(p => p.id === postId);
    
    if (post) {
        post.isBookmarked = !post.isBookmarked;
        saveDataToStorage();
        renderPosts();
        
        const message = post.isBookmarked ? 'Post saved!' : 'Post removed from bookmarks';
        showNotification(message);
    }
}

function handleComment(e) {
    const feedElement = e.target.closest('.feed');
    const postId = parseInt(feedElement.dataset.postId);
    const post = postsData.find(p => p.id === postId);

    const comment = prompt("Enter your comment:");
    
    if (comment && post) {
        post.comments += 1;
        saveDataToStorage();
        renderPosts();
        showNotification('Comment added!');
    }
}

function handleShare(e) {
    showNotification('Post shared!');
}

/* ==================== FRIEND REQUESTS ==================== */
function renderFriendRequests() {
    const requestsContainer = document.querySelector('.friend-requests');
    if (!requestsContainer) return;
    
    const requestsHTML = friendRequests.map(request => `
        <div class="request" data-request-id="${request.id}">
            <div class="info">
                <div class="profile-photo">
                    <img src="${request.profileImg}">
                </div>
                <div>
                    <h5>${request.name}</h5>
                    <p class="text-muted">${request.mutualFriends} mutual friends</p>
                </div>
            </div>
            <div class="action">
                <button class="btn btn-primary accept-btn">Accept</button>
                <button class="btn decline-btn">Decline</button>
            </div>
        </div>
    `).join('');
    
    requestsContainer.innerHTML = `<h4>Requests</h4>` + requestsHTML;
    attachRequestEventListeners();
}

function attachRequestEventListeners() {
    document.querySelectorAll('.accept-btn').forEach(btn => {
        btn.addEventListener('click', handleAcceptRequest);
    });
    
    document.querySelectorAll('.decline-btn').forEach(btn => {
        btn.addEventListener('click', handleDeclineRequest);
    });
}

function handleAcceptRequest(e) {
    const requestElement = e.target.closest('.request');
    const requestId = parseInt(requestElement.dataset.requestId);
    const request = friendRequests.find(r => r.id === requestId);
    
    if (request) {
        showNotification(`You are now friends with ${request.name}!`);
        friendRequests = friendRequests.filter(r => r.id !== requestId);
        saveDataToStorage();
        renderFriendRequests();
    }
}

function handleDeclineRequest(e) {
    const requestElement = e.target.closest('.request');
    const requestId = parseInt(requestElement.dataset.requestId);
    
    friendRequests = friendRequests.filter(r => r.id !== requestId);
    saveDataToStorage();
    renderFriendRequests();
    showNotification('Request declined');
}

/* ==================== SETTINGS ==================== */
function openSettingsModal() {
    const settingsModal = document.querySelector('.settings-modal');
    if (settingsModal) {
        settingsModal.style.display = 'grid';
        loadSettingsData();
    }
}

function closeSettingsModal(e) {
    if (e.target.classList.contains('settings-modal')) {
        document.querySelector('.settings-modal').style.display = 'none';
    }
}

function loadSettingsData() {
    if (currentUser) {
        const nameInput = document.getElementById('settings-fullname');
        const usernameInput = document.getElementById('settings-username');
        const emailInput = document.getElementById('settings-email');
        const profilePreview = document.getElementById('settings-profile-preview');
        
        if (nameInput) nameInput.value = currentUser.name;
        if (usernameInput) usernameInput.value = currentUser.username;
        if (emailInput) emailInput.value = currentUser.email || '';
        if (profilePreview) profilePreview.src = currentUser.profileImg;
    }
}

function setupSettingsHandlers() {
    const photoInput = document.getElementById('settings-photo-input');
    if (photoInput) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = e.target.result;
                    document.getElementById('settings-profile-preview').src = img;
                    currentUser.profileImg = img;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    document.querySelectorAll('.profile-photo img').forEach(imgEl => {
                        if (imgEl.closest('.left') || imgEl.closest('nav')) {
                            imgEl.src = img;
                        }
                    });
                    showNotification('Profile photo updated!');
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    const saveNameBtn = document.getElementById('save-profile-name');
    if (saveNameBtn) {
        saveNameBtn.addEventListener('click', () => {
            const newName = document.getElementById('settings-fullname').value.trim();
            if (newName) {
                currentUser.name = newName;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                const handleH4 = document.querySelector('.handle h4');
                if (handleH4) handleH4.textContent = newName;
                showNotification('Name updated successfully!');
            }
        });
    }
    
    const saveUsernameBtn = document.getElementById('save-profile-username');
    if (saveUsernameBtn) {
        saveUsernameBtn.addEventListener('click', () => {
            const newUsername = document.getElementById('settings-username').value.trim();
            if (newUsername) {
                currentUser.username = newUsername;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                const handleP = document.querySelector('.handle p');
                if (handleP) handleP.textContent = `@${newUsername}`;
                showNotification('Username updated successfully!');
            }
        });
    }
    
    const saveEmailBtn = document.getElementById('save-account-email');
    if (saveEmailBtn) {
        saveEmailBtn.addEventListener('click', () => {
            const newEmail = document.getElementById('settings-email').value.trim();
            if (newEmail && newEmail.includes('@')) {
                currentUser.email = newEmail;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showNotification('Email updated successfully!');
            } else {
                showNotification('Please enter a valid email', 'error');
            }
        });
    }
    
    const changePassBtn = document.getElementById('change-password-btn');
    if (changePassBtn) {
        changePassBtn.addEventListener('click', () => {
            const newPass = document.getElementById('settings-new-password').value;
            const confirm = document.getElementById('settings-confirm-password').value;
            
            if (newPass.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            if (newPass !== confirm) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('instablogUsers') || '[]');
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex].password = newPass;
                localStorage.setItem('instablogUsers', JSON.stringify(users));
            }
            showNotification('Password changed successfully!');
            document.getElementById('settings-new-password').value = '';
            document.getElementById('settings-confirm-password').value = '';
        });
    }
    
    document.querySelectorAll('.settings-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const settingsData = JSON.parse(localStorage.getItem('userSettings') || '{}');
            settingsData[toggle.id] = toggle.classList.contains('active');
            localStorage.setItem('userSettings', JSON.stringify(settingsData));
        });
    });
    
    const deleteBtn = document.getElementById('delete-account-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                localStorage.removeItem('currentUser');
                showNotification('Account deleted', 'error');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        });
    }
}

/* ==================== MAIN INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // Check if on login page
    if (document.body.classList.contains('login-page')) {
        initLoginPage();
        return;
    }

    // Initialize main app
    initMainApp();
});