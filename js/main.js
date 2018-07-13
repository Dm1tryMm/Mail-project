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

function checkForm() {
    if (!checkFields()) {
        event.preventDefault();
    } else {
        event.preventDefault();
        var errorMessage = getById('error_message');
        errorMessage.style.display = 'block';
    }
}