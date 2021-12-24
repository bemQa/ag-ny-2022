$(document).ready(function () {
	$('.burger').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.menu-links').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.menu-links, .burger');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    $('.anchor[href^="#"]').click(function () {
        if($(window).innerWidth() <= 1000) {
           $('.menu-links').removeClass('active'); 
           $('.burger').removeClass('active');
        }
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-150;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }
    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });
    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();
    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    function maskInit() {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });

        $(".card-mask").inputmask({
            mask:"9999-9999-9999-9999",
            "clearIncomplete": true
        });
    }
    maskInit();

    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[\da-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    if($('.select').length > 1) {
        $('select').each(function() {
            let $this = $(this).not('.select-search');
            let parent = $(this).not('.select-search').parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
        $('.select-search').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    } else {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }

    // восстановление пароля
    $('#restore-password .btn').click(function(e){
        e.preventDefault();
        if($('#restore-password form').valid()) {
            $('#restore-password .btn').addClass('disabled');
            $('.clock-text, .after-send').show();
            $('.before-send').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.after-send').hide();
                $('.before-send').show();
                $('#restore-password .btn').removeClass('disabled');
            });
        }
    });

    // повторный звонок
    $('.call-link').click(function(e){
        e.preventDefault();
        if($('#reg-call form').valid()) {
            $('.call-link').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.call-link').show();
            });
        }
    });

    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    $('.tab-trigger').click(function(){
        $('.tab-trigger').removeClass('active');
        var tab = $(this).data('tab');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-item').removeClass('active');
        $('.tab-item.' + tab).addClass('active');
    });

    function ferrisWheelTimer1() {
        let start_date = $('.lk-ferris-wheel-timer').data('timer');
        $('.lk-ferris-wheel-timer').countdown(start_date)
        .on('update.countdown', function (event) {
            $(this).html(event.strftime(
                `<div class="timer timer-hours">%H</div>
                <div class="timer timer-minutes">%M</div>
                <div class="timer timer-seconds">%S</div>`
            ));
        });
    }
    ferrisWheelTimer1();

    function ferrisWheelTimer2() {
        let start_date = $('.my-game-timer').data('timer');
        $('.my-game-timer').countdown(start_date)
        .on('update.countdown', function (event) {
            $(this).html(event.strftime(
                `<div class="timer timer-hours">%H</div>
                <div class="timer timer-minutes">%M</div>
                <div class="timer timer-seconds">%S</div>`
            ));
        });
    }
    ferrisWheelTimer2();

    if($('.prizes').length && $(window).innerWidth() < 1000) {
        $('.prizes').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    if($('.main-gold-choc-fames').length && $(window).innerWidth() < 1000) {
        $('.main-gold-choc-fames').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    $('.tooltip-trigger').on('click', function (e) {
        e.preventDefault();
        $(this).parent().find('.tooltip').addClass('active');
    });

    $('.tooltip-hover-trigger').on('mouseenter', function (e) {
        e.preventDefault();
        $(this).parent().find('.tooltip').addClass('active');
    });

    $('.tooltip-hover-trigger').on('mouseleave', function (e) {
        e.preventDefault();
        $(this).parent().find('.tooltip').removeClass('active');
    });

    $('.close-tooltip').on('click', function (e) {
        e.preventDefault();
        $(this).parent().removeClass('active');
    });

    function pinCode() {
        $('.pincode').keydown(function(e){
            $(this).val('');
        });
         
        $('.pincode').keyup(function(e){
            var $wrap = $(this).closest('.call-wrapper');
            var $inputs = $wrap.find('input');   
            var val = $(this).val();
            
            if(val == val.replace(/[0-9]/, '')) {
                $(this).val('');
                return false;
            }
            
            $inputs.eq($inputs.index(this) + 1).focus();
        });
    }

    pinCode();

    function turnApp() {
        let mql = window.matchMedia("(orientation: portrait)");

        if(mql.matches) {  
            $('.wrapper').removeClass('turn');
            $('.wrapper').addClass('not-turn');

            $('.game-ferris-wheel').css('transform', 'none');
        } else {  
            $('.wrapper').removeClass('not-turn');
            $('.wrapper').addClass('turn');

            if(window.innerHeight < 325 && screen.width >= 360) {
                $('.game-ferris-wheel').css('transform', 'scale(.8) translateY(-15px)');
            }
        }

        // Прослушка события изменения ориентации
        mql.addListener(function(m) {
            if(m.matches) {
                $('.wrapper').removeClass('turn');
                $('.wrapper').addClass('not-turn');

                $('.game-ferris-wheel').css('transform', 'none');
            }
            else {
                $('.wrapper').removeClass('not-turn');
                $('.wrapper').addClass('turn');

                if(window.innerHeight < 325 && screen.width >= 360) {
                    $('.game-ferris-wheel').css('transform', 'scale(.8) translateY(-15px)');
                }
            }
        });
    }
    if($('.game-page').length) {
        turnApp();
    }

    // добавить таймаут результату выигрыша после клика на колесе обозрения
    $('.draw-prize-btn').click(function(e) {
        setTimeout(function() { 
            OpenPopup('draw-prize');
        },1000);
    });

    function bowlingGame(result) {
        let video = $('#video-bowling-'+result).get(0);
        video.controls = false;
        $('.video-bowling').hide();
        $('#video-bowling-'+result).show();
        video.play();
        document.getElementById('video-bowling-'+result).addEventListener('ended', myHandler, false);
        function myHandler(e) {
            video.pause();
            if (result == 'fail') {
                OpenPopup('draw-fail');
            } else if (result == 'half') {
                OpenPopup('draw-fail');
            } else if (result == 'strike') {
                OpenPopup('draw-prize');
            }
        }
    }
    $('.bowling-game').click(function(e){
        // значение функции - один из 3х вариантов видео (fail, half, strike), если не нравятся названия результатов - поменять их и у айдишников видео
        bowlingGame('fail');
    });

    function rollerCoasterGame(result) {
        let video = $('#video-roller-coaster-'+result).get(0);
        video.controls = false;
        $('.video-roller-coaster').hide();
        $('#video-roller-coaster-'+result).show();
        video.play();
        document.getElementById('video-roller-coaster-'+result).addEventListener('ended', myHandler, false);
        function myHandler(e) {
            video.pause();
            if (result == '1-3') {
                OpenPopup('draw-fail');
            } else if (result == '2-3') {
                OpenPopup('draw-fail');
            } else if (result == '3-3') {
                OpenPopup('draw-prize');
            }
        }
    }
    $('.roller-coaster-game').click(function(e){
        // значение функции - один из 3х вариантов видео (1-3, 2-3, 3-3), если не нравятся названия результатов - поменять их и у айдишников видео
        rollerCoasterGame('3-3');
    });

    // старый вариант анимации
    function spinGame(first, second, third) {
        var chocos = ['zero','one','two','three','four','five','six','seven','eight'];

        function spinOne() {
            var index = first;
            var equation = $('#equation1').removeClass("done zero one two three four five six seven eight").addClass(chocos[index]),
                timeout = setTimeout(function() { equation.addClass('done') },3000);
        }
        function spinTwo() {
            var index = second;
            var equation = $('#equation2').removeClass("done zero one two three four five six seven eight").addClass(chocos[index]),
                timeout = setTimeout(function() { equation.addClass('done') },3500);
        }
        function spinThree() {
            var index = third;
            var equation = $('#equation3').removeClass("done zero one two three four five six seven eight").addClass(chocos[index]),
                timeout = setTimeout(function() { 
                    equation.addClass('done');
                    // показываем попап с результатом
                    setTimeout(function() { 
                        OpenPopup('draw-prize');
                    },1000);
                },4000);
        }
        spinOne();
        spinTwo();
        spinThree();
    }

    // новый вариант
    // function spinGame(first, second, third) {
    //     var chocos_pos = ['-2190px','-2435px','-2675px','-2920px','-3160px','-3405px','-3650px','-3895px','-4135px'];

    //     function spinOne() {
    //         var index = first;
    //         var equation = $('#equation1');
    //         var timeout = setTimeout(function() { 
    //             equation.removeClass('done');
    //             setTimeout(function() {
    //                 equation.addClass('done');
    //                 $('#equation1 .spinner').css({'background-position': 'center '+chocos_pos[index]}) 
    //             },3000);
    //         },300);
    //     }
    //     function spinTwo() {
    //         var index = second;
    //         var timeout = setTimeout(function() { 
    //             $('#equation2 .spinner').css({'background-position': 'center '+chocos_pos[index]}) 
    //         },600);
    //     }
    //     function spinThree() {
    //         var index = third;
    //         var timeout = setTimeout(function() { 
    //             $('#equation3 .spinner').css({'background-position': 'center '+chocos_pos[index]});
    //             // показываем попап с результатом
    //             setTimeout(function() { 
    //                 OpenPopup('draw-prize');
    //             },4000);
    //         },900);
    //     }
    //     spinOne();
    //     spinTwo();
    //     spinThree();
    // }
    
    $('.funtomat-game').click(function(e){
        // значения функции - номера шоколадок от 0 до 8, для 1-3 элементов спина
        spinGame(7, 2, 1);
    });

    function cardGame(first, second, third, fourth) {
        var chocos = ['zero','one','two','three','four','five','six','seven','eight','nine','ten'];

        function flipOne() {
            var index = first;
            var flip = $('#flip1').removeClass("active zero one two three four five six seven eight").addClass(chocos[index]),
                timeout = setTimeout(function() { flip.addClass('active') },2000);
        }
        function flipTwo() {
            var index = second;
            var flip = $('#flip2').removeClass("active zero one two three four five six seven eight").addClass(chocos[index]),
                timeout = setTimeout(function() { flip.addClass('active') },2400);
        }
        function flipThree() {
            var index = third;
            var flip = $('#flip3').removeClass("active zero one two three four five six seven eight").addClass(chocos[index]),
                timeout = setTimeout(function() { 
                    flip.addClass('active');
                },2800);
        }
        function flipFour() {
            var index = fourth;
            var flip = $('#flip4').removeClass("active zero one two three four five six seven eight").addClass(chocos[index]),
                timeout = setTimeout(function() { 
                    flip.addClass('active');
                    // показываем попап с результатом
                    setTimeout(function() { 
                        OpenPopup('draw-prize');
                    },1000);
                },3200);
        }
        flipOne();
        flipTwo();
        flipThree();
        flipFour();
    }
    
    $('.game-club-game').click(function(e){
        // значения функции - номера шоколадок от 0 до 10, для 1-4 элементов карт
        cardGame(0, 1, 2, 3);
    });
    
});

