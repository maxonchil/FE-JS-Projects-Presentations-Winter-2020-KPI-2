(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var SOUNDTRACKS_DATA = require('./soundtracks_library.js');

document.addEventListener("DOMContentLoaded", function () {
  //Enable albums cover art
  document.getElementById("albums__item-checked").checked = true;
  var albums = document.getElementsByClassName("albums__cover"),
      inner = document.getElementsByClassName("albums__tracks-inner")[0],
      top_inner = document.getElementsByClassName("albums__track-top")[0]; //Clear the contents of the container before displaying the following items

  var _loop = function _loop(i) {
    albums[i].onchange = function () {
      if (inner.children.length > 0) {
        while (inner.firstChild) {
          inner.removeChild(inner.firstChild);
        }
      } //Get the song corresponding to the album, create this element and add it to the page


      SOUNDTRACKS_DATA.soundtracks_base.filter(function (e) {
        return e.album === albums[i].dataset.album;
      }).forEach(function (element) {
        var div = document.createElement("div"),
            p_title = document.createElement("p"),
            p = document.createElement("p"),
            audio = document.createElement("audio");

        if (document.getElementsByClassName("albums__tracks-title").length === 0) {
          p_title.className = "albums__tracks-title";
          p_title.innerText = element.album;
          top_inner.appendChild(p_title);
        } else {
          document.getElementsByClassName("albums__tracks-title")[0].innerText = element.album;
        }

        p.innerText = element.trackName;
        audio.setAttribute("controls", "controls");
        audio.setAttribute("src", element.src);
        div.className = "albums__tracks-item";
        div.appendChild(p);
        div.appendChild(audio);
        inner.appendChild(div);
      });
    };
  };

  for (var i = 0; i < albums.length; i++) {
    _loop(i);
  }
});
},{"./soundtracks_library.js":9}],2:[function(require,module,exports){
"use strict";

var SOUNDTRACKS_DATA = require('./soundtracks_library.js');

document.addEventListener("DOMContentLoaded", function () {
  //Collect all elements that filter by genre
  var genre_items = Array.from(document.getElementsByClassName("aside__icon")).concat(Array.from(document.getElementsByClassName("header__submenu-span"))); //Find songs by the corresponding genre and pass them to the function to display on page

  genre_items.forEach(function (item) {
    item.onclick = function (e) {
      SOUNDTRACKS_DATA.useSoundTracks(SOUNDTRACKS_DATA.soundtracks_base.filter(function (element) {
        return element.genre === e.target.dataset.genre;
      }));
    };
  });
});
},{"./soundtracks_library.js":9}],3:[function(require,module,exports){
"use strict";

var SOUNDTRACKS_DATA = require('./soundtracks_library.js');

document.addEventListener("DOMContentLoaded", function () {
  //Onclick 'back button' pass all songs from the database to the function for displaying content on page
  document.getElementsByClassName("library__top-back")[0].onclick = function () {
    SOUNDTRACKS_DATA.useSoundTracks(SOUNDTRACKS_DATA.soundtracks_base);
    document.getElementsByClassName("library__top-back")[0].className += " hidden";
  };
});
},{"./soundtracks_library.js":9}],4:[function(require,module,exports){
"use strict";

var SOUNDTRACKS_DATA = require('./soundtracks_library.js');

var USERS_DATA = require('./registration.js');

document.addEventListener("DOMContentLoaded", function () {
  //If page was reloaded and user logen id, redraw the page in accordance with the fact that the user is logged in
  if (/^logIn/.test(document.cookie)) {
    var rate_container = document.getElementsByClassName("library__main-rate"),
        createAcc_btn = document.querySelector(".header__registration-createAccount"),
        signIn_btn = document.querySelector(".header__registration-signIn"),
        logOut_btn = document.querySelector(".sign-inForm__logOut"),
        signIN_success = document.querySelector(".sign-inForm__success"),
        rate_text = document.getElementsByClassName("library__main-rated");
    document.getElementById("reg_controler1").checked = 'checked';
    createAcc_btn.style.display = "none";
    signIn_btn.style.display = "none";
    logOut_btn.style.display = "block";
    signIN_success.innerText = "Hi, ".concat(USERS_DATA.users_base[document.cookie.split("=")[1]].user_name);
    signIN_success.style.display = "block";
    Array.from(document.getElementsByClassName("library__main-audio"), function (e) {
      return e.classList.toggle("audio-loged", true);
    }); //If page was reloaded, add event on logout btn

    logOut_btn.onclick = function () {
      document.cookie = "logIn=" + [document.cookie.split("=")[1]] + ";" + "max-age=0;";
      logOut_btn.style.display = "none";
      createAcc_btn.style.display = "block";
      signIn_btn.style.display = "block";
      signIN_success.style.display = "none";

      for (var i = 0; i < rate_container.length; i++) {
        rate_container[i].className += " none";
        rate_text[i].innerText = "";
      }

      SOUNDTRACKS_DATA.rated = [];

      try {
        localStorage.setItem("rated", "[]");
      } catch (error) {
        alert(error.name);
      }

      Array.from(document.getElementsByClassName("library__main-audio"), function (e) {
        return e.classList.toggle("audio-loged", false);
      });
    };
  }
});
},{"./registration.js":6,"./soundtracks_library.js":9}],5:[function(require,module,exports){
"use strict";

var SOUNDTRACKS_DATA = require('./soundtracks_library.js');

document.addEventListener("DOMContentLoaded", function () {
  var rate_container = document.getElementsByClassName("library__main-rate"),
      rate_input = document.getElementsByClassName("library__main-checkbox"),
      rate_text = document.getElementsByClassName("library__main-rated"),
      rating,
      rate_track,
      curent_index; //On click oт container, get the index of the element and the song voted for

  var _loop = function _loop(i) {
    rate_container[i].onclick = function () {
      rate_track = rate_container[i].dataset.track;
      curent_index = i;
    };
  };

  for (var i = 0; i < rate_container.length; i++) {
    _loop(i);
  } //On the same click,get the rating that the user put,add it to the database, and save a state of a song as voted


  var _loop2 = function _loop2(_i) {
    rate_input[_i].onchange = function () {
      rating = rate_input[_i].dataset.rating;
      SOUNDTRACKS_DATA.soundtracks_base.map(function (element) {
        return element.trackName === rate_track ? element.rating.push(rating) : false;
      });
      rate_container[curent_index].className += " none";
      rate_text[curent_index].innerText = "Voted!";
      SOUNDTRACKS_DATA.rated.push(rate_track);

      try {
        localStorage.setItem("rated", JSON.stringify(SOUNDTRACKS_DATA.rated));
      } catch (error) {
        alert(error.name);
      }
    };
  };

  for (var _i = 0; _i < rate_input.length; _i++) {
    _loop2(_i);
  }
});
},{"./soundtracks_library.js":9}],6:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users_base = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var users_base;
exports.users_base = users_base;

