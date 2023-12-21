function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

function myFunctions(i) {
    i.classList.toggle("change");

    let menu = document.getElementById("mylink");
    if (menu.className === 'menu') {
      menu.className += ' menu-active'
    }   else {
      menu.className = "tapbar";
      menu.className = "menu";
    }
}

function activeshowPage(){
  let MyVar = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById('preLoader').style.display = 'none';
  document.getElementById('pageContent').style.display = 'block';
}

function myFunctions1(m) {
  m.classList.toggle("P2-active");
  let bar = document.getElementById("baricon");
  if (bar.className === 'tapbar') {
    bar.className += ' tapbar-active'
   }   else {
    bar.className = "tapbar";
   }
}