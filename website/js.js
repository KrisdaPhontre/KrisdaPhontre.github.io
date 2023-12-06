let ct = document.getElementsByClassName("content");
let i;

for (i = 0; i < ct.length; i++) {
    ct[i].addEventListener("click", function(){
        this.classList.toggle("active");
    

    let profile = this.nextElementSibling;
    if(profile.style.display === "block") {
        profile.style.display = "none";
    }
    else {
        profile.stle.display = "block";
    }
 });
}