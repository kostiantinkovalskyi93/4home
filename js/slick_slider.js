if (typeof jQuery !== "undefined" && typeof $.fn.slick !== "undefined") {
    $(document).ready(function () {
        $(".category__slider-block").each(function (index) {
            const $sliderFor = $(this).find(".slider-for");
            const $sliderNav = $(this).find(".slider-nav");
            
            $sliderFor.addClass(`slider-for-${index}`);
            $sliderNav.addClass(`slider-nav-${index}`);

            const slideCount = $sliderNav.find(".slick-slide").length || $sliderNav.children().length;
            
            const navSettings = {
                slidesToShow: slideCount <= 3 ? slideCount : 3,
                slidesToScroll: 1,
                asNavFor: `.slider-for-${index}`,
                centerMode: slideCount > 3,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: slideCount <= 3 ? slideCount : 2,
                            centerMode: slideCount > 3,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            centerMode: slideCount > 3,
                        },
                    },
                ],
            };
            if (slideCount <= 3) {
                const sliderNav = $(`.slider-nav-${index}`);
                sliderNav.addClass(`slider-nav slide-count-${slideCount}`);
            }
            
            $sliderFor.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                swipe: true,
                asNavFor: `.slider-nav-${index}`,
            });
            
             $sliderNav.slick(navSettings);
            
            $sliderFor.on("click", "img", function (e) {
                e.preventDefault();
                e.stopPropagation();
                const $modal = $("#fullscreenModal");
                const $modalSlider = $("#fullscreenModalSlider");
                const images = $sliderFor.find("img").map(function () {
                    return $(this).attr("src");
                }).get();
                const clickedIndex = $sliderFor.slick("slickCurrentSlide");
                
                if ($modalSlider.hasClass("slick-initialized")) {
                    $modalSlider.slick("unslick");
                }
                $modalSlider.empty();
                
                images.forEach((src) => {
                    $modalSlider.append(
                        `<div><img src="${src}" alt="Зображення шафи-купе"></div>`
                    );
                });
                
                $modal.addClass("fullscreen-modal--active");
                
                setTimeout(() => {
                    $modalSlider.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true,
                        fade: true,
                        initialSlide: clickedIndex,
                        infinite: true,
                    });
                    $modalSlider.focus();
                }, 100);
            });
        });
        
        $("#fullscreenModalClose").on("click", function () {
            const $modal = $("#fullscreenModal");
            const $modalSlider = $("#fullscreenModalSlider");
            $modal.removeClass("fullscreen-modal--active");
            if ($modalSlider.hasClass("slick-initialized")) {
                $modalSlider.slick("unslick");
            }
        });
        
        $("#fullscreenModal").on("click", function (e) {
            const $modal = $(this);
            const $modalContent = $(".fullscreen-modal__content");
            if (!$modalContent.is(e.target) && $modalContent.has(e.target).length === 0) {
                const $modalSlider = $("#fullscreenModalSlider");
                $modal.removeClass("fullscreen-modal--active");
                if ($modalSlider.hasClass("slick-initialized")) {
                    $modalSlider.slick("unslick");
                }
            }
        });
        
        $(document).on("keydown", function (e) {
            const $modal = $("#fullscreenModal");
            const $modalSlider = $("#fullscreenModalSlider");
            if ($modal.hasClass("fullscreen-modal--active")) {
                if (e.key === "Escape") {
                    $modal.removeClass("fullscreen-modal--active");
                    if ($modalSlider.hasClass("slick-initialized")) {
                        $modalSlider.slick("unslick");
                    }
                } else if (e.key === "ArrowLeft") {
                    if ($modalSlider.hasClass("slick-initialized")) {
                        $modalSlider.slick("slickPrev");
                    }
                } else if (e.key === "ArrowRight") {
                    if ($modalSlider.hasClass("slick-initialized")) {
                        $modalSlider.slick("slickNext");
                    }
                }
            }
        });
    });
} else {
    console.warn("jQuery або Slick Slider не завантажено. Слайдери не будуть ініціалізовані.");
  }