(function ($) {
  "use strict";

  //*** Loader Start
  $(window).on("load", function () {
    $(".codex-loader").fadeOut("slow");
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("header").addClass("sticky");
      $("header.land-header").removeClass("fixed");
    } else {
      $("header").removeClass("sticky");
      $("header.land-header").addClass("fixed");
    }
  });
  $(document).on("click", ".menu-action", function () {
    $(".menu-list").toggleClass("open");
    $(".cdx-layer").toggleClass("open");
    $(this).toggleClass("toggle-active");
  });
  if ($(window).width() < 1200) {
    $(".submenu-list,.secodnmenu-list").slideUp("");
    $(".menu-list li.menu-item > a").on("click", function () {
      $(this).parents(".menu-list").find(".submenu-list").slideUp("");
      $(this).parents(".menu-list").find(".secodnmenu-list").slideUp("");
      if ($(this).next(".submenu-list").is(":hidden")) {
        $(this).next(".submenu-list").slideToggle("");
      }
    });
    $(".menu-list li.sub-menu-item > a").on("click", function () {
      $(this).parents(".menu-list").find(".secodnmenu-list").slideUp("");
      if ($(this).next(".secodnmenu-list").is(":hidden")) {
        $(this).next(".secodnmenu-list").slideToggle("");
      }
    });
    $(".land-header .menu-list li").on("click", function () {
      $(".menu-list").removeClass("open");
      $(".cdx-layer").removeClass("open");
      $(".menu-action").removeClass("toggle-active");
    });
    $(document).on("click", ".cdx-layer", function () {
      $(".menu-list").removeClass("open");
      $(this).removeClass("open");
      $(".menu-action").removeClass("toggle-active");
    });
  }

  //*** Filter Start
  $(".cdx-tabs li").on("click", function () {
    $(this).siblings("li.active").removeClass("active");
    $(this).addClass("active");
  });

  //*** Back To Top
  $(window).scroll(function () {
    if ($(window).scrollTop() > 450) {
      $(".scroll-top").addClass("show");
    } else {
      $(".scroll-top").removeClass("show");
    }
  });
  $(document).ready(function () {
    $(document).on("click", ".scroll-top", function () {
      $("html, body").animate({ scrollTop: 0 }, "450");
    });
  });

  // about counter
  $(".counter").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });

  // *** Password Hide Show
  $(".toggle-show").click(function () {
    var inp = $(".showhide-password");
    if (inp.attr("type") == "password") {
      setTimeout(function () {
        inp.attr("type", "text");
        $(".toggle-show").addClass("fa-eye-slash");
      }, 250);
    } else {
      setTimeout(function () {
        inp.attr("type", "password");
        $(".toggle-show").removeClass("fa-eye-slash");
      }, 250);
    }
  });

  //*** customzier start
  if (localStorage.getItem("screenMode") == "darkmode-btn") {
    $("body").addClass("darkmode");
    $(".darkmode-btn").fadeOut();
    $(".lightmode-btn").fadeIn();
  }
  $(".lightmode-btn").click(function () {
    localStorage.setItem("screenMode", "lightmode-btn");
    $("body").removeClass("darkmode");
    $(this).fadeOut();
    $(".darkmode-btn").fadeIn();
  });
  $(".darkmode-btn").click(function () {
    localStorage.setItem("screenMode", "darkmode-btn");
    $("body").addClass("darkmode");
    $(this).fadeOut();
    $(".lightmode-btn").fadeIn();
  });
})(jQuery);

//*** sal js
sal({
  threshold: 0.01,
  // 'once': !![]
  once: false,
});
