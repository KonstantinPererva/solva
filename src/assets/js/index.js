window.addEventListener('load', function ()
    {
        var btnToggle = document.querySelector('.button-toggle');
        var menu = document.querySelector('.menu');
        var popup = document.querySelector('.popup');
        var btnSubmit = document.querySelector('.button-form-submit');
        var photo = document.querySelector('.photo-gallery');
        var header = document.querySelector('.header');
        var labelForm = document.querySelectorAll('.form-field-label');
        var body = document.body;

        var status =
        {
            menuOpen: false,
            popupOpen: false
        };

        if (btnToggle)
        {
            btnToggle.addEventListener("click", function() {
                if(!status.menuOpen && !status.popupOpen) {
                    status.menuOpen = true;
                    btnToggle.classList.add('open');
                    menu.classList.add('open');
                    body.classList.add('in-open-popup');
                } else if (status.menuOpen) {
                    status.menuOpen = false;
                    btnToggle.classList.remove('open');
                    menu.classList.remove('open');
                    body.classList.remove('in-open-popup');
                } else if (status.popupOpen) {
                    status.popupOpen = false;
                    popup.classList.remove('open');
                    btnToggle.classList.remove('open');
                    body.classList.remove('in-open-popup');
                }
            });
        }

        if (btnSubmit)
        {
            btnSubmit.addEventListener("click", function() {
                status.popupOpen = true;
                popup.classList.add('open');
                btnToggle.classList.add('open');
                body.classList.add('in-open-popup');
            });
        }

        function initCarousel() {
            var photoGallery = new Swiper('.swiper-container', {
                // loop: true,
                speed: 800,
                autoplay: {
                    delay: 5000,
                },
                // releaseOnEdges: true,
                // mousewheel: true,
                paused: false,
                disableOnInteraction: false,
                // pagination: {
                //     el: '.reviews-slider-pagination',
                //     type: 'bullets',
                //     clickable: true
                // },
                spaceBetween: 30,
                slidesPerView: 1
            });
        }

        if(photo)
        {
            initCarousel()
        }

        if (labelForm.length)
        {
            for(let i = 0; i < labelForm.length; i++)
            {
                labelForm[i].inp = labelForm[i].querySelector('.form-field-label__input');
                labelForm[i].plac = labelForm[i].querySelector('.form-field-label__placeholder');

                labelForm[i].inp.addEventListener('blur', function () {
                    if(labelForm[i].inp.value.trim() !== "")
                    {
                        labelForm[i].plac.classList.add('move-top');
                    } else {
                        labelForm[i].plac.classList.remove('move-top');
                    }
                });
            }
        }

        if(window.scrollY)
        {
            header.classList.add('header-fixed');
        } else {
            header.classList.remove('header-fixed');
        }

        window.addEventListener('scroll', function ()
        {
            if(window.scrollY)
            {
                header.classList.add('header-fixed');
            } else {
                header.classList.remove('header-fixed');
            }
        })
    }
);
