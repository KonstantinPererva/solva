function getSizeBoxes(elem)
{
    let elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
    let elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;

    return {
        width: elemWidth,
        height: elemHeight
    };
}

function Marquee (node, opt)
{
    let self = this;
    self.node = node;
    self.text = self.node.querySelectorAll('[data-text-move]');
    self.opt = opt;
    self.distance = 100;
    self.time = 1000;

    self.option = Object.assign({ velocity: 1 }, self.opt);

    for (let i = 0; i < self.text.length; i++)
    {
        self.text[i].style.animationDuration = (self.text[i].getBoundingClientRect().right - self.text[i].getBoundingClientRect().left) / (self.distance * self.option.velocity) * self.time + 'ms';
    }
}

function handleClassNameOnScrolling(el, className)
{
    let self = this;
    self.el = el;
    self.className = className;

    if(window.scrollY)
    {
        el.classList.add(className);
    }
    else
    {
        el.classList.remove(className);
    }
}

function handleClassNameForAnimation(list, className, offset)
{
    let self = this;
    self.list = list;
    self.offset = offset;
    self.className = className;

    for (let i = 0; i < self.list.length; i++)
    {
        let el = document.querySelectorAll(self.list[i]);

        if (!el.length){ continue }

        for(let j = 0; j < el.length; j++)
        {
            el[j].classList.add(self.className);
        }

        new WOW(
            {
                boxClass: self.className,
                offset: self.offset,
            }
        ).init();
    }
}

function initCarousel(selector, options)
{
    let self = this;
    self.selector = selector;
    self.slider = document.querySelectorAll(self.selector);
    self.options = options;

    if (!self.slider.length)
    {
        return
    }

    for (let i = 0; i < self.slider.length; i++)
    {
        let gallery = new Swiper(self.slider[i], self.options);
    }
}

function initMoveElement(selector, options)
{
    let self = this;
    self.option = options;
    self.selector = selector;
    self.el = document.querySelectorAll(self.selector);

    if (!self.el.length) { return }

    for (let i = 0; i < self.el.length; i++)
    {
        new Marquee(self.el[i], self.option);
    }
}

window.addEventListener('load', function ()
    {
//////////////////////////////////////////////////////////////////////////////////////////////////
        //move text --- marquee

        function initMoveText() {
            initMoveElement('.info-box-title_move-left', {velocity: .5});
            initMoveElement('[data-node-text-move="works"]', {velocity: .5});
            initMoveElement('[data-node-text-move="box-text-move-descr"]', {velocity: 1.2});
            initMoveElement('.slogan__text', {velocity: .5});
        }

        initMoveText();

        window.addEventListener('resize', initMoveText);

//////////////////////////////////////////////////////////////////////////////////////////////////
        // variables ( menu , popup , header )
        let btnToggle = document.querySelectorAll('.button-toggle');
        let menu = document.querySelector('.menu');
        let popup = document.querySelector('.popup');
        let btnSubmit = document.querySelector('.button-form-submit');
        // let header = document.querySelector('.header .midnightHeader');
        let body = document.body;

        //open---close menu and popup success
        let status =
            {
                menuOpen: false,
                popupOpen: false
            };

        function changesWhenOpeningPopup() {
            document.documentElement.style.width = document.body.clientWidth + 'px';
            document.documentElement.style.overflow = 'hidden';
            // header.style.right = window.innerWidth - document.body.clientWidth + 'px';
        }

        function changesWhenClosingPopup() {
            document.documentElement.style.width = 'auto';
            document.documentElement.style.overflow = 'visible';
            // header.style.right = '0';
        }

        if (btnToggle.length)
        {
            for (let i = 0; i < btnToggle.length; i++) {
                btnToggle[i].addEventListener("click", function()
                {
                    if(!status.menuOpen && !status.popupOpen)
                    {
                        status.menuOpen = true;
                        this.classList.add('open');
                        menu.classList.add('open');
                        setTimeout(function () {
                            menu.style.opacity = '1';
                        },10);
                        body.classList.add('in-open-popup');
                        changesWhenOpeningPopup();
                    }
                    else if (status.menuOpen)
                    {
                        status.menuOpen = false;
                        this.classList.remove('open');
                        menu.style.opacity = '0';
                        setTimeout(function () {
                            menu.classList.remove('open');
                            changesWhenClosingPopup();
                        },300);
                        body.classList.remove('in-open-popup');
                    }
                    else if (status.popupOpen)
                    {
                        status.popupOpen = false;
                        popup.style.opacity = '0';
                        setTimeout(function () {
                            popup.classList.remove('open');
                            changesWhenClosingPopup();
                        },300);
                        this.classList.remove('open');
                        body.classList.remove('in-open-popup');
                    }
                });
            }
        }

        //open popup success
        if (btnSubmit)
        {
            btnSubmit.addEventListener("click", function()
            {
                status.popupOpen = true;
                popup.classList.add('open');
                setTimeout(function () {
                    popup.style.opacity = '1';
                },10);
                btnToggle[0].classList.add('open');
                btnToggle[1].classList.add('open');
                body.classList.add('in-open-popup');
                changesWhenOpeningPopup();
            });
        }

//////////////////////////////////////////////////////////////////////////////////////////////////
        //slider photo gallery
        initCarousel('.photo-gallery',
            {
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
                navigation: {
                    nextEl: ".button-next",
                    prevEl: ".button-prev"
                },
                spaceBetween: 30,
                slidesPerView: 1
            }
        );

//////////////////////////////////////////////////////////////////////////////////////////////////
        //placeholder
        let labelForm = document.querySelectorAll('.form-field-label');

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
        //
        // handleClassNameOnScrolling(header, 'header-fixed');
        //
        // window.addEventListener('scroll', function ()
        // {
        //     handleClassNameOnScrolling(header, 'header-fixed');
        // });
    }
);

//////////////////////////////////////////////////////////////////////////////////////////////////
let listElForAnim_1 = [
    '.form-field__row',
    '.form-checkbox',
    '.works-list__item',
    '.box-text-move-title',
    '.client-list__item',
    '.section-title',
    '.info-box-text',
    '.content-list',
    '.button-corner',
    '.info-box-title',
    '.box-text-move',
    '.photo-gallery-navigation__button',
    '.footer'
];
let listElForAnim_2 = [
    '.info-group-photo__inner',
    '.info-box-img',
    '.wr-gif',
    '.info-img-small'
];
let listElForAnim_3 = [
    '.content__line',
    '.info-line'
];

handleClassNameForAnimation(listElForAnim_1, 'fadeIn', 50);
handleClassNameForAnimation(listElForAnim_2, 'fadeIn', 50);
handleClassNameForAnimation(listElForAnim_3, 'widthIn', 50);

// Start midnight
$(document).ready(function(){
    // Change this to the correct selector.
    $('header.fixed').midnight();
    $('.wr-btn-h__inner').midnight();
});