var SOUNDTRACKS_DATA = require('./soundtracks_library.js');

function ajax_usersBase() {
  return _ajax_usersBase.apply(this, arguments);
}

function _ajax_usersBase() {
  _ajax_usersBase = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();

              xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                  resolve(xhr.responseText);
                }
              };

              xhr.open('GET', '../users_base.json');
              xhr.send();
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _ajax_usersBase.apply(this, arguments);
}

(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  var data;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (localStorage.getItem("users_base")) {
            _context.next = 7;
            break;
          }

          _context.next = 3;
          return ajax_usersBase();

        case 3:
          data = _context.sent;
          localStorage.setItem("users_base", data);
          _context.next = 8;
          break;

        case 7:
          data = localStorage.getItem("users_base");

        case 8:
          registration(JSON.parse(data));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();

function registration(data) {
  //Create an array with all users
  exports.users_base = users_base = data;

  document.getElementsByClassName("create-accountForm__submit")[0].onclick = function () {
    var reg_userName = document.querySelector("[name='user-name']").value,
        reg_userEmail = document.querySelector("[name='user-email']").value,
        reg_userPassword = document.querySelector("[name='user-password']").value,
        reg_userPassword2 = document.querySelector("[name='user-password2']").value,
        reg_errorEmail = document.querySelector(".create-accountForm__errorEmail"),
        reg_erroName = document.querySelector(".create-accountForm__errorName"),
        reg_errorPas = document.querySelector(".create-accountForm__errorPas"),
        reg_successForm = document.querySelector(".create-accountForm__success"),
        reg_createForm = document.querySelector("[name='create-acctountForm']"),
        reg_userData = {
      "user_name": reg_userName,
      "user_email": reg_userEmail,
      "user_password": reg_userPassword
    }; //Registration check 

    if (!/\w+@\w+\.\w+/i.test(reg_userEmail)) {
      reg_errorEmail.innerText = "Please use a correct email";
      return;
    }

    if (reg_userPassword.length < 5) {
      reg_errorPas.innerText = "Password must be longer than 5 characters";
      reg_errorEmail.innerText = "";
      return;
    } else if (reg_userPassword !== reg_userPassword2) {
      reg_errorPas.innerText = "Passwords do not match";
      reg_errorEmail.innerText = "";
      return;
    } //If users_base  is undefined (ajax require is fail) then set up in localeStorage new key with user data


    if (users_base === undefined) {
      (function (key, item) {
        try {
          localStorage.setItem(key, item);
          exports.users_base = users_base = [reg_userData];
        } catch (error) {
          alert(error);
        }
      })("users_base", JSON.stringify([reg_userData])); //Clean all fields and error messages when reg is done


      reg_createForm.style.display = "none";
      reg_successForm.style.display = "block";
      document.querySelectorAll("input[name^='user-']").forEach(function (e) {
        e.value = "";
      });
      reg_errorEmail.innerText = "";
      reg_erroName.innerText = "";
      reg_errorPas.innerText = "";
      return;
    } else {
      //If 'users_base' is not undefined(ajax require is ok), then get users numbers by array.length
      var users_counter = users_base.length; //Check on taken nickname and email

      for (var i = 0; i < users_counter; i++) {
        if (users_base[i].user_name.toLowerCase() === reg_userName.toLowerCase()) {
          reg_erroName.innerText = "Nickname is already taken";
          reg_errorPas.innerText = "";
          reg_errorEmail.innerText = "";
          return;
        }
      }

      for (var _i = 0; _i < users_counter; _i++) {
        if (users_base[_i].user_email.toLowerCase() === reg_userEmail.toLowerCase()) {
          reg_errorEmail.innerText = "This email is alredy used";
          reg_erroName.innerText = "";
          reg_errorPas.innerText = "";
          return;
        }
      }

      users_base.push(reg_userData);

      (function (key, item) {
        try {
          localStorage.setItem(key, item);
        } catch (error) {
          alert(error);
        }
      })("users_base", JSON.stringify(users_base));

      reg_createForm.style.display = "none";
      reg_successForm.style.display = "block";
      document.querySelectorAll("input[name^='user-']").forEach(function (e) {
        e.value = "";
      });
      reg_errorEmail.innerText = "";
      reg_erroName.innerText = "";
      reg_errorPas.innerText = "";
    }
  }; //Sign in form functionality


  document.querySelector(".sign-inForm__submit").onclick = function () {
    var signIn_log = document.querySelector("[name='sign-inLog']").value,
        signIn_pas = document.querySelector("[name='sign-inPas']").value,
        createAcc_btn = document.querySelector(".header__registration-createAccount"),
        signIn_btn = document.querySelector(".header__registration-signIn"),
        logOut_btn = document.querySelector(".sign-inForm__logOut"),
        signIN_success = document.querySelector(".sign-inForm__success"),
        users_counter = users_base.length,
        user_index = 0,
        check_log = false,
        check_pas = true;

    for (var i = 0; i < users_counter; i++) {
      if (signIn_log === users_base[i].user_name) {
        check_log = true;
        user_index = i;
        break;
      }
    }

    signIn_pas === users_base[user_index].user_password ? check_pas = true : check_pas = false;

    if (check_log === true && check_pas === true) {
      var rate_container = document.getElementsByClassName("library__main-rate");
      document.getElementById("reg_controler1").checked = 'checked';
      createAcc_btn.style.display = "none";
      signIn_btn.style.display = "none";
      logOut_btn.style.display = "block";
      signIN_success.innerText = "Hi, ".concat(users_base[user_index].user_name);
      signIN_success.style.display = "block";
      document.cookie = "logIn=" + user_index + ";";
      document.querySelectorAll("input[name^='sign-in']").forEach(function (e) {
        e.value = "";
      });
      document.querySelector(".sign-inForm__error").innerText = "";

      for (var _i2 = 0; _i2 < rate_container.length; _i2++) {
        rate_container[_i2].classList.toggle("none", false);
      } //If user loged in, then show him logout button


      logOut_btn.onclick = function () {
        var rate_text = document.querySelector(".library__main-rated");
        document.cookie = "logIn=" + user_index + ";" + "max-age=0;";
        logOut_btn.style.display = "none";
        signIN_success.style.display = "none";
        createAcc_btn.style.display = "block";
        signIn_btn.style.display = "block";
        document.querySelector(".create-accountForm__success").style.display = "none";
        document.querySelector("[name='create-acctountForm']").style.display = "block";

        for (var _i3 = 0; _i3 < rate_container.length; _i3++) {
          rate_container[_i3].className += " none";
          rate_text[_i3].innerText = "";
        } //When the user loged out,discard the state of the voted songs


        SOUNDTRACKS_DATA.rated = [];

        try {
          localStorage.setItem(localStorage.setItem("rated", "[]"));
        } catch (error) {
          alert(error.name);
        }

        Array.from(document.getElementsByClassName("library__main-audio"), function (e) {
          return e.classList.toggle("audio-loged", false);
        });
      };

      Array.from(document.getElementsByClassName("library__main-audio"), function (e) {
        return e.classList.toggle("audio-loged", true);
      }); //If no such username or password is wrong, show message
    } else {
      document.querySelectorAll("input[name^='sign-in']").forEach(function (e) {
        e.value = "";
      });
      document.querySelector(".sign-inForm__error").innerText = "Wrong email or password";
    }
  };
}
},{"./soundtracks_library.js":9,"@babel/runtime/helpers/asyncToGenerator":12,"@babel/runtime/helpers/interopRequireDefault":14,"@babel/runtime/regenerator":18}],7:[function(require,module,exports){
"use strict";

var SOUNDTRACKS_DATA = require('./soundtracks_library.js');

document.addEventListener("DOMContentLoaded", function () {
  //Search functionality for btn activate
  document.getElementsByClassName("icon__search")[0].onclick = function () {
    var search = document.querySelector("[type='search']").value;
    document.getElementById("library").scrollIntoView();

    if (location.hash !== "#library") {
      location.hash = "";
      location.hash += "#library";
    }

    SOUNDTRACKS_DATA.useSoundTracks(SOUNDTRACKS_DATA.soundtracks_base.filter(function (e) {
      return e.trackName.toLowerCase().includes(search.toLowerCase());
    }));
  }; //Search functionality for enter activate


  document.querySelector("[type='search']").addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      var search = document.querySelector("[type='search']").value;
      document.getElementById("library").scrollIntoView();

      if (location.hash !== "#library") {
        location.hash = "";
        location.hash += "#library";
      }

      SOUNDTRACKS_DATA.useSoundTracks(SOUNDTRACKS_DATA.soundtracks_base.filter(function (e) {
        return e.trackName.toLowerCase().includes(search.toLowerCase());
      }));
    }
  });
});
},{"./soundtracks_library.js":9}],8:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SOUNDTRACKS_DATA = require('./soundtracks_library.js');

