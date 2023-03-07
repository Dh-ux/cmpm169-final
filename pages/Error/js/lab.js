var countdown = function(timeout){
    var countUI = document.getElementById("count");
    if(!!countUI){
        countUI.innerHTML = timeout;
        if(timeout == 0){
            alert("end");
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
    countdown(60);
}