window.addEventListener('load', function ()
    {
        var btnMenu = document.querySelector('.button-toggle');

        if (btnMenu) {
            btnMenu.addEventListener('click', function () {
                this.classList.toggle('open');
            })
        }
    }
)
