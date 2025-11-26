"use strict";

/* ==================== DATA STRUCTURES ==================== */
var postsData = [{
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}, {
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
}];
var friendRequests = [{
  id: 1,
  name: "William Szobo",
  profileImg: "./img/6.jpeg",
  mutualFriends: 8
}, {
  id: 2,
  name: "Bel Phina",
  profileImg: "./img/8.jpeg",
  mutualFriends: 8
}, {
  id: 3,
  name: "Larry Z",
  profileImg: "./img/10.jpeg",
  mutualFriends: 8
}, {
  id: 4,
  name: "Cherry Patton",
  profileImg: "./img/2.jpeg",
  mutualFriends: 8
}];
var currentUser = {
  name: "Danny Styles",
  username: "DannyS",
  profileImg: "./img/mine.jpg"
};
/* ==================== LOGIN PAGE FUNCTIONALITY ==================== */

function initLoginPage() {
  var tabBtns = document.querySelectorAll('.tab-btn');
  var authForms = document.querySelectorAll('.auth-form');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetTab = btn.dataset.tab;
      tabBtns.forEach(function (b) {
        return b.classList.remove('active');
      });
      btn.classList.add('active');
      authForms.forEach(function (form) {
        form.classList.remove('active');

        if (form.id === "".concat(targetTab, "-form")) {
          form.classList.add('active');
        }
      });
    });
  });

  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  var loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.getElementById('login-email').value.trim();
      var password = document.getElementById('login-password').value;
      var rememberMe = document.getElementById('remember-me').checked;
      document.querySelectorAll('.error-message').forEach(function (el) {
        return el.classList.remove('show');
      });
      document.querySelectorAll('input').forEach(function (el) {
        return el.classList.remove('error');
      });
      var hasError = false;

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
      var users = JSON.parse(localStorage.getItem('instablogUsers') || '[]');
      var user = users.find(function (u) {
        return (u.email === email || u.username === email) && u.password === password;
      });

      if (user) {
        var userData = {
          name: user.fullname,
          username: user.username,
          email: user.email,
          profileImg: user.profileImg || "./img/mine.jpg",
          rememberMe: rememberMe
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        showNotification('Login successful! Redirecting...', 'success');
        setTimeout(function () {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        showNotification('Invalid email/username or password', 'error');
      }
    });
  }

  var registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var fullname = document.getElementById('register-fullname').value.trim();
      var email = document.getElementById('register-email').value.trim();
      var username = document.getElementById('register-username').value.trim();
      var password = document.getElementById('register-password').value;
      var confirmPassword = document.getElementById('register-confirm-password').value;
      document.querySelectorAll('.error-message').forEach(function (el) {
        return el.classList.remove('show');
      });
      document.querySelectorAll('input').forEach(function (el) {
        return el.classList.remove('error');
      });
      var hasError = false;

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
      var users = JSON.parse(localStorage.getItem('instablogUsers') || '[]');

      if (users.find(function (u) {
        return u.email === email;
      })) {
        showNotification('Email already registered', 'error');
        return;
      }

      if (users.find(function (u) {
        return u.username === username;
      })) {
        showNotification('Username already taken', 'error');
        return;
      }

      var newUser = {
        id: Date.now(),
        fullname: fullname,
        email: email,
        username: username,
        password: password,
        profileImg: "./img/mine.jpg",
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      localStorage.setItem('instablogUsers', JSON.stringify(users));
      showNotification('Account created successfully!', 'success');
      registerForm.reset();
      setTimeout(function () {
        document.querySelector('[data-tab="login"]').click();
      }, 1500);
    });
  }

  (function initializeDemoAccount() {
    var users = JSON.parse(localStorage.getItem('instablogUsers') || '[]');
    var demoExists = users.find(function (u) {
      return u.email === 'demo@instablog.com';
    });

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

  document.querySelectorAll('.social-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showNotification('Social login coming soon!', 'error');
    });
  });
  var forgotPassword = document.querySelector('.forgot-password');

  if (forgotPassword) {
    forgotPassword.addEventListener('click', function (e) {
      e.preventDefault();
      showNotification('Password reset feature coming soon!', 'error');
    });
  }
}
/* ==================== UTILITY FUNCTIONS ==================== */


