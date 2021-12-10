$(function() {
    $('.header__slider').slick({
        arrows: false,
        dots: false,
        autoplay: true,
        speed: 1500,
        fade: true
    });

    $('.portfolio__slider').slick({
        arrows: true,
        infinite: true,
        speed: 300,
        prevArrow: '<button type="button" class="slick-prev"><img src="./img/arrow-left.svg" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./img/arrow-right.svg" alt="next"></button>',
    });

    $('a').on('click', function() {

        let href = $(this).attr('href');
    
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, {
            duration: 1000,   // по умолчанию «400» 
            easing: "linear" // по умолчанию «swing» 
        });
    
        return false;
    });

    const contactsFormTitle = document.querySelector('.contacts__form-title'),
    contactsForm = document.querySelector('.contacts__form');

    const removeTitle = () => {
        contactsFormTitle.classList.remove('success');
        contactsFormTitle.textContent = 'Заполните форму и коротко опишите требуемые работы';
    };

    $('.contacts__form').submit(function() { // проверка на пустоту заполненных полей. Атрибут html5 — required не подходит (не поддерживается Safari)
		if (document.form.name.value == '' || document.form.phone.value == '' ) {
			let valid = false;
			return valid;
		}
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {

            contactsFormTitle.classList.add('success');
            contactsFormTitle.textContent = 'Ваша заявка принята!';
            contactsForm.reset();
        
            setTimeout (removeTitle, 3000);
		});
		return false;
	});

});

const expirienceText = () => {

    let expirience = document.getElementById('expirience');

    const YEAR_STRING = ['год', 'года', 'лет'];
    const MONTH_STRING = ['месяц', 'месяца', 'месяцев'];

    const startDate = '2012-10-01',
        nowData = new Date();

    const difference = nowData.getTime() - (new Date(startDate)).getTime();

    const fullYear = Math.floor(difference / 1000 / 60 / 60 / 24 / 365);

    const fullMonth = Math.floor(((difference / 1000 / 60 / 60 / 24) % 365) / 31);

    function declOfNum(n, titles) {
        return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
    }

    if (fullYear) {
        if (fullMonth) {
            expirience.textContent = `${declOfNum(fullYear, YEAR_STRING)} ${declOfNum(fullMonth, MONTH_STRING)}`;
        } else {
            expirience.textContent = `${declOfNum(fullYear, YEAR_STRING)}`;
        }
    } else {
        expirience.textContent = `${declOfNum(fullMonth, MONTH_STRING)}`;
    }

};

expirienceText();

const popupLink = document.querySelector('.popup-link'),
    contactsPersonal = document.querySelector('.contacts__personal'),
    btnClose = document.querySelector('.btn-close'),
    footerCopy = document.querySelector('.footer__copy');

footerCopy.textContent = `© ${new Date().getFullYear()}. Все права защищены`;

const togglePopup = () => {
    contactsPersonal.classList.toggle('hide');
    contactsPersonal.classList.toggle('show');
};

popupLink.addEventListener('click', togglePopup);

btnClose.addEventListener('click', togglePopup);