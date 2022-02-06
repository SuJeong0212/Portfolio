'use strict';

// history.scrollRestoration = "manual"

let body = document.querySelector('body');
let targetArea = document.querySelector('.target_area');
let target = document.querySelector('.target');
let thumb = document.querySelector('.sec_01 .thumb');
let logo = document.querySelector('.logo_area');
let nav = document.querySelector('.nav');
let navWrap = document.querySelector('.nav_wrap');
let navText = document.querySelector('.nav_box > .inner > .nav_box');
let sec01 = document.querySelector('.sec_01');
let mousePointer = document.querySelectorAll('.pointer_event');
let circle = document.querySelectorAll('.circle');
let name = document.querySelector('.sec_01_wrap .name');
let portfolioName = document.querySelectorAll('.portfolio_title_area');
let portfolioImg = document.querySelectorAll('.portfolio_thumb_area');
let portfolioCnt = document.querySelectorAll('.portfolio_cnt_wrap');
let x = 0;
let y = 0;
let mx = 0;
let my = 0;

window.addEventListener('load', () => {

  // modal date event

  function getTime() {
    const time = new Date();
    const year = time.getFullYear();
    const month = ('0' + (time.getMonth() + 1)).slice(-2);
    const day = ('0' + time.getDate()).slice(-2);
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    document.querySelector('#modal_container .date_area .date').innerHTML = `${year}년 ${month}월 ${day}일 ${hour<10 ? `0${hour}`:hour}:${minutes<10 ? `0${minutes}`:minutes}:${seconds<10 ? `0${seconds}`:seconds} <img src="/assets/img/firecracker.png" alt="폭죽">`
  }


  function init() {
    setInterval(getTime, 1000);
  }

  init();


  //section_01 text_change event


  var words = document.getElementsByClassName('word');
  var wordArray = [];
  var currentWord = 0;

  words[currentWord].style.opacity = 1;
  for (var i = 0; i < words.length; i++) {
    splitLetters(words[i]);
  }

  function changeWord() {
    var cw = wordArray[currentWord];
    var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
    for (var i = 0; i < cw.length; i++) {
      animateLetterOut(cw, i);
    }

    for (var i = 0; i < nw.length; i++) {
      nw[i].className = 'letter behind';
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    }

    currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
  }

  function animateLetterOut(cw, i) {
    setTimeout(function () {
      cw[i].className = 'letter out';
    }, i * 80);
  }

  function animateLetterIn(nw, i) {
    setTimeout(function () {
      nw[i].className = 'letter in';
    }, 340 + (i * 80));
  }

  function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
      var letter = document.createElement('span');
      letter.className = 'letter';
      letter.innerHTML = content.charAt(i);
      word.appendChild(letter);
      letters.push(letter);
    }

    wordArray.push(letters);
  }

  changeWord();
  setInterval(changeWord, 4000);

  
  //section_01 circle mousemove evnet

  window.addEventListener("mousemove", pointer, false);

  function pointer(e) {
    x = e.pageX;
    y = e.pageY;
  }
  loop();

  sec01.addEventListener('mousemove', profilePosition, false);

  function profilePosition(e) {
    x = (e.clientX - window.innerWidth / 2);
    y = (e.clientY - window.innerHeight / 2);
  }
  loop2();

  function loop() {
    mx += (x - mx) * 0.2;
    my += (y - my) * 0.2;
    targetArea.style.transform = "translate(" + mx + "px," + my + "px)";

    requestAnimationFrame(loop);
  }

  function loop2() {
    mx += (x - mx) * 0.01;
    my += (y - my) * 0.01;
    circle[0].style.transform = "translate(" + (mx / 15) + "px," + (my / 15) + "px)";
    circle[1].style.transform = "translate(" + (mx / 25) + "px," + (my / 25) + "px)";
    circle[2].style.transform = "translate(" + -(mx / 20) + "px," + -(my / 20) + "px)";

    requestAnimationFrame(loop2);
  }

    //section_01 thumb event

    thumb.addEventListener('mouseenter', () => {
      name.classList.add('active');
    });
  
  
    thumb.addEventListener('mouseleave', () => {
      name.classList.remove('active');
    });
  
    thumb.addEventListener('click', () => {
      document.querySelector('.container').classList.add('modal_active');
      document.querySelector('html').classList.add('modal_active');
      document.querySelector('body').classList.add('modal_active');
      document.querySelector('#modal_container').classList.remove('out');
      document.querySelector('#modal_container').classList.add('one');
    })
  
    document.querySelector('#modal_container .modal_background').addEventListener('click', (e) => {
      if (e.target !== e.currentTarget) return; //이벤트 버블링 막기
      document.querySelector('.container').classList.remove('modal_active');
      document.querySelector('html').classList.remove('modal_active');
      document.querySelector('body').classList.remove('modal_active');
      document.querySelector('#modal_container').classList.add('out');
      document.querySelector('.modal_container').classList.add('out');
      document.querySelector('#modal_container').classList.remove('one');
      document.querySelector('.modal_container').classList.remove('one');
    })

     // section_02 event

  let url = [
    ['https://sujeong0212.github.io/tomorrow-house/'],
    ['https://sujeong0212.github.io/Naver_Shopping/','https://sujeong0212.github.io/Naver_Shopping/detail','https://sujeong0212.github.io/Naver_Shopping/order'],
    ['https://sujeong0212.github.io/LUSH/'],
    ['https://sujeong0212.github.io/Sulwhasoo/'],
    ['https://sujeong0212.github.io/Concierge/'],
    ['https://sujeong0212.github.io/Actor_SongHyeKyo/'],
    ['https://sujeong0212.github.io/Monami/'],
  ]

  portfolioCnt.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('active');
    })
    item.addEventListener('mouseleave', () => {
      item.classList.remove('active');
    })
    item.addEventListener('click', () => {
      url[index].forEach((link) => {
        if(index === 1) {
          winOpen();
        }
        window.open(link)
        console.log(link);
      })
    })
  })

  function winOpen() {
    window.open('https://sujeong0212.github.io/Naver_Shopping/', "네이버", "width=500px,height=1000px"),
      window.open('https://sujeong0212.github.io/Naver_Shopping/detail', "네이버2", "width=500px,height=1000px"),
      window.open('https://sujeong0212.github.io/Naver_Shopping/order', "네이버3", "width=500px,height=1000px")
  }

   //section_03 project2 event


   let prev = document.querySelector('.prev_button');
   let next = document.querySelector('.next_button');
   let carousel = document.querySelector('.carousel');
   let carouselItem = document.querySelectorAll('.carousel .item');
   let cellCount = 6; //아이템의 개수
   let selectIndex = 0; // item index 번호
   let modalContainer = document.querySelectorAll('.modal_container');
   let modalBackground = document.querySelectorAll('.modal_container .modal_background');
   let rotateCarousel = function () {
     let angle = selectIndex / cellCount * -360;
     carousel.style.transform = `translateZ(-540px) rotateY(${angle}deg)`;
   }
 
 
 
   prev.addEventListener('click', () => {
     selectIndex--;
     rotateCarousel()
   })
 
   next.addEventListener('click', () => {
     selectIndex++;
     rotateCarousel()
   })
 
   carouselItem.forEach((item, index) => {
     item.addEventListener('click', () => {
       document.querySelector('.container').classList.add('modal_active');
       document.querySelector('html').classList.add('modal_active');
       document.querySelector('body').classList.add('modal_active');
       modalContainer[index].classList.remove('out');
       modalContainer[index].classList.add('one');
     })
   });
 
   modalBackground.forEach((item, index) => {
     item.addEventListener('click', (e) => {
       if (e.target !== e.currentTarget) return;
       document.querySelector('.container').classList.remove('modal_active');
       document.querySelector('html').classList.remove('modal_active');
       document.querySelector('body').classList.remove('modal_active');
       modalContainer[index].classList.add('out');
       modalContainer[index].classList.remove('one');
     })
   });
 

  // nav event

  let removeNav;

  function navOpacity() {
    body.classList.contains('nav_active') ? (clearTimeout(removeNav), removeNav = setTimeout(() => navText.classList.add('active'), 1000)) :
      navText.classList.remove('active')
  }

  nav.addEventListener('click', () => {
    nav.classList.toggle('active');
    body.classList.toggle('nav_active');
    navOpacity();
  })

  let sec = document.querySelectorAll('section');
  let secCount = sec.length;
  let navMenu = document.querySelectorAll('.menu_list a');

  navMenu.forEach((item) => {
    item.addEventListener('click', function () {
      nav.classList.remove('active');
      body.classList.remove('nav_active')
      navText.classList.remove('active')
    });
  })

  navMenu[0].addEventListener('click', () => {
    document.querySelector('#sec01').scrollIntoView({
      behavior: "smooth"
    });
  })
  navMenu[1].addEventListener('click', () => {
    document.querySelector('#sec02').scrollIntoView({
      behavior: "smooth"
    });
  })
  navMenu[2].addEventListener('click', () => {
    document.querySelector('#sec03').scrollIntoView({
      behavior: "smooth"
    });
  })
  navMenu[3].addEventListener('click', () => {
    document.querySelector('#sec04').scrollIntoView({
      behavior: "smooth"
    });
  })

  // common mouse pointer event

  function increase() { //마우스 포인터 증가 
    target.style.transform = 'scale(1)'
  }

  function decrease() { //마우스 포인터 감소
    target.style.transform = 'scale(0.5)'
  }

  mousePointer.forEach((item) => { //forEach 함수로 pointer_event class를 가진 함수들을 차례로 하나씩 이벤트 실행
    item.addEventListener('mouseenter', decrease, false);
    item.addEventListener('mouseleave', increase, false);
  });


  logo.addEventListener('click', () => {
    document.body.scrollIntoView({
      behavior: "smooth"
    });
  });

  //common mouse wheel event

  sec.forEach((item, index) => {

    item.addEventListener('mousewheel', (e) => {

      let removeToast;

      function toast() {
        const toast = document.getElementById("toast");

        toast.classList.contains("reveal") ?
          (clearTimeout(removeToast), removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
          }, 1000)) :
          removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
          }, 1000)
        toast.classList.add("reveal"),
          toast.innerText = '마지막 페이지 입니다.'
      }

      e.preventDefault();
      let delta = 0;

      if (!e) e = window.event;
      if (e.wheelDelta) {
        delta = e.wheelDelta / 120;
      }

      let secSelector = sec[index];
      let nextEl = null;

      if (delta < 0) {
        if (index === sec.length - 1) {
          toast();
          return;
        }
        nextEl = secSelector.nextElementSibling;
      } else {
        nextEl = secSelector.previousElementSibling;
      }
      if (nextEl !== null) {
        window.scrollTo({
          top: window.pageYOffset + nextEl.getBoundingClientRect().top,
          left: 0,
          behavior: 'smooth'
        });
        setActive(nextEl);
      }
    }, {
      passive: false
    })
  });

  function setActive(el) {
    console.log(el);
    for (let i = 0; i < secCount; i++) {
      sec[i].classList.remove('active');
    }
    el.classList.add('active');
  }

})