function loadDataFromStorage() {
  var savedPosts = localStorage.getItem('instablogPosts');
  var savedRequests = localStorage.getItem('friendRequests');

  if (savedPosts) {
    var parsed = JSON.parse(savedPosts);

    if (parsed.length >= 7) {
      postsData = parsed;
    }
  }

  if (savedRequests) {
    friendRequests = JSON.parse(savedRequests);
  }

  var savedUser = localStorage.getItem('currentUser');

  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }
}

function saveDataToStorage() {
  localStorage.setItem('instablogPosts', JSON.stringify(postsData));
  localStorage.setItem('friendRequests', JSON.stringify(friendRequests));
}

function showNotification(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
  var notification = document.createElement('div');
  notification.className = 'custom-notification';
  notification.textContent = message;
  notification.style.cssText = "\n        position: fixed;\n        top: 6rem;\n        right: 2rem;\n        background: ".concat(type === 'success' ? 'var(--color-success)' : 'var(--color-danger)', ";\n        color: white;\n        padding: 1rem 2rem;\n        border-radius: var(--border-radius);\n        z-index: 1000;\n        animation: slideIn 0.3s ease;\n    ");
  document.body.appendChild(notification);
  setTimeout(function () {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(function () {
      return notification.remove();
    }, 300);
  }, 2000);
}
/* ==================== MAIN APP INITIALIZATION ==================== */