document.addEventListener("DOMContentLoaded", function () {
  //Function to calculate the sum of all numbers in an array
  var sum = function sum(a) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return rest.length !== 0 ? a + sum.apply(void 0, rest) : a;
  }; //Object with a sorting functions for different data types


  var sort_functions = {
    number: function number(direction) {
      return direction === "up" ? function (a, b) {
        return a.rating[0] - b.rating[0];
      } : function (a, b) {
        return b.rating[0] - a.rating[0];
      };
    },
    string: function string(direction) {
      switch (direction) {
        case "up":
          return function (a, b) {
            if (a.trackName > b.trackName) {
              return -1;
            } else if (a.trackName < b.trackName) {
              return 1;
            } else {
              return 0;
            }
          };

        case "down":
          return function (a, b) {
            if (b.trackName > a.trackName) {
              return -1;
            } else if (b.trackName < a.trackName) {
              return 1;
            } else {
              return 0;
            }
          };
      }
    }
  };
  Array.from(document.getElementsByClassName("library__sort-item"), function (e) {
    e.onclick = function () {
      var direction = e.dataset.direction,
          key = e.value,
          array = JSON.parse(localStorage.getItem("soundtrack_array"));

      switch (key) {
        case "trackName":
          return SOUNDTRACKS_DATA.useSoundTracks(array.sort(sort_functions.string(direction)));

        case "rating":
          return SOUNDTRACKS_DATA.useSoundTracks(array.filter(function (e) {
            return e.rating.length;
          }).map(function (x) {
            return _objectSpread({}, x, {
              rating: [sum.apply(void 0, (0, _toConsumableArray2.default)(x.rating))]
            });
          }).sort(sort_functions.number(direction)));
      }
    };
  });
  Array.from(document.getElementsByClassName("sort_top-10"), function (e) {
    e.onclick = function () {
      var sort_genre = e.dataset.genre,
          sorted = SOUNDTRACKS_DATA.soundtracks_base.filter(function (e) {
        return e.genre === sort_genre && e.rating.length;
      }).map(function (x) {
        return _objectSpread({}, x, {
          rating: sum.apply(void 0, (0, _toConsumableArray2.default)(x.rating))
        });
      });
      sorted.length >= 10 ? SOUNDTRACKS_DATA.useSoundTracks(sorted.slice(0, 10).sort(sort_functions.number("down"))) : SOUNDTRACKS_DATA.useSoundTracks(sorted.sort(sort_functions.number("down")));
    };
  });
});
},{"./soundtracks_library.js":9,"@babel/runtime/helpers/defineProperty":13,"@babel/runtime/helpers/interopRequireDefault":14,"@babel/runtime/helpers/toConsumableArray":17}],9:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSoundTracks = useSoundTracks;
exports.rated = exports.soundtracks_base = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var soundtracks_base;
exports.soundtracks_base = soundtracks_base;
var rated = []; //If user loged in, get from LS songs for which he voted

