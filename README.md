
Generate a customizable navigation bar at the top of your webpage using this Javascript Library

In your webpage, include the nav.css and nav.js files in the <head> tag.
You may render a navigation bar at the top of your webpage using the example below:



var navProps = { 
  title: "My Nav Bar",
  responseWidth: 600,
  menuItems: {
    "Home": {
      subItems: {
        "More Info" : {
          onClick: function(){alert("More Info");}
        },
        "Email" : {
          onClick: function(){alert("Email");}
        }
      }
    },
    "Contact": {
      onClick: function(){ },
      subItems: {
        "More Info" : {
          link: "http://google.com",
          onClick: function(){alert("More Info");}
        },
        "Email" : {
          onClick: function(){alert("Email");}
        }
      }
    },
    "Shop": {
      onClick: function(){ alert("Shop"); },
      subItems: {
        "More Info" : {
          link: "http://google.com",
          onClick: function(){alert("More Info");}
        },
        "Email" : {
          onClick: function(){alert("Email");}
        }
      }
    }
  }
}

var myNav = new EzNav(navProps);
