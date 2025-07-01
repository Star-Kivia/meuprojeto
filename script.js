// 🌸 PRELOADER
$(window).on('load', function() {
    setTimeout(function() {
        $('.preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    }, 1500);
});

// 🌸 MENU MOBILE
$(document).ready(function() {
    $('.menu-toggle').click(function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
        
        // Fechar menu ao clicar em um link
        $('.nav-link').on('click', function() {
            $('.menu-toggle').removeClass('active');
            $('.nav-menu').removeClass('active');
        });
    });

    // 🌸 NAVEGAÇÃO SUAVE
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });

    // 🌸 HEADER DINÂMICO
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var flavorsOffset = $('#sabores').offset().top - 100;

        if (scroll > 100) {
            $('.header').addClass('visible');
        } else {
            $('.header').removeClass('visible');
        }

        if (scroll > flavorsOffset) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }

        // Ativar link do menu conforme scroll
        $('section').each(function() {
            var sectionTop = $(this).offset().top - 100;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var navLink = $('.nav-link[href="#' + $(this).attr('id') + '"]');

            if (scroll >= sectionTop && scroll < sectionBottom) {
                navLink.addClass('active');
            } else {
                navLink.removeClass('active');
            }
        });
    }).scroll();

    // 🌸 BOTÃO VOLTAR AO TOPO
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });

    // 🌸 MODO ESCURO
    $('.dark-mode-toggle').click(function() {
        $('body').toggleClass('dark-mode');
        localStorage.setItem('darkMode', $('body').hasClass('dark-mode') ? 'enabled' : 'disabled');
    });

    // Verificar preferência salva
    if (localStorage.getItem('darkMode') === 'enabled') {
        $('body').addClass('dark-mode');
    }

    // 🌸 CONTADOR DE PROMOÇÃO
    function updateCounter() {
        var endDate = new Date('July 6, 2025 23:59:59').getTime();
        var now = new Date().getTime();
        var distance = endDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        $('#days').text(days < 10 ? '0' + days : days);
        $('#hours').text(hours < 10 ? '0' + hours : hours);
        $('#minutes').text(minutes < 10 ? '0' + minutes : minutes);
        $('#seconds').text(seconds < 10 ? '0' + seconds : seconds);

        if (distance < 0) {
            clearInterval(counterInterval);
            $('.counter').html('<p class="promo-ended">A promoção encerrou!</p>');
        }
    }

    var counterInterval = setInterval(updateCounter, 1000);
    updateCounter();

    // 🌸 GALERIA (LIGHTBOX)
    $('.gallery-item').click(function() {
        var imgSrc = $(this).find('img').attr('src');
        var imgAlt = $(this).find('img').attr('alt') || '';

        $('.lightbox-content').attr('src', imgSrc);
        $('.lightbox-caption').text(imgAlt);
        $('.lightbox').fadeIn('fast');
    });

    $('.close-lightbox').click(function() {
        $('.lightbox').fadeOut('fast');
    });

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $('.lightbox').fadeOut('fast');
        }
    });

    // 🌸 ANIMAÇÕES WOW.JS
    new WOW({
        offset: 100,
        mobile: true,
        live: true
    }).init();

    // 🌸 AJUSTES ESPECÍFICOS PARA RIFA
    function handleRaffleSection() {
        if ($(window).width() < 768) {
            $('.raffle-content').css('flex-direction', 'column');
            $('.raffle-details li').css({
                'flex-direction': 'row',
                'align-items': 'center'
            });
            $('.raffle-buttons').css('justify-content', 'center');
        } else {
            $('.raffle-content').css('flex-direction', 'row');
        }
    }

    $(window).on('resize load', handleRaffleSection);
    handleRaffleSection();

    // 🌸 EFEITOS EXTRAS
    $('.flavor-card').hover(
        function() {
            $(this).find('.flavor-icon').css({
                'transform': 'rotate(15deg) scale(1.1)'
            });
        },
        function() {
            $(this).find('.flavor-icon').css({
                'transform': 'rotate(0deg) scale(1)'
            });
        }
    );

    // 🌸 REDUÇÃO DE MOTION (ACESSIBILIDADE)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        $('*').css({
            'animation': 'none !important',
            'transition': 'none !important'
        });
    }
});
