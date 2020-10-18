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

//////////////////////////////////////////////////////////////////////////////////////////////////
        //move text --- marquee
        function initMoveText() {
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
                            velocity: .5
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
        }

        initMoveText();

        window.addEventListener('resize', initMoveText);

//////////////////////////////////////////////////////////////////////////////////////////////////
        // variables for menu and popup
        var btnToggle = document.querySelector('.button-toggle');
        var menu = document.querySelector('.menu');
        var popup = document.querySelector('.popup');
        var btnSubmit = document.querySelector('.button-form-submit');
        var header = document.querySelector('.header');
        var body = document.body;

        //open---close menu and popup success
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
                    setTimeout(function () {
                        menu.style.opacity = '1';
                    },10);
                    body.classList.add('in-open-popup');
                } else if (status.menuOpen) {
                    status.menuOpen = false;
                    btnToggle.classList.remove('open');
                    menu.style.opacity = '0';
                    setTimeout(function () {
                        menu.classList.remove('open');
                    },300);
                    body.classList.remove('in-open-popup');
                } else if (status.popupOpen) {
                    status.popupOpen = false;
                    popup.style.opacity = '0';
                    setTimeout(function () {
                        popup.classList.remove('open');
                    },300);
                    btnToggle.classList.remove('open');
                    body.classList.remove('in-open-popup');
                }
            });
        }

        //open popup success
        if (btnSubmit)
        {
            btnSubmit.addEventListener("click", function() {
                status.popupOpen = true;
                popup.classList.add('open');
                setTimeout(function () {
                    popup.style.opacity = '1';
                },10);
                btnToggle.classList.add('open');
                body.classList.add('in-open-popup');
            });
        }

//////////////////////////////////////////////////////////////////////////////////////////////////
        //slider photo gallery
        var photo = document.querySelector('.photo-gallery');

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
                pagination: {
                    el: '.pagination-bullets-box',
                    type: 'bullets',
                    clickable: true
                },
                spaceBetween: 30,
                slidesPerView: 1
            });
        }

        if(photo)
        {
            initCarousel()
        }

//////////////////////////////////////////////////////////////////////////////////////////////////
        //placeholder
        var labelForm = document.querySelectorAll('.form-field-label');

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

//////////////////////////////////////////////////////////////////////////////////////////////////
        //header
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

//////////////////////////////////////////////////////////////////////////////////////////////////

    function animation()
    {
        var self = this;

        self.options =
        {
            root: null,
            rootMargin: '0px',
            threshold: [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0]
        };

        self.callback = function (entries, observer)
        {
            entries.forEach(entry =>
            {
                if (!entry.target.classList.contains('animate') && Math.round((entry.intersectionRatio * 100) * 100 / 100)  >= 50) {
                    entry.target.classList.add('animate');
                }

            });
        };

        let observer = new IntersectionObserver(self.callback, self.options);

        var contentLine = document.querySelectorAll('.content__line');
        var infoLine = document.querySelectorAll('.info-line');
        var infoDescr = document.querySelectorAll('.info__descr');
        var infoText = document.querySelectorAll('.info-box-text');

        for (let i = 0; i < contentLine.length; i++)
        {
            let line = contentLine[i];
            observer.observe(line);
        }

        for (let i = 0; i < infoLine.length; i++)
        {
            let line = infoLine[i];
            observer.observe(line);
        }

        for (let i = 0; i < infoDescr.length; i++)
        {
            let box = infoDescr[i];
            observer.observe(box);
        }

        for (let i = 0; i < infoText.length; i++)
        {
            let box = infoText[i];
            observer.observe(box);
        }
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////
    var contentLine = document.querySelectorAll('.content__line');
    var infoLine = document.querySelectorAll('.info-line');

    var infoGroupPhoto = document.querySelectorAll('.info-group-photo');
    var infoBoxImg = document.querySelectorAll('.info-box-img');
    var wrGif = document.querySelectorAll('.wr-gif');
    var infoImgSmall = document.querySelectorAll('.info-img-small');

    var sectionTitle = document.querySelectorAll('.section-title');
    var infoBoxText = document.querySelectorAll('.info-box-text');
    var contentList = document.querySelectorAll('.content-list');
    var buttonCorner = document.querySelectorAll('.button-corner');
    var infoBoxTitle = document.querySelectorAll('.info-box-title');
    var boxTextMove = document.querySelectorAll('.box-text-move');
    var footer = document.querySelectorAll('.footer');

    var clientListItem = document.querySelectorAll('.client-list__item');
    var boxTextMoveTitle = document.querySelectorAll('.box-text-move-title');

    var worksListItem = document.querySelectorAll('.works-list__item');
    var formCheckbox = document.querySelectorAll('.form-checkbox');
    var formFieldRow = document.querySelectorAll('.form-field__row');

    var classAnim;

    var listElAnim = [formFieldRow,formCheckbox,worksListItem,infoLine,contentLine,boxTextMoveTitle,clientListItem,sectionTitle,infoBoxText,contentList,buttonCorner,infoBoxTitle,boxTextMove,footer,infoGroupPhoto,infoBoxImg,wrGif,infoImgSmall];

    for (let i = 0; i < listElAnim.length; i ++)
    {
        if (listElAnim[i].length)
        {
            if (
                listElAnim[i] === infoGroupPhoto ||
                listElAnim[i] === infoBoxImg ||
                listElAnim[i] === wrGif ||
                listElAnim[i] === infoImgSmall
            )
            {
                classAnim = 'heightIn';
            }
            else if  (
                listElAnim[i] === contentLine ||
                listElAnim[i] === infoLine
            )
            {
                classAnim = 'widthIn';
            }
            else
            {
                classAnim = 'fadeIn';
            }

            for(let j = 0; j < listElAnim[i].length; j++)
            {
                listElAnim[i][j].classList.add(classAnim);
            }

            new WOW(
                {
                    boxClass:     classAnim,
                    offset: 50,
                }
            ).init();
        }
    }

