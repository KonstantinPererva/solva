function Marquee (node, opt)
{
    var self = this;
    self.node = node;
    self.text = self.node.querySelectorAll('[data-text-move]');
    self.opt = opt;
    self.distance = 100;
    self.time = 1000;

    self.option = Object.assign(
        {
                    velocity: 1
                }
                ,
                self.opt
    );

    for (let i = 0; i < self.text.length; i++)
    {
        self.text[i].style.animationDuration = (self.text[i].getBoundingClientRect().right - self.text[i].getBoundingClientRect().left) / (self.distance * self.option.velocity) * self.time + 'ms';
    }
}

window.addEventListener('load', function ()
    {
        var moveBox = document.querySelectorAll('.info-box-title_move-left');

        if (moveBox.length)
        {
            var moveBoxItems = [].slice.call(document.querySelectorAll('.info-box-title_move-left'));

            for (let i = 0; i < moveBoxItems.length; i++)
            {
                new Marquee(moveBoxItems[i],
                    {
                        velocity: .5
                    })
            }
        }

        var moveWorks = document.querySelectorAll('[data-node-text-move="works"]');

        if (moveWorks.length)
        {
            var moveWorksItems = [].slice.call(document.querySelectorAll('[data-node-text-move="works"]'));

            for (let i = 0; i < moveWorksItems.length; i++)
            {
                new Marquee(moveWorksItems[i],
                    {
                        velocity: 1
                    })
            }
        }

        var moveDescr = document.querySelectorAll('[data-node-text-move="box-text-move-descr"]');

        if (moveDescr.length)
        {
            var moveDescrItems = [].slice.call(document.querySelectorAll('[data-node-text-move="box-text-move-descr"]'));

            for (let i = 0; i < moveDescrItems.length; i++)
            {
                new Marquee(moveDescrItems[i],
                    {
                        velocity: 1.2
                    })
            }
        }

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
            var photoGallery = new Swiper('.photo-gallery', {
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
        });
    }
);
