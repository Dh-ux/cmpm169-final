var timeout = null;

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(goToSleep, 30000); // set timeout to 2 minutes
    wakeUp();
}

function goToSleep() {
    // hide the interface and the icon
    document.getElementById('interface').style.display = 'none';
    document.getElementById('icon').style.display = 'none';
    document.getElementById('datetime').style.display = 'none';
}

function wakeUp() {
    // show the interface and the icon
    document.getElementById('interface').style.display = 'block';
    document.getElementById('icon').style.display = 'block';
    document.getElementById('datetime').style.display = 'block';
}

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);
document.addEventListener('mousedown', resetTimer);
document.addEventListener('touchstart', resetTimer);
document.addEventListener('touchmove', resetTimer);

goToSleep();