function initMainApp() {
  loadDataFromStorage();
  renderPosts();
  renderFriendRequests(); // Sidebar functionality

  var menuItems = document.querySelectorAll('.menu-item');

  var changeActiveItem = function changeActiveItem() {
    menuItems.forEach(function (item) {
      item.classList.remove('active');
    });
  };

  menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
      changeActiveItem();
      item.classList.add('active');

      if (item.id != 'notifications') {
        var notifPopup = document.querySelector('.notifications-popup');
        if (notifPopup) notifPopup.style.display = 'none';
      } else {
        var _notifPopup = document.querySelector('.notifications-popup');

        if (_notifPopup) _notifPopup.style.display = 'block';
        var notifCount = document.querySelector('#notifications .notification-count');
        if (notifCount) notifCount.style.display = 'none';
      }
    });
  }); // Messages search

  var messagesNotification = document.querySelector('#messages-notification');
  var messages = document.querySelector('.messages');
  var messageSearch = document.querySelector('#message-search');

  if (messages && messageSearch) {
    var message = messages.querySelectorAll('.message');

    var searchMessage = function searchMessage() {
      var val = messageSearch.value.toLowerCase();
      message.forEach(function (chat) {
        var nameElement = chat.querySelector('h5');
        var name = nameElement ? nameElement.textContent.toLowerCase() : '';

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
    messagesNotification.addEventListener('click', function () {
      if (messages) {
        messages.style.boxShadow = '0 0 1rem var(--color-primary)';
        var notifCount = messagesNotification.querySelector('.notification-count');
        if (notifCount) notifCount.style.display = 'none';
        setTimeout(function () {
          messages.style.boxShadow = 'none';
        }, 2000);
      }
    });
  } // Theme customization


  var theme = document.querySelector('#theme');
  var themeModal = document.querySelector('.customize-theme');

  if (theme && themeModal) {
    var fontSizes = document.querySelectorAll('.choose-size span');
    var root = document.querySelector(':root');
    var colorPalette = document.querySelectorAll('.choose-color span');
    var Bg1 = document.querySelector('.bg-1');
    var Bg2 = document.querySelector('.bg-2');
    var Bg3 = document.querySelector('.bg-3');

    var openThemeModal = function openThemeModal() {
      themeModal.style.display = 'grid';
    };

    var closeThemeModal = function closeThemeModal(e) {
      if (e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
      }
    };

    themeModal.addEventListener('click', closeThemeModal);
    theme.addEventListener('click', openThemeModal);

    var removeSizeSelector = function removeSizeSelector() {
      fontSizes.forEach(function (size) {
        size.classList.remove('active');
      });
    };

    fontSizes.forEach(function (size) {
      size.addEventListener('click', function () {
        removeSizeSelector();
        var fontSize;
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

    var changeActiveColorClass = function changeActiveColorClass() {
      colorPalette.forEach(function (colorPicker) {
        colorPicker.classList.remove('active');
      });
    };

    colorPalette.forEach(function (color) {
      color.addEventListener('click', function () {
        var primaryHue;
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
    var lightColorLightness;
    var whiteColorLightness;
    var darkColorLightness;

    var changeBG = function changeBG() {
      root.style.setProperty('--light-color-lightness', lightColorLightness);
      root.style.setProperty('--white-color-lightness', whiteColorLightness);
      root.style.setProperty('--dark-color-lightness', darkColorLightness);
    };

    if (Bg1) {
      Bg1.addEventListener('click', function () {
        Bg1.classList.add('active');
        Bg2.classList.remove('active');
        Bg3.classList.remove('active');
        window.location.reload();
      });
    }

    if (Bg2) {
      Bg2.addEventListener('click', function () {
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
      Bg3.addEventListener('click', function () {
        darkColorLightness = '95%';
        whiteColorLightness = '10%';
        lightColorLightness = '0%';
        Bg3.classList.add('active');
        Bg1.classList.remove('active');
        Bg2.classList.remove('active');
        changeBG();
      });
    }
  } // Settings modal


  var settingsMenuItem = Array.from(document.querySelectorAll('.menu-item')).find(function (item) {
    var h3 = item.querySelector('h3');
    return h3 && h3.textContent.trim() === 'Settings';
  });

  if (settingsMenuItem) {
    settingsMenuItem.addEventListener('click', function (e) {
      e.preventDefault();
      openSettingsModal();
    });
  }

  var settingsModal = document.querySelector('.settings-modal');

  if (settingsModal) {
    settingsModal.addEventListener('click', closeSettingsModal);
    var settingsTabs = document.querySelectorAll('.settings-nav-btn');
    var settingsSections = document.querySelectorAll('.settings-section-content');
    settingsTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        settingsTabs.forEach(function (t) {
          return t.classList.remove('active');
        });
        tab.classList.add('active');
        settingsSections.forEach(function (section) {
          section.classList.remove('active');

          if (section.id === "".concat(tab.dataset.section, "-settings")) {
            section.classList.add('active');
          }
        });
      });
    });
    setupSettingsHandlers();
  } // Create post functionality


  var createPostForm = document.querySelector('.create-post');
  var createPostInput = document.getElementById('create-post');

  if (createPostForm && createPostInput) {
    createPostForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var postText = createPostInput.value.trim();
      var fileInput = document.getElementById('post-photo-upload');
      var file = fileInput ? fileInput.files[0] : null;

      if (!postText && !file) {
        showNotification('Please write something or add a photo!', 'error');
        return;
      }

      var savePost = function savePost(imgUrl) {
        var newPost = {
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
        var reader = new FileReader();

        reader.onload = function (e) {
          savePost(e.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        savePost("./img/feed_1.jpeg");
      }
    });
  } // Logout


  var logoutBtn = document.getElementById('logout-btn');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('currentUser');
      showNotification('Logging out...');
      setTimeout(function () {
        window.location.href = 'login.html';
      }, 1000);
    });
  }
}
/* ==================== POSTS FUNCTIONALITY ==================== */


function createPostHTML(post) {
  return "\n        <div class=\"feed\" data-post-id=\"".concat(post.id, "\">\n            <div class=\"head\">\n                <div class=\"user\">\n                    <div class=\"profile-photo\">\n                        <img src=\"").concat(post.profileImg, "\">\n                    </div>\n                    <div class=\"logo\">\n                        <h3>").concat(post.username, "</h3>\n                        <small>").concat(post.location, ", ").concat(post.time, "</small>\n                    </div>\n                </div>\n                <span class=\"edit\">\n                    <i class=\"uil uil-ellipsis-h\"></i>\n                </span>\n            </div>\n\n            <div class=\"photo\">\n                <img src=\"").concat(post.postImg, "\">\n            </div>\n\n            <div class=\"action-buttons\">\n                <div class=\"interaction-buttons\">\n                    <span class=\"like-btn ").concat(post.isLiked ? 'liked' : '', "\">\n                        <i class=\"uil uil-thumbs-up\"></i>\n                    </span>\n                    <span class=\"comment-btn\"><i class=\"uil uil-comment\"></i></span>\n                    <span class=\"share-btn\"><i class=\"uil uil-share\"></i></span>\n                </div>\n                <div class=\"bookmark\">\n                    <span class=\"bookmark-btn ").concat(post.isBookmarked ? 'bookmarked' : '', "\">\n                        <i class=\"uil uil-bookmark\"></i>\n                    </span>\n                </div>\n            </div>\n\n            <div class=\"liked-by\">\n                ").concat(post.likedBy.map(function (img) {
    return "<span><img src=\"".concat(img, "\"></span>");
  }).join(''), "\n                <p>Liked by <b>").concat(post.username, "</b> and <b>").concat(post.likes.toLocaleString(), " others</b></p>\n            </div>\n\n            <div class=\"caption\">\n                <p><b>").concat(post.username, "</b> ").concat(post.caption, " <span class=\"harsh-tag\">").concat(post.hashtags, "</span></p>\n            </div>\n\n            <div class=\"comments text-muted\">View all ").concat(post.comments, " comments</div>\n        </div>\n    ");
}

function renderPosts() {
  var feedsContainer = document.querySelector('.feeds');

  if (feedsContainer) {
    feedsContainer.innerHTML = postsData.map(function (post) {
      return createPostHTML(post);
    }).join('');
    attachPostEventListeners();
  }
}

function attachPostEventListeners() {
  document.querySelectorAll('.like-btn').forEach(function (btn) {
    btn.addEventListener('click', handleLike);
  });
  document.querySelectorAll('.bookmark-btn').forEach(function (btn) {
    btn.addEventListener('click', handleBookmark);
  });
  document.querySelectorAll('.comment-btn').forEach(function (btn) {
    btn.addEventListener('click', handleComment);
  });
  document.querySelectorAll('.share-btn').forEach(function (btn) {
    btn.addEventListener('click', handleShare);
  });
}

function handleLike(e) {
  var feedElement = e.target.closest('.feed');
  var postId = parseInt(feedElement.dataset.postId);
  var post = postsData.find(function (p) {
    return p.id === postId;
  });

  if (post) {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    saveDataToStorage();
    renderPosts();
  }
}

function handleBookmark(e) {
  var feedElement = e.target.closest('.feed');
  var postId = parseInt(feedElement.dataset.postId);
  var post = postsData.find(function (p) {
    return p.id === postId;
  });

  if (post) {
    post.isBookmarked = !post.isBookmarked;
    saveDataToStorage();
    renderPosts();
    var message = post.isBookmarked ? 'Post saved!' : 'Post removed from bookmarks';
    showNotification(message);
  }
}

function handleComment(e) {
  var feedElement = e.target.closest('.feed');
  var postId = parseInt(feedElement.dataset.postId);
  var post = postsData.find(function (p) {
    return p.id === postId;
  });
  var comment = prompt("Enter your comment:");

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
  var requestsContainer = document.querySelector('.friend-requests');
  if (!requestsContainer) return;
  var requestsHTML = friendRequests.map(function (request) {
    return "\n        <div class=\"request\" data-request-id=\"".concat(request.id, "\">\n            <div class=\"info\">\n                <div class=\"profile-photo\">\n                    <img src=\"").concat(request.profileImg, "\">\n                </div>\n                <div>\n                    <h5>").concat(request.name, "</h5>\n                    <p class=\"text-muted\">").concat(request.mutualFriends, " mutual friends</p>\n                </div>\n            </div>\n            <div class=\"action\">\n                <button class=\"btn btn-primary accept-btn\">Accept</button>\n                <button class=\"btn decline-btn\">Decline</button>\n            </div>\n        </div>\n    ");
  }).join('');
  requestsContainer.innerHTML = "<h4>Requests</h4>" + requestsHTML;
  attachRequestEventListeners();
}

function attachRequestEventListeners() {
  document.querySelectorAll('.accept-btn').forEach(function (btn) {
    btn.addEventListener('click', handleAcceptRequest);
  });
  document.querySelectorAll('.decline-btn').forEach(function (btn) {
    btn.addEventListener('click', handleDeclineRequest);
  });
}

function handleAcceptRequest(e) {
  var requestElement = e.target.closest('.request');
  var requestId = parseInt(requestElement.dataset.requestId);
  var request = friendRequests.find(function (r) {
    return r.id === requestId;
  });

  if (request) {
    showNotification("You are now friends with ".concat(request.name, "!"));
    friendRequests = friendRequests.filter(function (r) {
      return r.id !== requestId;
    });
    saveDataToStorage();
    renderFriendRequests();
  }
}

function handleDeclineRequest(e) {
  var requestElement = e.target.closest('.request');
  var requestId = parseInt(requestElement.dataset.requestId);
  friendRequests = friendRequests.filter(function (r) {
    return r.id !== requestId;
  });
  saveDataToStorage();
  renderFriendRequests();
  showNotification('Request declined');
}
/* ==================== SETTINGS ==================== */


function openSettingsModal() {
  var settingsModal = document.querySelector('.settings-modal');

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
    var nameInput = document.getElementById('settings-fullname');
    var usernameInput = document.getElementById('settings-username');
    var emailInput = document.getElementById('settings-email');
    var profilePreview = document.getElementById('settings-profile-preview');
    if (nameInput) nameInput.value = currentUser.name;
    if (usernameInput) usernameInput.value = currentUser.username;
    if (emailInput) emailInput.value = currentUser.email || '';
    if (profilePreview) profilePreview.src = currentUser.profileImg;
  }
}

function setupSettingsHandlers() {
  var photoInput = document.getElementById('settings-photo-input');

  if (photoInput) {
    photoInput.addEventListener('change', function (e) {
      var file = e.target.files[0];

      if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
          var img = e.target.result;
          document.getElementById('settings-profile-preview').src = img;
          currentUser.profileImg = img;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          document.querySelectorAll('.profile-photo img').forEach(function (imgEl) {
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

  var saveNameBtn = document.getElementById('save-profile-name');

  if (saveNameBtn) {
    saveNameBtn.addEventListener('click', function () {
      var newName = document.getElementById('settings-fullname').value.trim();

      if (newName) {
        currentUser.name = newName;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        var handleH4 = document.querySelector('.handle h4');
        if (handleH4) handleH4.textContent = newName;
        showNotification('Name updated successfully!');
      }
    });
  }

  var saveUsernameBtn = document.getElementById('save-profile-username');

  if (saveUsernameBtn) {
    saveUsernameBtn.addEventListener('click', function () {
      var newUsername = document.getElementById('settings-username').value.trim();

      if (newUsername) {
        currentUser.username = newUsername;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        var handleP = document.querySelector('.handle p');
        if (handleP) handleP.textContent = "@".concat(newUsername);
        showNotification('Username updated successfully!');
      }
    });
  }

  var saveEmailBtn = document.getElementById('save-account-email');

  if (saveEmailBtn) {
    saveEmailBtn.addEventListener('click', function () {
      var newEmail = document.getElementById('settings-email').value.trim();

      if (newEmail && newEmail.includes('@')) {
        currentUser.email = newEmail;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification('Email updated successfully!');
      } else {
        showNotification('Please enter a valid email', 'error');
      }
    });
  }

  var changePassBtn = document.getElementById('change-password-btn');

  if (changePassBtn) {
    changePassBtn.addEventListener('click', function () {
      var newPass = document.getElementById('settings-new-password').value;
      var confirm = document.getElementById('settings-confirm-password').value;

      if (newPass.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
      }

      if (newPass !== confirm) {
        showNotification('Passwords do not match', 'error');
        return;
      }

      var users = JSON.parse(localStorage.getItem('instablogUsers') || '[]');
      var userIndex = users.findIndex(function (u) {
        return u.email === currentUser.email;
      });

      if (userIndex !== -1) {
        users[userIndex].password = newPass;
        localStorage.setItem('instablogUsers', JSON.stringify(users));
      }

      showNotification('Password changed successfully!');
      document.getElementById('settings-new-password').value = '';
      document.getElementById('settings-confirm-password').value = '';
    });
  }

  document.querySelectorAll('.settings-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      var settingsData = JSON.parse(localStorage.getItem('userSettings') || '{}');
      settingsData[toggle.id] = toggle.classList.contains('active');
      localStorage.setItem('userSettings', JSON.stringify(settingsData));
    });
  });
  var deleteBtn = document.getElementById('delete-account-btn');

  if (deleteBtn) {
    deleteBtn.addEventListener('click', function () {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        localStorage.removeItem('currentUser');
        showNotification('Account deleted', 'error');
        setTimeout(function () {
          window.location.href = 'login.html';
        }, 1500);
      }
    });
  }
}
/* ==================== MAIN INITIALIZATION ==================== */


document.addEventListener('DOMContentLoaded', function () {
  // Check if on login page
  if (document.body.classList.contains('login-page')) {
    initLoginPage();
    return;
  } // Initialize main app


  initMainApp();
});