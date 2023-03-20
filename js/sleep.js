var timeout = null;
var initial_sleep = true;

function resetTimer(init = false) {
    if (!initial_sleep) {
        clearTimeout(timeout);
        timeout = setTimeout(goToSleep, 6000); // set timeout to 0.2 minutes
        wakeUp();
    }
}

function goToSleep() {
    // hide the interface and the icon
    reset_star()
    document.getElementById('interface').style.display = 'none';
    document.getElementById('icon').style.display = 'none';
    document.getElementById('datetime').style.display = 'none';
}

function wakeUp() {
    launch_star()
    // show the interface and the icon
    document.getElementById('interface').style.display = 'block';
    document.getElementById('icon').style.display = 'block';
    document.getElementById('datetime').style.display = 'block';
}

function initWakeUp() {
    if (initial_sleep) {
        initial_sleep = false;
        wakeUp();
    }
}

setTimeout(initWakeUp, 9000);

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);
document.addEventListener('mousedown', resetTimer);
document.addEventListener('keydown', initWakeUp);
document.addEventListener('mousedown', initWakeUp);
document.addEventListener('touchstart', resetTimer);
document.addEventListener('touchmove', resetTimer);

goToSleep();
