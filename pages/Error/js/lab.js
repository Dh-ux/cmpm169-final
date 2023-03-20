var countdown = function(timeout){
    var countUI = document.getElementById("count");
    if(!!countUI){
        countUI.innerHTML = timeout;
        if(timeout == 0){
            const leftBlock = document.querySelector("#leftBlock");
            const rightBlock = document.querySelector("#rightBlock");
            leftBlock.style.transform = "translateX(0)";
            leftBlock.style.background = "#140202";
            leftBlock.style.opacity = "1";
            rightBlock.style.transform = "translateX(0)";
            rightBlock.style.background = "#140202";
            rightBlock.style.opacity = "1";
            returnMain();
        }
        else{
            timeout --;
            setTimeout(function(){
                countdown(timeout)
            }, 1000);
        }
    }
}
function init(){
    countdown(5);
}

function delay() {
    return new Promise((resolve) => {
      setTimeout(resolve, 6000);
    });
}

async function returnMain(){
    await delay();
    window.location.href = '../../index.html';
}