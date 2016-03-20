window.onload = function() {

    // first populate the array with two events for retrieving
    var eventList = [{
        eventName: 'First training Class',
        eventType: 'Sports Game',
        eventHost: 'Steven Cook',
        startTime: 'Morning Feb. 22, 2016',
        endTime: 'Afternoon Feb. 22, 2016',
        gestList: 'All yoga team members',
        location: '1135 Easton Ave., Somerset, NJ',
        description: 'Bring your gears and energy'
    }, {
        eventName: 'Gravitational Waves',
        eventType: 'Conference talk',
        eventHost: 'Steven Cook',
        startTime: 'Afternoon March 02, 2016',
        endTime: 'Night March 02, 2016',
        gestList: 'All PhD candidates',
        location: '24 Redcliffe Ave., Piscataway, NJ',
        description: 'Bring your laptop'
    }];

    var eventItem = {
        eventName: '',
        eventType: '',
        eventHost: '',
        startTime: '',
        endTime: '',
        gestList: '',
        location: '',
        description: ''
    };

    var userInfo = {
        userName: '',
        userEmail: '',
        userPassword: '',
    };

    var signInEmail = document.getElementById('signin-email');

    var fullnameInput = document.getElementById('name');
    var firstEmailInput = document.getElementById('first-email');
    var secondEmailInput = document.getElementById('second-email');
    var firstPasswordInput = document.getElementById('first-password');
    var secondPasswordInput = document.getElementById('second-password');
    var employerInput = document.getElementById('employer');
    var jobTitleInput = document.getElementById('job-title');

    var eventNameInput = document.getElementById('event-name');
    var eventTypeInput = document.getElementById('event-type');
    var eventHostInput = document.getElementById('event-host');
    var eventStartTimeInput = document.getElementById('start-time');
    var eventEndTimeInput = document.getElementById('end-time');
    var eventGuestInput = document.getElementById('guest-list');
    var eventLocationInput = document.getElementById('location');

    var checkEventInfo = document.getElementById('check-event');
    var signInButton = document.getElementById('signin-button');
    var submitPersonalInfo = document.getElementById('personal-information');
    var submitEventInfo = document.getElementById('create-event');

    var signInForm = document.getElementById('signin-form');
    var personalInfoForm = document.getElementById('personalinfo-form');
    var eventInfoForm = document.getElementById('event-form');

    // when click a tab to load a new form, set autofocus to the 1st input of the form
    $('#signin-tab').on('click', function() {
        setTimeout(function() {
            $('#signin-form :input:enabled:visible:first').focus();
        }, 10);
    });

    $('#signup-tab').on('click', function() {
        setTimeout(function() {
            $('#personalinfo-form :input:enabled:visible:first').focus();
        }, 10);
    });

    $('#createevent-tab').on('click', function() {
        setTimeout(function() {
            $('#event-form :input:enabled:visible:first').focus();
        }, 10);
    });

    // store eventList to sessionStorage first for retrieving
    var eventStorage = window.sessionStorage;
    for (var i = 0, len = eventList.length; i < len; i++) {
        var key = i.toString();
        var value = JSON.stringify(eventList[i]);
        eventStorage.setItem(key, value);
    }

    // setup template for displaying the upmcoming event,
    // here I take the first event stored
    var upcomingEventTemplate = Handlebars.compile(document.getElementById("upcomingevent-entry").innerHTML);
    var upcomingEvent = JSON.parse(eventStorage.getItem(window.sessionStorage.key(0)));
    document.getElementById("upcoming-event").innerHTML = upcomingEventTemplate(upcomingEvent);

    //Convert address tag to google map link
    var mapLink = document.getElementById("upcomingevent-address");
    var linkContent = "<a href='http://maps.google.com/maps?q=" + encodeURIComponent(mapLink.textContent) + "' target='_blank'>" + mapLink.textContent + "</a>";
    mapLink.innerHTML = linkContent;


    // Toggle input controls with '.dirty' calss to show invalid styling only when the user has visited the field by
    // combing the code below with CSS (input.dirty:invalid and input.dirty:valid on styles.css)
    var inputs = document.querySelectorAll("input.my-control");
    var inputs_len = inputs.length;
    var addDirtyClass = function(evt) {
        evt.target.classList.toggle("dirty");
    };

    for (var j = 0; j < inputs_len; j++) {
        var input = inputs[j];
        input.addEventListener("blur", addDirtyClass);
        input.addEventListener("invalid", addDirtyClass);
        input.addEventListener("valid", addDirtyClass);
    }

    // check registered events
    checkEventInfo.addEventListener('click', function() {

        var eventStorage = window.sessionStorage;
        var eventTemplate = Handlebars.compile(document.getElementById("event-entry").innerHTML);
        var eventSum = '';
        for (var i = 0, len = eventStorage.length; i < len; i++) {
            var key = eventStorage.key(i);
            var value = JSON.parse(eventStorage.getItem(key));
            eventSum += eventTemplate(value);
        }

        document.getElementById("registeredevent-container").innerHTML = eventSum;

    });

    //  handle sign-in form
    signInButton.addEventListener('click', function() {
        document.getElementById('signin-message').innerHTML =
            '<br>It is just a test. Please go to Sign up and Create event pages.';

        signInForm.reset();

        // toggle the input control in the signin form with class '.dirty'
        for (var i = 0; i < 2; i++) {
            var input = inputs[i];
            input.classList.toggle("dirty");
        }
    }, false);

    //  check if first password is valid
    firstEmailInput.addEventListener('blur', function() {
        var firstEmail = firstEmailInput.value;
        var firstEmailInfo = document.getElementById("firstemail-info");

        if (firstEmail.length !== 0) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(firstEmail))) {
                firstEmailInfo.style.display = 'block';
            } else {
                firstEmailInfo.style.display = 'none';
            }
        }

    }, false);

    // handle cases when doing autocomplte or autofill
    var firstEmailCheck = false;
    firstEmailInput.addEventListener('input', function() {
        var firstEmail = firstEmailInput.value;

        if (firstEmail.length !== 0) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(firstEmail))) {
                firstEmailCheck = false;
            } else {
                firstEmailCheck = true;
            }
        }

    }, false);

    // check if second password match
    secondEmailInput.addEventListener('blur', function() {
        var secondEmailInfo = document.getElementById("secondemail-info");
        var firstEmail = firstEmailInput.value;
        var secondEmail = secondEmailInput.value;

        if (firstEmail !== secondEmail) {
            secondEmailInfo.style.display = 'block';
        } else {
            secondEmailInfo.style.display = 'none';
        }

    }, false);

    // handle cases when doing autocomplte or autofill
    var secondEmailCheck = false;
    secondEmailInput.addEventListener('input', function() {
        var firstEmail = firstEmailInput.value;
        var secondEmail = secondEmailInput.value;

        if (firstEmail !== secondEmail) {
            secondEmailCheck = false;
        } else {
            secondEmailCheck = true;
        }

    }, false);

    // handle password inputs validation
    var passwordLength = document.getElementById("password-length");
    var passwordLower = document.getElementById("password-lower");
    var passwordUpper = document.getElementById("password-upper");
    var passwordNumber = document.getElementById("password-number");
    var specialCharacters = document.getElementById("special-characters");
    var illegalCharacters = document.getElementById("illegal-characters");

    var firstPasswordCheck = false;
    var lengthCheck = false;
    var numberCheck = false;
    var lowerCheck = false;
    var upperCheck = false;
    var specialCheck = false;
    var illegalCheck = false;

    firstPasswordInput.addEventListener('keyup', function() {
        var firstPassword = firstPasswordInput.value;

        //check password length
        if (firstPassword.length < 6) {
            passwordLength.classList.remove('password-valid');
            passwordLength.classList.add('password-invalid');
            lengthCheck = false;
        } else {
            passwordLength.classList.add('password-valid');
            passwordLength.classList.remove('password-invalid');
            lengthCheck = true;
        }

        //check numbers in the password
        if (!firstPassword.match(/\d/g)) {
            passwordNumber.classList.remove('password-valid');
            passwordNumber.classList.add('password-invalid');
            numberCheck = false;
        } else {
            passwordNumber.classList.add('password-valid');
            passwordNumber.classList.remove('password-invalid');
            numberCheck = true;
        }

        //check lower letters in the password
        if (!firstPassword.match(/[a-z]/g)) {
            passwordLower.classList.remove('password-valid');
            passwordLower.classList.add('password-invalid');
            lowerCheck = false;
        } else {
            passwordLower.classList.add('password-valid');
            passwordLower.classList.remove('password-invalid');
            lowerCheck = true;
        }

        //check upper letters in the password
        if (!firstPassword.match(/[A-Z]/g)) {
            passwordUpper.classList.remove('password-valid');
            passwordUpper.classList.add('password-invalid');
            upperCheck = false;
        } else {
            passwordUpper.classList.add('password-valid');
            passwordUpper.classList.remove('password-invalid');
            upperCheck = true;
        }

        //check special characters in the password
        if (!firstPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
            specialCharacters.classList.remove('password-valid');
            specialCharacters.classList.add('password-invalid');
            specialCheck = false;
        } else {
            specialCharacters.classList.add('password-valid');
            specialCharacters.classList.remove('password-invalid');
            specialCheck = true;
        }

        //check illegal characters in the password
        if (firstPassword.length !== 0) {
            if (!firstPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)) {
                illegalCharacters.classList.remove('password-invalid');
                illegalCharacters.classList.add('password-valid');
                illegalCheck = true;
            } else {
                illegalCharacters.classList.remove('password-valid');
                illegalCharacters.classList.add('password-invalid');
                illegalCheck = false;
            }
        } else {
            illegalCharacters.classList.remove('password-valid');
            illegalCharacters.classList.add('password-invalid');
            illegalCheck = false;
        }

    }, false);

    firstPasswordInput.addEventListener('focus', function() {
        document.getElementById("password-requirements").style.display = 'block';
    }, false);

    firstPasswordInput.addEventListener('blur', function() {
        document.getElementById("password-requirements").style.display = 'none';
        if (lengthCheck === true && numberCheck === true && lowerCheck === true &&
            upperCheck === true && specialCheck === true && illegalCheck === true) {
            firstPasswordCheck = true;
        } else {
            firstPasswordCheck = false;
        }
    }, false);

    //  check if second password matches the first one
    var secondPasswordCheck = false;
    secondPasswordInput.addEventListener('blur', function() {
        var firstPassword = firstPasswordInput.value;
        var secondPassword = secondPasswordInput.value;
        var matchRequirements = document.getElementById("match-requirements");

        if (firstPassword !== secondPassword) {
            matchRequirements.style.display = 'block';
            secondPasswordCheck = false;
        } else {
            matchRequirements.style.display = 'none';
            secondPasswordCheck = true;
        }

    }, false);

    // handle submiting form of personal information
    var signupSuccess;
    var signupFailure;
    submitPersonalInfo.addEventListener('click', function() {

        //if sign-up form is valid and meet other requirements, then
        if (personalInfoForm.checkValidity() === true && firstEmailCheck === true && secondEmailCheck === true &&
            firstPasswordCheck === true && secondPasswordCheck === true) {
            // fill up personal information part
            userInfo.userName = fullnameInput.value;
            userInfo.userEmail = firstEmailInput.value;
            userInfo.userPassword = firstPasswordInput.value;

            // toggle input controls in the signup form with class '.dirty'
            inputs[2].classList.toggle("dirty");
            for (var i = 5; i < 9; i++) {
                var input = inputs[i];
                input.classList.toggle("dirty");
            }

            personalInfoForm.reset();
            signupSuccess = document.getElementById("signup-success");
            signupSuccess.style.display = 'block';
            setTimeout(function() {
                signupSuccess.style.display = 'none';
            }, 3000);
            return false;

          // if sign-up form is invalid
        } else {

            signupFailure = document.getElementById("signup-failure");
            signupFailure.style.display = 'block';
            setTimeout(function() {
                signupFailure.style.display = 'none';
            }, 3000);
            return false;
        }

    });


    //do time input validation
    var timeCheck = false;
    var timeInfo = document.getElementById('time-info');
    eventEndTimeInput.addEventListener('blur', function() {
        var eventStartTime = new Date(eventStartTimeInput.value);
        var eventEndTime = new Date(eventEndTimeInput.value);
        if (eventStartTime > eventEndTime) {
            timeCheck = false;
            timeInfo.style.display = "block";
        } else {
            timeCheck = true;
            timeInfo.style.display = "none";
        }
    });

    // handle submitting event information
    var eventSuccess;
    var eventFailure;
    submitEventInfo.addEventListener('click', function() {

        if (eventInfoForm.checkValidity() === true && timeCheck === true) {
            eventItem.eventName = eventNameInput.value;
            eventItem.eventType = eventTypeInput.value;
            eventItem.eventHost = eventHostInput.value;
            eventItem.startTime = eventStartTimeInput.value;
            eventItem.endTime = eventEndTimeInput.value;
            eventItem.guestList = eventGuestInput.value;
            eventItem.location = eventLocationInput.value;
            console.log(eventStartTimeInput.value);
            console.log(eventEndTimeInput.value);

            eventList.push(eventItem);

            var eventStorage = window.sessionStorage;
            for (var i = 0, len = eventList.length; i < len; i++) {
                var key = i.toString();
                var value = JSON.stringify(eventList[i]);
                eventStorage.setItem(key, value);
            }

            // reset eventItem object for next inputs
            eventItem = {
                eventName: '',
                eventType: '',
                eventHost: '',
                startTime: '',
                endTime: '',
                gestList: '',
                location: '',
                description: ''
            };

            // toggle input controls in create event formt with the class '.dirty'
            for (var j = 9; j < inputs_len; j++) {
                var input = inputs[j];
                input.classList.toggle("dirty");
            }

            eventSuccess = document.getElementById("event-success");
            eventSuccess.style.display = 'block';
            setTimeout(function() {
                eventSuccess.style.display = 'none';
            }, 4000);

            eventInfoForm.reset();
            return false;
        } else {

            eventFailure = document.getElementById("event-failure");
            eventFailure.style.display = 'block';
            setTimeout(function() {
                eventFailure.style.display = 'none';
            }, 4000);
            return false;
        }

    });


};