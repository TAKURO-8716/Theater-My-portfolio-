$(function () {
  function sleep(sleepFunc, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(sleepFunc());
      }, time);
    });
  }

  // カーテンを開く処理
  function openCurtain() {
    $("#curtain1").animate(
      {
        width: 20,
      },
      2100 // ←  2100s
    );
    $("#curtain2").animate(
      {
        width: 20,
      },
      2100 // ←  2100s
    );
  }

  // fullpage
  function fullpageStart() {
    $("#fullpage").fullpage({
      anchors: ["top", "about", "works", "contact", "endroll"],
      menu: "#menu",
      sectionsColor: ["#FCFDF6", "#F4FFF7", "#FFF5F5", "#F2F2FF", "#0F0F0F"],
      recordHistory: false,
      scrollHorizontally: true,
      loopHorizontal: false,
      autoScrolling: true,
      // scrollOverflow: true, //←効かない

      afterLoad: function (index, nextIndex, direction) {
        if (index.anchor == "top" && direction == "down") {
          $(".scrollDown").fadeOut(1000);
        } else if (index.anchor == "about" && direction == "up") {
          $(".scrollDown").fadeIn(1000);
        }

        if (index.anchor == "contact" && direction == "down") {
          $(".screen").css({
            boxShadow: "0 0 20px #fff",
            transition: "3s",
          });

          $(".roll_text").css({
            display: "block",
            animation: "anim-scroll-up 60s linear forwards",
          });

          if (window.matchMedia("(max-width:480px)").matches) {
            //スマホ処理
            setTimeout(() => {
              $(".roll_text").fadeOut(5000);
            }, 30000);
            $(".the_end").css({
              animationName: "the_end-fadeIn",
              animationDuration: "7s",
              animationDelay: "29s",
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
            });
          } else if (window.matchMedia("(min-width:481px)").matches) {
            //タブレット処理
            setTimeout(() => {
              $(".roll_text").fadeOut(5000);
            }, 33000);
            $(".the_end").css({
              animationName: "the_end-fadeIn",
              animationDuration: "7s",
              animationDelay: "32s",
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
              display: "block",
            });
          } else if (window.matchMedia("(min-width:1031px)").matches) {
            //PC処理
            setTimeout(() => {
              $(".roll_text").fadeOut(5000);
            }, 42500);
            $(".the_end").css({
              animationName: "the_end-fadeIn",
              animationDuration: "7s",
              animationDelay: "41s",
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
              display: "block",
            });
          }
        } else {
          $(".screen").css({
            boxShadow: "0 0 100px #fff",
            transition: "7s",
          });
        }

        if (index.anchor == "endroll" && direction == "up") {
          $(".the_end").css({
            animation: "none",
          });
          $(".roll_text").css({
            display: "none",
            animation: "none",
          });
        }
      },
    });
  }

  function opening() {
    sleep(() => {
      $("#black").fadeOut(2100);
      $("#curtain").fadeIn(2000);
    }, 2100)
      .then(() => {
        return sleep(() => {
          $("#opening_title").fadeIn();
        }, 1000);
      })
      .then(() => {
        return sleep(() => {
          $("#opening_title").fadeOut();
        }, 2600);
      })
      .then(() => {
        return sleep(() => {
          openCurtain();
        }, 700);
      })
      .then(() => {
        return sleep(() => {
          $("#film-container").fadeIn(1500);
        }, 100);
      })
      .then(() => {
        return sleep(() => {
          $("#curtain").fadeOut(2000);
        }, 2100);
      })
      .then(() => {
        return sleep(() => {
          $("#film-container").fadeOut(5000);
          $(".to_top").fadeIn(13000);
          $("#hamburger").fadeIn(13000);
          $(".side_nav").fadeIn(13000);
          $(".scrollDown").fadeIn(13000);
          $(".icon_wrap").fadeIn(13000).css("display", "flex");
        }, 4600);
      })
      .then(() => {
        return sleep(() => {
          fullpageStart();
        }, 1000);
      })
      .then(() => {
        return sleep(() => {
          $(".fullpage_wrap").fadeIn(8200);
        }, 2900);
      })
      .then(() => {
        return sleep(() => {
          $(".first_loading").hide();
        }, 5000);
      });
  }

  function init() {
    if (sessionStorage.getItem("access")) {
      // ここに2回目以降の処理
      $(".first_loading").hide();
      fullpageStart();
      $(".fullpage_wrap").fadeIn(6500);

      $(".to_top").css({
        display: "block",
      });
      $("#hamburger").css({
        display: "block",
      });
      $(".side_nav").css({
        display: "block",
      });
      $(".scrollDown").css({
        display: "block",
      });
      $(".icon_wrap").fadeIn(1).css({
        display: "flex",
      });
    } else {
      opening();

      sessionStorage.setItem("access", true);
    }
  }

  init();

  // ---------------------------------------------------

  var cursor = $(".cursor"),
    cWidth = 22, //カーソルの大きさ
    mouseX = 0, //マウスのX座標
    mouseY = 0; //マウスのY座標

  $(document).on("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    cursor.css({
      //カーソルの真ん中に座標軸が来るよう、
      //カーソルの大きさの半分を引きます
      left: mouseX - cWidth / 2,
      top: mouseY - cWidth / 2,
    });
  });

  var cursor_back = $(".cursor_back"),
    cbWidth = 16, //カーソルの大きさ
    mouseX = 0, //マウスのX座標
    mouseY = 0; //マウスのY座標

  $(document).on("mousemove", function (e) {
    mouseBX = e.pageX;
    mouseBY = e.pageY;
    cursor_back.css({
      //カーソルの真ん中に座標軸が来るよう、
      //カーソルの大きさの半分を引きます
      left: mouseBX - cbWidth / 2.3,
      top: mouseBY - cbWidth / 2.3,
    });
  });

  $(
    ".more, #hamburger, .to_top, .underlayer_to_top, #back_arrow_wrap, .side_nav ul li a, .hamburger_nav ul li, .works_content article a, .mail, .twitter, .fa-twitter, .insta, .theater_insta, .theater_blog, .contact_blog, .blog"
  ).hover(
    function () {
      cursor.css({
        width: "30px",
        transition: "0.1s",
      });
      cursor_back.css({
        width: "24px",
        height: "24px",
        transition: "0.1s",
      });
    },
    function () {
      cursor.css({
        width: "22px",
        transition: "0.1s",
      });
      cursor_back.css({
        width: "16px",
        height: "16px",
        transition: "0.1s",
      });
    }
  );

  $("#hamburger").click(function () {
    $(".hamburger_nav").fadeToggle();
    $(".hamburger_bg").fadeToggle();
    $(this).toggleClass("active");
  });

  $("#hamburger").hover(
    function () {
      $("#hamburger span").css({
        boxShadow: "0 0 5px #fff",
      });
    },
    function () {
      $("#hamburger span").css({
        boxShadow: "0 0 0 #000",
      });
    }
  );

  var screen_width = $(".screen").width();
  $(".film-container").css("width", screen_width + "px");
  $(".glitch__img").css("width", `${screen_width + 10}px`);

  var screen_height = $(".screen").height();
  $(".scroll_wrap").css("height", screen_height + "px");
  $(".film-container").css("height", screen_height + "px");
  $(".glitch__img").css("height", `${screen_height + 5}px`);

  var about_content_height = $(".about_content").height();

  var works_content_height = $(".works_content").height();
  if (window.matchMedia("(max-width:480px)").matches) {
    //スマホ処理
    $(".bg").css("height", `${works_content_height * 1.92}px`);
    $(".bg").css("height", `${about_content_height + 430}px`);
  } else if (window.matchMedia("(min-width:481px)").matches) {
    //タブレット処理
    $(".bg").css("height", `${works_content_height * 2.1}px`);
    $(".bg").css("height", `${about_content_height * 1.1}px`);
  }

  if (window.matchMedia("(min-width:1031px)").matches) {
    //PC処理
    $(".bg").css("height", `${works_content_height + 426}px`);
    $(".bg").css("height", `${about_content_height + 426}px`);
  }

  var hover_css = {
    filter: "grayscale(0%) brightness(110%)",
    transform: "scale(1.1)",
    transition: "0.3s",
  };

  var unhover_css = {
    filter: "grayscale(100%) brightness(100%)",
    transform: "scale(1)",
    transition: "1s",
  };

  $(".left_article").hover(
    function () {
      var i = $(this).index();
      $(".L_article_img_link").eq(i).addClass("open");
      $(".left_article_img").eq(i).css(hover_css);
      $(".left_works_description").eq(i).css("padding", "26px 15px 16px");
    },
    function () {
      var i = $(this).index();
      $(".L_article_img_link").removeClass("open");
      $(".left_article_img").eq(i).css(unhover_css);
      $(".left_works_description").eq(i).css("padding", "0");
    }
  );

  $(".right_article").hover(
    function () {
      var i = $(this).index();
      $(".R_article_img_link").eq(i).addClass("open");
      $(".right_article_img").eq(i).css(hover_css);
      $(".right_works_description").eq(i).css("padding", "26px 15px 16px");
    },
    function () {
      var i = $(this).index();
      $(".R_article_img_link").eq(i).removeClass("open");
      $(".right_article_img").eq(i).css(unhover_css);
      $(".right_works_description").eq(i).css("padding", "0");
    }
  );

  if ($(".screen").hasClass("works") || $(".screen").hasClass("about")) {
    $(".screen").css({
      boxShadow: "0 0 100px #fff",
    });
  }

  $(".works_section, .about_section").on("scroll", function () {
    $("[data-fadeIn]").each(function (index, el) {
      if (
        $(window).scrollTop() >
        $(el).offset().top - $(window).height() / 2 - 300
      ) {
        $(el).addClass("is-over");
      }

      // $(".scrollDown_under").fadeOut(1000);

      if (window.matchMedia("(max-width:1030px)").matches) {
        //タブレット、スマホ処理
        $(".left_works_description, .right_works_description").css({
          height: "auto",
          boxShadow: "0 0 20px #fff",
          overflow: "visible",
          boxSizing: "borderBox",
          padding: "10px 10px",
        });
        $(".article_img_wrap").css({
          boxShadow: "0 0 22px #fff",
        });
      } else if (window.matchMedia("(min-width:1031px)").matches) {
        //PC処理
      }
    });
    if ($(this).scrollTop() < $(this).offset().top) {
      $(".scrollDown_under").fadeIn(1000);
    } else {
      $(".scrollDown_under").fadeOut(1000);
    }
  });

  var rollText = document.querySelector(".roll_text");
  rollText.style.setProperty("bottom", `${rollText.offsetHeight * -1.4}px`, "");
});