exports.rated = rated;

if (/^logIn/.test(document.cookie)) {
  if (localStorage.getItem("rated")) {
    exports.rated = rated = JSON.parse(localStorage.getItem("rated"));
  } else {
    localStorage.setItem("rated", "[]");
  }
} else {
  localStorage.setItem("rated", "[]");
}

function ajax_soundtracks() {
  return _ajax_soundtracks.apply(this, arguments);
}

function _ajax_soundtracks() {
  _ajax_soundtracks = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              var xhr2 = new XMLHttpRequest();

              xhr2.onreadystatechange = function () {
                if (xhr2.readyState == 4 && xhr2.status == 200) {
                  resolve(xhr2.responseText);
                }
              };

              xhr2.open('GET', 'soundtracks_base.json');
              xhr2.send();
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _ajax_soundtracks.apply(this, arguments);
}

(0, _asyncToGenerator2.default)(
/*#__PURE__*/
_regenerator.default.mark(function _callee() {
  var data;
  return _regenerator.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (localStorage.getItem("soundtracks_base")) {
            _context.next = 7;
            break;
          }

          _context.next = 3;
          return ajax_soundtracks();

        case 3:
          data = _context.sent;
          localStorage.setItem("soundtracks_base", data);
          _context.next = 8;
          break;

        case 7:
          data = localStorage.getItem("soundtracks_base");

        case 8:
          exports.soundtracks_base = soundtracks_base = JSON.parse(data);
          useSoundTracks();

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))(); //Main function to work with scountracks data

function useSoundTracks(filtred) {
  var soundtracks_array; //temporary storage for the data that will be displayed to the user

  if (filtred === undefined) {
    document.getElementsByClassName("library__top-back")[0].classList.toggle("hidden", true);
    soundtracks_array = soundtracks_base.slice();
  } else {
    document.getElementsByClassName("library__top-back")[0].classList.toggle("hidden", false);
    soundtracks_array = filtred;
  } //Save a copy of the displayed content in LS to sort it later if needed


  localStorage.setItem("soundtrack_array", JSON.stringify(soundtracks_array));
  var max_page = Math.ceil(soundtracks_array.length / 10),
      controls_list = document.querySelector(".library__bottom-controls"),
      pages = Math.ceil(soundtracks_array.length / 10) >= 5 ? 5 : Math.ceil(soundtracks_array.length / 10); //Redrawing pagination controls elements

  if (controls_list.hasChildNodes()) {
    while (controls_list.firstChild) {
      controls_list.removeChild(controls_list.firstChild);
    }
  }

  if (pages > 1) {
    var first_li = document.createElement("li");
    first_li.className = "library__bottom-beginning-btn";
    controls_list.appendChild(first_li).innerText = "< First page";

    for (var i = 1; i <= pages; i++) {
      var li = document.createElement("li"),
          btn = document.createElement("button");
      li.className += "controls-btn";
      btn.className = "library__bottom-controlsItem";
      li.appendChild(btn).innerText = i;
      controls_list.appendChild(li);
    }

    var last_li = document.createElement("li");
    last_li.className = "library__bottom-end-btn";
    controls_list.appendChild(last_li).innerText = "Last page >";
  }

  var library_titles = document.querySelectorAll(".library__main-title"),
      library_audio = document.querySelectorAll(".library__main-audio"),
      library_controls = document.querySelectorAll(".library__bottom-controlsItem"),
      library_containers = document.getElementsByClassName("library__main-item"),
      rate_container = document.getElementsByClassName("library__main-rate"),
      rate_input = document.getElementsByClassName("library__main-checkbox"),
      rate_text = document.getElementsByClassName("library__main-rated"),
      no_mutches = document.getElementsByClassName("library__main-nomatches")[0]; //Function for rewriting innerText of controls when user click on it

  function controllersRedrawing(left_shift, basic_page, active_e) {
    var counter = left_shift;
    library_controls.forEach(function (e) {
      if (e.classList.contains("library__bottom-controlsItem-active")) {
        e.className = "library__bottom-controlsItem";
      }

      e.innerText = basic_page + counter;
      counter++;
    });
    library_controls[active_e].className += "-active";
  } //The function to displays songs according to the request on the page


  function displayContent(array) {
    if (/^logIn/.test(document.cookie)) {
      for (var _i = 0; _i < rate_input.length; _i++) {
        rate_input[_i].checked = false;
      }
    }

    for (var _i2 = 0; _i2 < 10; _i2++) {
      if (array[_i2] === undefined) {
        library_containers[_i2].classList.toggle("none", true);
      } else {
        no_mutches.classList.toggle("none", true);

        rate_container[_i2].setAttribute("data-track", array[_i2].trackName);

        library_containers[_i2].classList.toggle("none", false);

        library_titles[_i2].innerText = array[_i2].trackName;

        library_audio[_i2].setAttribute("src", array[_i2].src);

        if (/^logIn/.test(document.cookie)) {
          rate_container[_i2].classList.toggle("none", false);

          if (rated.length !== 0) {
            if (rated.indexOf(array[_i2].trackName) !== -1) {
              rate_container[_i2].classList.toggle("none", true);

              rate_text[_i2].innerText = "Voted!";
            } else {
              rate_text[_i2].innerText = "";
            }
          }
        } else {
          rate_container[_i2].classList.toggle("none", true);
        }
      } //If no search results, then show message and if user in not on main library, then show him 'Back to main library' button


      if (array.length === 0) {
        no_mutches.classList.toggle("none", false);
      }
    }
  } // Display songs and their names on a page


  displayContent(soundtracks_array); //Added '-active' class to set up defoult chosed controler

  library_controls[0] === undefined ? true : library_controls[0].className += "-active"; //Added event on all library controls (pagination functionality)

  var _loop = function _loop(_i3) {
    library_controls[_i3].onclick = function (e) {
      var curent_page = +e.target.innerText,
          soundtracks_count = library_controls[_i3].innerText + 0,
          show_on_page = soundtracks_array.slice(+soundtracks_count - 10, +soundtracks_count);
      displayContent(show_on_page); //Redrawing Controls when user click on it

      if (curent_page === max_page) {
        for (var _i5 = 0; _i5 < library_controls.length; _i5++) {
          if (library_controls[_i5].classList.contains("library__bottom-controlsItem-active")) {
            library_controls[_i5].className = "library__bottom-controlsItem";
          }
        }

        e.target.className += "-active";
      } else if (max_page - curent_page === 1) {
        if (library_controls.length < 5) {
          for (var _i6 = 0; _i6 < library_controls.length; _i6++) {
            if (library_controls[_i6].classList.contains("library__bottom-controlsItem-active")) {
              library_controls[_i6].className = "library__bottom-controlsItem";
            }
          }

          library_controls[library_controls.length - 2].className += "-active";
        } else {
          controllersRedrawing(-4, max_page, 3);
        }
      } else if (curent_page >= 3) {
        controllersRedrawing(-2, curent_page, 2);
      } else if (curent_page === 2) {
        controllersRedrawing(1, 0, 1);
      } else {
        for (var _i7 = 0; _i7 < library_controls.length; _i7++) {
          if (library_controls[_i7].classList.contains("library__bottom-controlsItem-active")) {
            library_controls[_i7].className = "library__bottom-controlsItem";
          }
        }

        e.target.className += "-active";
      }
    };
  };

  for (var _i3 = 0; _i3 < library_controls.length; _i3++) {
    _loop(_i3);
  } //Event for first\last page button's, if they are on a page


  if (document.querySelector(".library__bottom-beginning-btn")) {
    document.querySelector(".library__bottom-beginning-btn").onclick = function () {
      displayContent(soundtracks_array);
      controllersRedrawing(1, 0, 0);
    };

    document.querySelector(".library__bottom-end-btn").onclick = function (e) {
      var tracks_count = soundtracks_array.length % 10 === 0 ? 10 : soundtracks_array.length % 10,
          show_on_page = soundtracks_array.slice(-tracks_count);
      displayContent(show_on_page);

      if (library_controls.length === 5) {
        controllersRedrawing(-4, max_page, 4);
      } else {
        for (var _i4 = 0; _i4 < library_controls.length; _i4++) {
          if (library_controls[_i4].classList.contains("library__bottom-controlsItem-active")) {
            library_controls[_i4].className = "library__bottom-controlsItem";
          }
        }

        library_controls[library_controls.length - 1].className += "-active";
      }
    };
  }
}
},{"@babel/runtime/helpers/asyncToGenerator":12,"@babel/runtime/helpers/interopRequireDefault":14,"@babel/runtime/regenerator":18}],10:[function(require,module,exports){
"use strict";

var SOUNDTRACKS_DATA = require('./soundtracks_library.js');

document.getElementsByClassName("header__upload-button")[0].onclick = function (event) {
  var upload_form = document.getElementsByClassName("header__upload-form")[0],
      upload_btn = document.getElementsByClassName("header__upload-button")[0],
      upload_input = document.getElementById("upload"),
      upload_genre;

  if (/^logIn/.test(document.cookie)) {
    upload_form.classList.toggle("active", true); //Close upload form if click somewhere else

    document.onclick = function (e) {
      if (e.target !== upload_btn && e.target !== upload_form && !upload_form.contains(e.target)) {
        upload_form.classList.remove("active");
      }
    }; //Get genre of song (value of option)


    Array.from(document.getElementsByClassName("header__upload-option"), function (e) {
      e.onclick = function () {
        upload_genre = e.value;
      };
    }); //When file uploaded, add it to soundtracks base and LS

    upload_input.onchange = function () {
      for (i = 0; i < upload_input.files.length; i++) {
        var upload_song = {
          src: "music/" + upload_input.files[i].name,
          trackName: upload_input.files[i].name.split(".mp3")[0],
          genre: upload_genre,
          album: "Uploaded",
          rating: []
        };
        SOUNDTRACKS_DATA.soundtracks_base.push(upload_song);

        try {
          localStorage.setItem("soundtracks_base", JSON.stringify(SOUNDTRACKS_DATA.soundtracks_base));
        } catch (e) {
          alert(e.name);
        }
      }

      upload_form.classList.toggle("active", false);
    };
  } else {
    alert("Please login first or create acount!");
  }
};
},{"./soundtracks_library.js":9}],11:[function(require,module,exports){
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{}],12:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{}],13:[function(require,module,exports){
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{}],14:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],15:[function(require,module,exports){
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],16:[function(require,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],17:[function(require,module,exports){
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":11,"./iterableToArray":15,"./nonIterableSpread":16}],18:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":19}],19:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}]},{},[6,9,10,2,7,3,1,5,4,8]);
