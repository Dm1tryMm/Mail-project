window.onload = onWindowLoaded;

function onWindowLoaded() {
    checkBoxes();
    tryToListen('side_menu_button', 'click', changeStateOfMenu);
    checkSwipe();
}

function tryToListen(id, eventName, newFunction) {
    var element = getById(id);
    if (element) {
        element.addEventListener(eventName, newFunction);
    }
}

function getById(id) {
    return document.getElementById(id);
}

function getByClassName(parentElement, childClass) {
    return parentElement.getElementsByClassName(childClass);
}

function changeStateOfMenu(event) {
    var menu = getById('side_menu');
    if (menu.classList.contains('invisible')){
        menu.classList.remove('invisible');
    } else {
        menu.classList.add('invisible');
    }
}

function changeState() {
    var secondParent = getByClassName(this.parentNode, 'folder_list');
    if (secondParent[0].classList.contains('invisible')){
        secondParent[0].classList.remove('invisible');
    } else {
        secondParent[0].classList.add('invisible');
    }
}

function checkBoxes() {
    var firstParent = getById('first_parent');
    var firstChildren = getByClassName(firstParent, 'mailbox_list_item');
    for (var i = 0; i < firstChildren.length; ++i) {
        var secondParrentButton = getByClassName(firstChildren[i], 'mailbox_item_name');
        if (secondParrentButton[0]) {
            secondParrentButton[0].addEventListener('click', changeState);
        }
    }
}

function checkSwipe() {
    var startPozX;
    var endPozX;
    var startPozY;
    var endPozY;
    var mainBlock = getById('main_container');
    mainBlock.addEventListener("touchstart", function(e) {
        e = e || window.event;
        startPozX = e.changedTouches[0].pageX;
        startPozY = e.changedTouches[0].pageY;
    });

    mainBlock.addEventListener("touchend", function(e) {
        e = e || window.event;
        endPozX = e.changedTouches[0].pageX;
        endPozY = e.changedTouches[0].pageY;
        var swipeX = endPozX - startPozX;
        var swipeY = endPozY - startPozY;
        var menu = getById('side_menu');
        if ((Math.abs(swipeY) < 50) && (((swipeX > 100) && (menu.classList.contains('invisible'))) || ((swipeX < -100) && !(menu.classList.contains('invisible'))))) {
            changeStateOfMenu();
        }
    })
}