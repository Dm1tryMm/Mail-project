window.onload = onWindowLoaded;

function onWindowLoaded() {
    tryToListen('submit_form', 'click', checkForm);
}

function getById(id) {
    return document.getElementById(id);
}

function tryToListen(id, eventName, newFunction) {
    var element = getById(id);
    if (element) {
        element.addEventListener(eventName, newFunction);
    }
}

function removeBorder() {
    this.removeEventListener('focus', removeBorder);
    this.classList.remove('incorrect');
}

function checkFields() {
    var notEmpty = true;
    var elements = ['login', 'password'];
    
    for (var i = 0; i < elements.length; ++i) {
        var textField = getById(elements[i]);
        if (textField.value === '') {
            textField.classList.add('incorrect');
            textField.addEventListener('focus', removeBorder);
            notEmpty = false;
        }
    }
    
    return notEmpty;
}

function closeModalWindow() {
    var modalBackground = getById('modal_window');
    modalBackground.style.display = 'none';
    var passwordField = getById('password');
    passwordField.value = '';
}

function checkForm() {
    if (!checkFields()) {
        event.preventDefault();
    } else {
        event.preventDefault();
        var modalBackground = getById('modal_window');
        modalBackground.style.display = 'flex';
        tryToListen('modal_window', 'click', closeModalWindow);
    }
}