function imagePreview() {
    var reader1 = new FileReader();
    var reader2 = new FileReader();

    // событие, когда файл загружается
    reader1.onload = function(e) {
        document.querySelector(".image-preview-img1").src = e.target.result;
    };

    reader2.onload = function(e) {
        document.querySelector(".image-preview-img2").src = e.target.result;
    };

    // выполнение функции при выборе файла
    document.querySelector(".image-input1").addEventListener("change", () => {
        loadImageFile1();
        $('.photo-upload-info span').hide();
        $('.photo-upload-info a').show();
    });
    document.querySelector(".image-input2").addEventListener("change", () => {
        loadImageFile2();
        $('.photo-upload-info span').hide();
        $('.photo-upload-info a').show();
    });

    // функция выборки файла
    function loadImageFile1() {
        var file1 = document.querySelector(".image-input1").files[0];
        reader1.readAsDataURL(file1);
    }
    function loadImageFile2() {
        var file2 = document.querySelector(".image-input2").files[0];
        reader2.readAsDataURL(file2);
    }

    $('.reset-image-form').click(function(e){
        $('.image-form')[0].reset();
        $(".image-preview-img").prop('src', '');
        $('.photo-upload-info span').show();
        $('.photo-upload-info a').hide();
    });
}
if($('.image-form').length) {
    imagePreview();
}