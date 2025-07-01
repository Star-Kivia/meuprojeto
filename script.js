// 🌸 DOCUMENT READY
$(document).ready(function() {
    // Remove preloader quando a página carrega
    setTimeout(function() {
        $('.preloader').fadeOut();
    }, 1500);
    
    // Ativa animações quando elementos entram na viewport
    new WOW().init();
    
    // 🌸 NAVEGAÇÃO SUAVE PARA LINKS INTERNOS
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = this.hash;
        var $target = $(target);
        
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 80
        }, 800, 'swing', function() {
            window.location.hash = target;
        });
    });
    
    // Ativa link ativo no menu conforme scroll
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop() + 100;
        
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance) {
                $('.nav-link.active').removeClass('active');
                $('.nav-link').eq(i).addClass('active');
            }
        });
    }).scroll();
    
    // 🌸 MENU MOBILE - CORREÇÕES
    $('.menu-toggle').click(function(e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });
    
    // Fecha menu ao clicar em um link
    $('.nav-link').click(function() {
        if ($(window).width() < 768) {
            $('.menu-toggle').removeClass('active');
            $('.nav-menu').removeClass('active');
        }
    });
    
    // Fecha menu ao clicar fora
    $(document).click(function(e) {
        if (!$(e.target).closest('.header-content').length && 
            $('.nav-menu').hasClass('active')) {
            $('.menu-toggle').removeClass('active');
            $('.nav-menu').removeClass('active');
        }
    });
    
    // Comportamento do header em mobile
    function handleHeaderScroll() {
        if ($(window).width() < 768) {
            if ($(window).scrollTop() > 50) {
                $('.header').addClass('scrolled').addClass('visible');
            } else {
                $('.header').removeClass('scrolled');
            }
        } else {
            // Comportamento original para desktop
            var flavorsSection = $('#sabores').offset().top;
            if ($(window).scrollTop() >= flavorsSection - 100) {
                $('.header').addClass('visible');
            } else {
                $('.header').removeClass('visible');
            }
        }
    }
    
    // Ajustar imagens para mobile
    function adjustImagesForMobile() {
        if ($(window).width() < 768) {
            $('.hero-image img').css({
                'max-width': '280px',
                'margin': '0 auto'
            });
        } else {
            $('.hero-image img').css({
                'max-width': '',
                'margin': ''
            });
        }
    }
    
    // Inicializações de scroll e resize
    $(window).on('scroll', handleHeaderScroll).trigger('scroll');
    $(window).on('resize load', adjustImagesForMobile).trigger('resize');
    
    // 🌸 BOTÃO VOLTAR AO TOPO
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('active');
        } else {
            $('.back-to-top').removeClass('active');
        }
    });
    
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
    
    // 🌸 CONTADOR PARA PROMOÇÕES
    function updateCounter() {
        // Data final da promoção (6 de julho de 2025)
        var endDate = new Date('July 6, 2025 23:59:59').getTime();
        var now = new Date().getTime();
        var distance = endDate - now;
        
        // Cálculos para dias, horas, minutos e segundos
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Exibe o resultado
        $('#days').text(days.toString().padStart(2, '0'));
        $('#hours').text(hours.toString().padStart(2, '0'));
        $('#minutes').text(minutes.toString().padStart(2, '0'));
        $('#seconds').text(seconds.toString().padStart(2, '0'));
        
        // Se o contador chegar a zero
        if (distance < 0) {
            clearInterval(counterInterval);
            $('.counter').html('<p>A promoção encerrou!</p>');
        }
    }
    
    // Atualiza o contador a cada 1 segundo
    updateCounter();
    var counterInterval = setInterval(updateCounter, 1000);
    
    // 🌸 EFEITO PARALLAX PARA IMAGENS
    $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop();
        
        $('.hero-image img').css({
            'transform': 'translateY(' + scrollPosition * 0.3 + 'px)'
        });
    }); 
    
    // 🌸 ANIMAÇÃO PARA CARDS DE SABORES
    $('.flavor-card').hover(
        function() {
            // Mouse entra
            $(this).find('.flavor-icon').css({
                'transform': 'rotate(15deg) scale(1.1)'
            });
        },
        function() {
            // Mouse sai
            $(this).find('.flavor-icon').css({
                'transform': 'rotate(0deg) scale(1)'
            });
        }
    );
    
    // 🌸 EFEITO DE DIGITAÇÃO PARA TÍTULOS
    function typeWriter(element, text, i, fnCallback) {
        if (i < text.length) {
            element.html(text.substring(0, i+1) + '<span aria-hidden="true"></span>');
            
            setTimeout(function() {
                typeWriter(element, text, i + 1, fnCallback)
            }, 100);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }
    
    // Inicia o efeito de digitação
    $('.hero-title').each(function() {
        var text = $(this).text();
        $(this).html('');
        typeWriter($(this), text, 0, function(){});
    });
    
    // 🌸 VALIDAÇÃO DE FORMULÁRIO (se adicionar no futuro)
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();
        
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Por favor, preencha todos os campos!');
            return false;
        }
        
        // Aqui você pode adicionar o código para enviar o formulário
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        $(this).trigger('reset');
    });
    
    // 🌸 INTERATIVIDADE PARA CARDS DE PROMOÇÃO
    $('.promo-card').click(function() {
        $(this).toggleClass('flipped');
    });
    
    // 🌸 EFEITO DE CONFETTI AO PARTICIPAR DA RIFA
    $('#raffleBtn').click(function() {
        for (var i = 0; i < 100; i++) {
            createConfetti();
        }
        
        setTimeout(function() {
            window.location.href = 'https://wa.me/5579999408131';
        }, 2000);
    });
    
    function createConfetti() {
        var confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = getRandomColor();
        document.body.appendChild(confetti);
        
        var animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: 'translateY(' + (window.innerHeight + 100) + 'px) rotate(' + (Math.random() * 360) + 'deg)', opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        animation.onfinish = function() {
            confetti.remove();
        };
    }
    
    function getRandomColor() {
        var colors = ['#ff6b9d', '#ff9ec6', '#8e7cc3', '#d9c4f7', '#ffd6e7'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // 🌸 DETECÇÃO DE REDUÇÃO DE MOTION PARA ACESSIBILIDADE
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (reduceMotion.matches) {
        $('*').css({
            'animation': 'none !important',
            'transition': 'none !important'
        });
    }

    // 🌸 MODO ESCURO
    $('.dark-mode-toggle').click(function() {
        $('body').toggleClass('dark-mode');
        
        // Salva preferência no localStorage
        if ($('body').hasClass('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Verifica preferência salva
    if (localStorage.getItem('darkMode') === 'enabled') {
        $('body').addClass('dark-mode');
    }

    // 🌸 GALERIA DE IMAGENS - LIGHTBOX
    $('.gallery-item').click(function() {
        var imgSrc = $(this).find('img').attr('src');
        var imgAlt = $(this).find('img').attr('alt');
        
        $('.lightbox-content').attr('src', imgSrc);
        $('.lightbox-caption').text(imgAlt);
        $('.lightbox').fadeIn();
    });

    $('.close-lightbox').click(function() {
        $('.lightbox').fadeOut();
    });

    $(document).keyup(function(e) {
        if (e.key === "Escape") {
            $('.lightbox').fadeOut();
        }
    });

    $('.lightbox').click(function(e) {
        if (e.target !== this) return;
        $('.lightbox').fadeOut();
    });
});
