$(document).ready(function () {
    const carousel1 = $("#carouselExampleControls2", "#carouselExampleControls3");
    const carousel2 = $("#carouselExampleControls3");
  
    // generate stars
    function generateStarts(rating) {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        if (i < rating) {
          stars.push(
            '<img src="images/star_on.png" alt="star on" width="15px" />'
          );
        } else {
          stars.push(
            '<img src="images/star_off.png" alt="star off" width="15px" />'
          );
        }
      }
      return stars.join("");
    }
  
    // Handle the slid event to enable/disable arrows
    carousel1.on("slid.bs.carousel", function () {
      handleArrows(carousel1);
    });
  
    // Handle the slide event to enable/disable arrows
    carousel1.on("slide.bs.carousel", function () {
      handleArrows(carousel1);
    });
  
    // Handle the slid event to enable/disable arrows
    carousel2.on("slid.bs.carousel", function () {
      handleArrows(carousel2);
    });
  
    // Handle the slide event to enable/disable arrows
    carousel2.on("slide.bs.carousel", function () {
      handleArrows(carousel2);
    });
  
    function handleArrows(carousel) {
      // Get the total number of carousel items
      const totalItems = carousel.find(".carousel-item").length;
      if (totalItems === 1) {
        return;
      }
      // Get the index of the current active carousel item
      const activeIndex = carousel.find(".carousel-item.active").index();
  
      // Get the left and right carousel controls
      const leftArrow = carousel.find(".carousel-control-prev");
      const rightArrow = carousel.find(".carousel-control-next");
  
      // Disable/Enable left arrow
      if (activeIndex === 0) {
        leftArrow.addClass("d-none");
      } else {
        leftArrow.removeClass("d-none");
      }
  
      // Disable/Enable right arrow
      if (activeIndex === totalItems - 1) {
        rightArrow.addClass("d-none");
      } else {
        rightArrow.removeClass("d-none");
      }
    }
  
    // Quotes
    $.ajax({
      type: "GET",
      url: "https://smileschool-api.hbtn.info/quotes",
      dataType: "json",
    })
      .done((response) => {
        const loader = $(".quotes .loader");
        const carousel = $("#carouselExampleControls");
        const carouselInner = $("#carouselExampleControls .carousel-inner");
  
        carousel[0].classList.replace("d-none", "d-block");
        loader.css("display", "none");
  
        response.forEach((quote, index) => {
          const active = index === 0 ? "active" : "";
          carouselInner.html(
            carouselInner.html() +
              `<div class="carousel-item ${active}">
                  <div class="row mx-auto align-items-center">
                      <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                          <img
                              src=${quote.pic_url}
                              class="d-block align-self-center"
                              alt="Carousel Pic 1"
                          />
                      </div>
                      <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                          <div class="quote-text">
                              <p class="text-white">
                                  « ${quote.text}
                              </p>
                              <h4 class="text-white font-weight-bold">${quote.name}</h4>
                              <span class="text-white">${quote.title}</span>
                          </div>
                      </div>
                  </div>
              </div>`
          );
        });
      })
      .fail(() => {
        window.alert("Error in fetching quotes");
      });
  
    // popular tutorials
    $.ajax({
      type: "GET",
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      dataType: "json",
    })
      .done((response) => {
        const loader = $(".popular-loader");
        const carousel = $("#carouselExampleControls2");
        const carouselInner = $("#carouselExampleControls2 .carousel-inner");
  
        carousel.removeClass("d-none").addClass("d-block");
        loader.css("display", "none");
  
        for (let i = 0; i < response.length; i += 4) {
          const active = i === 0 ? "active" : "";
  
          carouselInner.append(
            `<div class="carousel-item ${active}">
            <div class="row align-items-center mx-auto">
              ${
                response[i]
                  ? `<div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                      <div class="card">
                        <img src="${
                          response[i].thumb_url
                        }" class="card-img-top" alt="Video thumbnail" />
                        <div class="card-img-overlay text-center">
                          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                        </div>
                        <div class="card-body">
                          <h5 class="card-title font-weight-bold">${
                            response[i].title
                          }</h5>
                          <p class="card-text text-muted">${
                            response[i]["sub-title"]
                          }</p>
                          <div class="creator d-flex align-items-center">
                            <img src="${
                              response[i].author_pic_url
                            }" alt="Creator of Video" width="30px" class="rounded-circle" />
                            <h6 class="pl-3 m-0 main-color">${
                              response[i].author
                            }</h6>
                          </div>
                          <div class="info pt-3 d-flex justify-content-between">
                            <div class="rating">
                              ${generateStarts(response[i].star)}
                            </div>
                            <span class="main-color">${
                              response[i].duration
                            }</span>
                          </div>
                        </div>
                      </div>
                    </div>`
                  : ""
              }
              ${
                response[i + 1]
                  ? `<div class="col-sm-6 col-md-6 col-lg-3 d-none d-sm-flex justify-content-md-start justify-content-lg-center">
                      <div class="card">
                        <img src="${
                          response[i + 1].thumb_url
                        }" class="card-img-top" alt="Video thumbnail" />
                        <div class="card-img-overlay text-center">
                          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                        </div>
                        <div class="card-body">
                          <h5 class="card-title font-weight-bold">${
                            response[i + 1].title
                          }</h5>
                          <p class="card-text text-muted">${
                            response[i + 1]["sub-title"]
                          }</p>
                          <div class="creator d-flex align-items-center">
                            <img src="${
                              response[i + 1].author_pic_url
                            }" alt="Creator of Video" width="30px" class="rounded-circle" />
                            <h6 class="pl-3 m-0 main-color">${
                              response[i + 1].author
                            }</h6>
                          </div>
                          <div class="info pt-3 d-flex justify-content-between">
                            <div class="rating">
                              ${generateStarts(response[i + 1].star)}
                            </div>
                            <span class="main-color">${
                              response[i + 1].duration
                            }</span>
                          </div>
                        </div>
                      </div>
                    </div>`
                  : ""
              }
              ${
                response[i + 2]
                  ? `<div class="col-md-3 d-none d-lg-flex justify-content-center">
                      <div class="card">
                        <img src="${
                          response[i + 2].thumb_url
                        }" class="card-img-top" alt="Video thumbnail" />
                        <div class="card-img-overlay text-center">
                          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                        </div>
                        <div class="card-body">
                          <h5 class="card-title font-weight-bold">${
                            response[i + 2].title
                          }</h5>
                          <p class="card-text text muted">${
                            response[i + 2]["sub-title"]
                          }</p>
                          <div class="creator d-flex align-items-center">
                            <img src="${
                              response[i + 2].author_pic_url
                            }" alt="Creator of Video" width="30px" class="rounded-circle" />
                            <h6 class="pl-3 m-0 main-color">${
                              response[i + 2].author
                            }</h6>
                          </div>
                          <div class="info pt-3 d-flex justify-content-between">
                            <div class="rating">
                              ${generateStarts(response[i + 2].star)}
                            </div>
                            <span class="main-color">${
                              response[i + 2].duration
                            }</span>
                          </div>
                        </div>
                      </div>
                    </div>`
                  : ""
              }
              ${
                response[i + 3]
                  ? `<div class="col-md-3 d-none d-lg-flex justify-content-center">
                      <div class="card">
                        <img src="${
                          response[i + 3].thumb_url
                        }" class="card-img-top" alt="Video thumbnail" />
                        <div class="card-img-overlay text-center">
                          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                        </div>
                        <div class="card-body">
                          <h5 class="card-title font-weight-bold">${
                            response[i + 3].title
                          }</h5>
                          <p class="card-text text-muted">${
                            response[i + 3]["sub-title"]
                          }</p>
                          <div class="creator d-flex align-items-center">
                            <img src="${
                              response[i + 3].author_pic_url
                            }" alt="Creator of Video" width="30px" class="rounded-circle" />
                            <h6 class="pl-3 m-0 main-color">${
                              response[i + 3].author
                            }</h6>
                          </div>
                          <div class="info pt-3 d-flex justify-content-between">
                            <div class="rating">
                              ${generateStarts(response[i + 3].star)}
                            </div>
                            <span class="main-color">${
                              response[i + 3].duration
                            }</span>
                          </div>
                        </div>
                      </div>
                    </div>`
                  : ""
              }
            </div>
          </div>`
          );
        }
        handleArrows(carousel1);
      })
      .fail(() => {
        alert("Error in fetching popular tutorials");
      });
  
    // Latest tutorials
    $.ajax({
      type: "GET",
      url: "https://smileschool-api.hbtn.info/latest-videos",
      dataType: "json",
    })
      .done((response) => {
        const loader = $(".latest-loader");
        const carousel = $("#carouselExampleControls3");
        const carouselInner = $("#carouselExampleControls3 .carousel-inner");
  
        carousel.removeClass("d-none").addClass("d-block");
        loader.css("display", "none");
  
        for (let i = 0; i < response.length; i += 4) {
          const active = i === 0 ? "active" : "";
  
          carouselInner.append(
            `<div class="carousel-item ${active}">
            <div class="row align-items-center mx-auto">
              ${
                response[i]
                  ? `<div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center">
                      <div class="card">
                        <img src="${
                          response[i].thumb_url
                        }" class="card-img-top" alt="Video thumbnail" />
                        <div class="card-img-overlay text-center">
                          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                        </div>
                        <div class="card-body">
                          <h5 class="card-title font-weight-bold">${
                            response[i].title
                          }</h5>
                          <p class="card-text text-muted">${
                            response[i]["sub-title"]
                          }</p>
                          <div class="creator d-flex align-items-center">
                            <img src="${
                              response[i].author_pic_url
                            }" alt="Creator of Video" width="30px" class="rounded-circle" />
                            <h6 class="pl-3 m-0 main-color">${
                              response[i].author
                            }</h6>
                          </div>
                          <div class="info pt-3 d-flex justify-content-between">
                            <div class="rating">
                              ${generateStarts(response[i].star)}
                            </div>
                            <span class="main-color">${
                              response[i].duration
                            }</span>
                          </div>
                        </div>
                      </div>
                    </div>`
                  : ""
              }
              ${
                response[i + 1]
                  ? `<div class="col-sm-6 col-md-6 col-lg-3 d-none d-sm-flex justify-content-md-start justify-content-lg-center">
                      <div class="card">
                        <img src="${
                          response[i + 1].thumb_url
                        }" class="card-img-top" alt="Video thumbnail" />
                        <div class="card-img-overlay text-center">
                          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                        </div>
                        <div class="card-body">
                          <h5 class="card-title font-weight-bold">${
                            response[i + 1].title
                          }</h5>
                          <p class="card-text text-muted">${
                            response[i + 1]["sub-title"]
                          }</p>
                          <div class="creator d-flex align-items-center">
                            <img src="${
                              response[i + 1].author_pic_url
                            }" alt="Creator of Video" width="30px" class="rounded-circle" />
                            <h6 class="pl-3 m-0 main-color">${
                              response[i + 1].author
                            }</h6>
                          </div>
                          <div class="info pt-3 d-flex justify-content-between">
                            <div class="rating">
                              ${generateStarts(response[i + 1].star)}
                            </div>
                            <span class="main-color">${
                              response[i + 1].duration
                            }</span>
                          </div>
                        </div>
                      </div>
                    </div>`
                  : ""
              }
              ${
                response[i + 2]
                  ? `<div class="col-md-3 d-none d-lg-flex justify-content-center">
                      <div class="card">
                        <img src="${
                          response[i + 2].thumb_url
                        }" class="card-img-top" alt="Video thumbnail" />
                        <div class="card-img-overlay text-center">
                          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                        </div>
                        <div class="card-body">
                          <h5 class="card-title font-weight-bold">${
                            response[i + 2].title
                          }</h5>
                          <p class="card-text text muted">${
                            response[i + 2]["sub-title"]
                          }</p>
                          <div class="creator d-flex align-items-center">
                            <img src="${
                              response[i + 2].author_pic_url
                            }" alt="Creator of Video" width="30px" class="rounded-circle" />
                            <h6 class="pl-3 m-0 main-color">${
                              response[i + 2].author
                            }</h6>
                          </div>
                          <div class="info pt-3 d-flex justify-content-between">
                            <div class="rating">
                              ${generateStarts(response[i + 2].star)}
                            </div>
                            <span class="main-color">${
                              response[i + 2].duration
                            }</span>
                          </div>
                        </div>
                      </div>
                    </div>`
                  : ""
              }
              ${
                response[i + 3]
                  ? `<div class="col-md-3 d-none d-lg-flex justify-content-center">
                      <div class="card">
                        <img src="${
                          response[i + 3].thumb_url
                        }" class="card-img-top" alt="Video thumbnail" />
                        <div class="card-img-overlay text-center">
                          <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                        </div>
                        <div class="card-body">
                          <h5 class="card-title font-weight-bold">${
                            response[i + 3].title
                          }</h5>
                          <p class="card-text text-muted">${
                            response[i + 3]["sub-title"]
                          }</p>
                          <div class="creator d-flex align-items-center">
                            <img src="${
                              response[i + 3].author_pic_url
                            }" alt="Creator of Video" width="30px" class="rounded-circle" />
                            <h6 class="pl-3 m-0 main-color">${
                              response[i + 3].author
                            }</h6>
                          </div>
                          <div class="info pt-3 d-flex justify-content-between">
                            <div class="rating">
                              ${generateStarts(response[i + 3].star)}
                            </div>
                            <span class="main-color">${
                              response[i + 3].duration
                            }</span>
                          </div>
                        </div>
                      </div>
                    </div>`
                  : ""
              }
            </div>
          </div>`
          );
        }
        handleArrows(carousel2);
      })
      .fail(() => {
        alert("Error in fetching latest tutorials");
      });
  
    // Courses Page
    const resultsTitle = $(".results .section-title");
    const resultsLoader = $(".results-loader");
    const resultsArea = $(".results .row");
  
    const topicDropdownText = $(".topic");
    const sortDropdownText = $(".sort");
  
    let searchKeyword = "";
    let selectedTopic = "all";
    let selectedSorting = "most_popular";
  
    $("#keywords").on("change", (e) => {
      searchKeyword = e.target.value;
      filterCourses(searchKeyword, selectedTopic, selectedSorting);
      resultsLoader.css("display", "block");
      resultsTitle[0].classList.add("d-none");
      resultsArea[0].classList.add("d-none");
      resultsArea.html("");
    });
  
    $("#topicDropdown .dropdown-item").on("click", (e) => {
      selectedTopic = e.target.innerHTML.toLowerCase();
      filterCourses(searchKeyword, selectedTopic, selectedSorting);
      topicDropdownText[0].innerHTML = e.target.innerHTML;
      resultsLoader.css("display", "block");
      resultsTitle[0].classList.add("d-none");
      resultsArea[0].classList.add("d-none");
      resultsArea.html("");
    });
  
    $("#sortDropdown .dropdown-item").on("click", (e) => {
      selectedSorting = e.target.innerHTML.replace(" ", "_").toLowerCase();
      filterCourses(searchKeyword, selectedTopic, selectedSorting);
      sortDropdownText[0].innerHTML = e.target.innerHTML;
      resultsLoader.css("display", "block");
      resultsTitle[0].classList.add("d-none");
      resultsArea[0].classList.add("d-none");
      resultsArea.html("");
    });
  
    function filterCourses(keyword, topic, sorting) {
      const params = new URLSearchParams({
        q: keyword || "",
        topic: topic || "",
        sort: sorting || "",
      });
  
      const URL = `https://smileschool-api.hbtn.info/courses?${params}`;
  
      $.ajax({
        type: "GET",
        url: URL,
        dataType: "json",
      })
        .done((response) => {
          const courses = response.courses;
  
          courses.forEach((course) => {
            resultsArea.append(
              `<div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
                <div class="card">
                  <img
                    src="${course.thumb_url}"
                    class="card-img-top"
                    alt="Video thumbnail"
                  />
                  <div class="card-img-overlay text-center">
                    <img
                      src="images/play.png"
                      alt="Play"
                      width="64px"
                      class="align-self-center play-overlay"
                    />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">${course.title}</h5>
                    <p class="card-text text-muted">
                      ${course["sub-title"]}
                    </p>
                    <div class="creator d-flex align-items-center">
                      <img
                        src="${course.author_pic_url}"
                        alt="Creator of
                        Video"
                        width="30px"
                        class="rounded-circle"
                      />
                      <h6 class="pl-3 m-0 main-color">${course.author}</h6>
                    </div>
                    <div class="info pt-3 d-flex justify-content-between">
                      <div class="rating">
                        ${generateStarts(course.star)}
                      </div>
                      <span class="main-color">${course.duration}</span>
                    </div>
                  </div>
                </div>
              </div>`
            );
          });
  
          resultsLoader.css("display", "none");
          resultsArea[0].classList.remove("d-none");
          resultsTitle[0].classList.remove("d-none");
          $(".video-count").html(
            `${response.courses.length} ${
              response.courses.length === 1 ? "vidoe" : "videos"
            }`
          );
        })
        .fail(() => {
          alert("Error in fetching courses");
        });
    }
  
    filterCourses(searchKeyword, selectedTopic, selectedSorting);
  });