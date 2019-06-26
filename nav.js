var navFunctions = [];
var subNavFunctions = [];
var responseWidth;
class EzNav {

  constructor(props) {
    this.title =  props.title ? props.title : "";
    this.menuItems = props.menuItems ? props.menuItems: false;
    this.responseWidth = props.responseWidth ? props.responseWidth : 768;
    var el = document.createElement("div");
    document.body.appendChild(el);
    el.innerHTML = this.generateNav();
  }

  generateNav() {
    var navHTML;
    var mobileList;
    var css = '@media all and (max-width:'+this.responseWidth+'px){.menuItem{display:none;} .navButton{display:block;}} @media all and (min-width:'+this.responseWidth+'px){.mobileMenuItemContainer{display:none;}} ',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    navHTML += "<header class='navContainer'>";
    navHTML += "<div style=height:50px;>";
    navHTML += "<h1 class='navTitle'>" + this.title + "</h1>";
    navHTML += "<nav class='menuContainer'><ul class='menuList'>";
    var menuIndex = 0;
    var subMenuIndex = 0;
    for (var title in this.menuItems) {
      if (this.menuItems[title].onClick) {
        navFunctions.push(this.menuItems[title].onClick);
      } else {
        navFunctions.push("");
      }

      if (this.menuItems[title].subItems) {
        navHTML += "<li class='menuItem' onClick=showSubItems("+menuIndex+",'menu')>" + title;
      } else {
        navHTML += "<li class='menuItem' onClick=doOnCLick(" + menuIndex + ");goToURL('" + this.menuItems[title].link + "','" + this.menuItems[title].target + "')>" + title;
      }

      navHTML += "<div class='subItems subItem"+menuIndex+"'><div class='arrowUp'></div><ul class='menuList'>";
      for(let subItem in this.menuItems[title].subItems) {
        navHTML += "<li class=innerSubItem onClick=doSubOnCLick(" + subMenuIndex + ");goToURL('" + this.menuItems[title].subItems[subItem].link + "','" + this.menuItems[title].subItems[subItem].target + "')>" + subItem + "</li>";
        if (this.menuItems[title].subItems[subItem].onClick) {
          subNavFunctions.push(this.menuItems[title].subItems[subItem].onClick);
        } else {
          subNavFunctions.push("");
        }
          subMenuIndex++;
        }
      navHTML += "</ul></div>";
      navHTML += "</li>";
      menuIndex++;
    }

    navHTML += "<button class='navButton' onClick=showMobileMenu()><div class='iconbar'></div><div class='iconbar'></div><div class='iconbar'></div></button>";
    navHTML += "</ul></nav>";
    navHTML += "</div>";
    navHTML +="<nav class='mobileMenuItemContainer'><ul class='menuList'>";
    menuIndex = 0;
    subMenuIndex = 0;
    for (let title in this.menuItems) {
      if (this.menuItems[title].subItems) {
        navHTML += "<li class='mobileMenuItem' onClick=showMobileSubItems("+menuIndex+")><div class='arrowDown arrowDown"+menuIndex+"' style='display:none'></div><div class='arrowSide arrowSide"+menuIndex+"'></div>" + title + "</li>";
      } else {
        navHTML += "<li class='mobileMenuItem' onClick=doOnCLick(" + menuIndex + ");goToURL('" + this.menuItems[title].link + "','" + this.menuItems[title].target + "')>" + title + "</li>";
      }
      for(let subItem in this.menuItems[title].subItems) {
        navHTML += "<li class='mobileSubItem mobileSubItem"+menuIndex+"' onClick=doSubOnCLick(" + subMenuIndex + ");goToURL('" + this.menuItems[title].subItems[subItem].link + "','" + this.menuItems[title].subItems[subItem].target + "')>" + subItem + "</li>";
        subMenuIndex++;
      }
      menuIndex++;
    }
    navHTML += "</ul></nav>";
    navHTML += "</header>";
    responseWidth = this.responseWidth;
    return navHTML;
  }

}


var showMobileMenu = () => {
    let element = document.querySelectorAll(".mobileMenuItemContainer")[0],
    style = window.getComputedStyle(element),
    height = style.getPropertyValue('height').replace("px","");
    let menuHeight = getMenuHeight();
    if(height < 1) {
      animateMenu(0, menuHeight);
      return;
    }
    hideMenu(menuHeight, 0);

}

var animateMenu = (currentHeight, targetHeight) => {
  if (currentHeight < targetHeight + 2) {
    document.querySelector(".mobileMenuItemContainer").style.height = currentHeight + "px";
    setTimeout(() => { animateMenu(currentHeight + 2, targetHeight)  },1);
  }
}

var hideMenu = (currentHeight, targetHeight) => {
  if (currentHeight >= targetHeight - 2) {
    document.querySelector(".mobileMenuItemContainer").style.height = currentHeight + "px";
    setTimeout(() => { hideMenu(currentHeight - 2, targetHeight)  },1);
  }
}

var goToURL = (url, target) => {
  if (!url || url == "" || !url.trim() || url == "undefined") {
    return;
  }
  if (target == "_blank") {
    window.open(url);
    return;
  }
  window.location = url;
}

var doOnCLick = (menuIndex) => {
  if(navFunctions[menuIndex] != ""){
    navFunctions[menuIndex]();
    showMobileMenu();
  }
}

var doSubOnCLick = (subMenuIndex) => {
  if(subNavFunctions[subMenuIndex] != "") {
    subNavFunctions[subMenuIndex]();
    showMobileMenu();
  }
}


var mobileDisplaySet = new Set();
var showMobileSubItems = (menuIndex) => {
  let subItems = document.querySelectorAll(".mobileSubItem" + menuIndex);
  if (!mobileDisplaySet.has(menuIndex)) {
    for(i = 0; i < subItems.length; i++) {
      subItems[i].style.display = "block";
    }
    document.querySelector(".arrowDown" + menuIndex).style.display = 'block';
    document.querySelector(".arrowSide" + menuIndex).style.display = 'none';
    mobileDisplaySet.add(menuIndex);
  } else {
    for(i = 0; i < subItems.length; i++) {
      subItems[i].style.display = "none";
    }
    document.querySelector(".arrowDown" + menuIndex).style.display = 'none';
    document.querySelector(".arrowSide" + menuIndex).style.display = 'block';
    mobileDisplaySet.delete(menuIndex);
  }
  let menuHeight = getMenuHeight();
  document.querySelector(".mobileMenuItemContainer").style.height = menuHeight + "px";
}

var displaySet = new Set();
var showSubItems = (menuIndex) => {
    let lgSubItems = document.querySelectorAll(".subItems");
    for(let i = 0; i < lgSubItems.length; i++) {
      lgSubItems[i].style.display = "none";
    }
  let subItems = document.querySelectorAll(".subItem" + menuIndex);
  if (!displaySet.has(menuIndex)) {
    for(i = 0; i < subItems.length; i++) {
      subItems[i].style.display = "block";
    }
    displaySet.clear();
    displaySet.add(menuIndex);
  } else {
    for(i = 0; i < subItems.length; i++) {
      subItems[i].style.display = "none";
    }
    displaySet.delete(menuIndex);
  }
}

var getMenuHeight = () => {
  let menuHeight = document.querySelectorAll(".mobileMenuItem").length * 50;
  mobileDisplaySet.forEach(function(index){
    menuHeight += ((document.querySelectorAll(".mobileSubItem" + index).length) * 37);
  });
  return menuHeight;
}
