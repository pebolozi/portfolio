// Smooth scroll for in-page links (native behavior on most browsers)
document.documentElement.style.scrollBehavior = 'smooth';

const links = [...document.querySelectorAll('.snav__link')];
const navIds = links.map(a => a.getAttribute('href').slice(1)); // ['works','components','about']
const sections = navIds.map(id => document.getElementById(id)).filter(Boolean);

// 화면에 존재하는 모든 섹션(네비 제외 포함: home, contact 등)
const allSections = [...document.querySelectorAll('main > section[id]')];
const ENTER_OFFSET = 16;

const setActiveNav = () => {
  const y = window.scrollY || 0;
  const headerH = header.getBoundingClientRect().height;
  const fromTop = y + headerH;

  // 1) 전체 섹션 중 현재 상단에 걸린 섹션 id를 찾음
  let currentTopId = null;
  for (const sec of allSections) {
    const secTop = sec.getBoundingClientRect().top + y;
    if (secTop - ENTER_OFFSET <= fromTop) currentTopId = sec.id;
    else break;
  }

  // 2) 그 섹션이 네비 대상이면 active, 아니면 active 전부 해제
  const currentId = navIds.includes(currentTopId) ? currentTopId : null;

  links.forEach(a => {
    const isActive = currentId && a.getAttribute('href') === `#${currentId}`;
    a.classList.toggle('active', !!isActive);
    a.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
};


// Header shrink on scroll
const header = document.querySelector('header');
const shrinkAt = 10;
const onScroll = () => {
  // if (window.scrollY > shrinkAt) header.classList.add('shrink');
  // else header.classList.remove('shrink');

  const should = window.scrollY > shrinkAt;
  header.classList.toggle('shrink', should);
  document.documentElement.classList.toggle('shrink', should); //2025.08.28
  setActiveNav();
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();



function getDateDifference(startDateStr) {
  const startDate = new Date(startDateStr);
  const today = new Date();

  let years = today.getFullYear() - startDate.getFullYear();
  let months = today.getMonth() - startDate.getMonth();
  let days = today.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

function updateCareerText() {
  const startDate = "2022-06-13"; // 입사일로 변경
  const { years, months, days } = getDateDifference(startDate);
  const nthYear = years + 1; // 여기에서 "n년차" 표현 조정
  const yearText = `${nthYear}년차`;
  const detailText = `${years}년 ${months}개월`;//${days}일)
  document.getElementById("careerText").textContent = `${detailText} 경력의 퍼블리셔`;
}
updateCareerText();





// 메인 애니메이션
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
    // gsap.to(요소, 시간, 옵션);
    gsap.to(
        selector, //선택자
        random(1.5, 2.5), //애니메이션 동작 시간
        { //옵션
            y: size,
            repeat: -1, //gsap 라이브러리에서 지원하는 옵션(-1 = 무한반복)
            yoyo: true, //gsap 라이브러리에서 지원하는 옵션
            ease: Power1.easeInOut,
            delay: random(0, delay)
        }
    );
}
floatingObject('.dot_1', 1, 15);
floatingObject('.dot_2', .5, 15);
floatingObject('.dot_3', 1.5, 20);
floatingObject('.dot_4', .7, 10);
floatingObject('.dot_5', 1.2, 12);
floatingObject('.dot_6', 1.5, 8);



/*아코디언*/
$(function () {
  function updateButtonState($accor, isOpen) {
    const $btn = $accor.find('.btn_accor');
    const $ico = $btn.find('.btn_accor_ico');
    $btn.attr('aria-expanded', isOpen);
    $ico.text(isOpen ? '내용 닫기' : '내용 보기');
  }

  function toggleAccordion($accor, open) {
    const $cont = $accor.find('.bx_accor_cont');

    if (open) {
      $accor.addClass('on');
      updateButtonState($accor, true);
      $cont.stop(true, true).slideDown(300);
    } else {
      $accor.removeClass('on');
      updateButtonState($accor, false);
      $cont.stop(true, true).slideUp(300);
    }
  }

  function scrollToAccordion($accor) {
    const offsetTop = $accor.offset().top;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 300);
  }

  $('.bx_accor_wrap').each(function () {
    const $wrap = $(this);
    const type = $wrap.data('accor-type') || 'basic'; // 기본값 'basic'

    //  초기 상태 처리: .on 유무에 따라 정리
    $wrap.find('.bx_accor').each(function () {
      const $accor = $(this);
      const $cont = $accor.find('.bx_accor_cont');
      const isOpen = $accor.hasClass('on');

      $cont[isOpen ? 'show' : 'hide']();
      updateButtonState($accor, isOpen);
    });

    //  클릭 이벤트
    $wrap.find('.btn_accor').on('click', function () {
      const $accor = $(this).closest('.bx_accor');
      const isOpen = $accor.hasClass('on');

      if (type === 'basic') {
        toggleAccordion($accor, !isOpen);
      }

      if (type === 'single') {
        if (!isOpen) {
          $wrap.find('.bx_accor').not($accor).each(function () {
            toggleAccordion($(this), false);
          });
          toggleAccordion($accor, true);
          scrollToAccordion($accor);
        } else {
          toggleAccordion($accor, false);
        }
      }
    });
  });
});


// 탭
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tabset').forEach(initTabset);
});

function initTabset(root) {
  const nav = root.querySelector(':scope > .tab-nav');
  const wrap = root.querySelector(':scope > .tab-panels');
  if (!nav || !wrap) return;

  const tabs   = nav.querySelectorAll('[role="tab"]');
  const panels = wrap.querySelectorAll(':scope > .tab-panel');

  const findPanel = (tab) => {
    const id = tab.getAttribute('aria-controls');
    if (!id) return null;
    try {
      return wrap.querySelector('#' + (CSS.escape ? CSS.escape(id) : id));
    } catch {
      return wrap.querySelector("[id='" + id + "']");
    }
  };

  const activate = (tab, focus = false) => {
    // 이 탭셋의 직속 탭/패널만 초기화
    tabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      t.classList.remove('is-active');
    });
    panels.forEach(p => {
      p.hidden = true;
      p.setAttribute('aria-hidden', 'true');
    });

    // 선택 적용
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.classList.add('is-active');

    const panel = findPanel(tab);
    if (panel) {
      panel.hidden = false;
      panel.setAttribute('aria-hidden', 'false');
    }
    if (focus) tab.focus();
  };

  // 초기 표시: 선택된 탭(없으면 1번째)
  panels.forEach(p => { p.hidden = true; p.setAttribute('aria-hidden', 'true'); });
  const selected = nav.querySelector('[role="tab"][aria-selected="true"]') || tabs[0];
  if (selected) activate(selected, false);

  // 클릭 위임(이 root 소속 탭만 처리)
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[role="tab"]');
    if (!btn) return;
    if (btn.closest('.tabset') !== root) return; // 내부/외부 간섭 방지
    e.preventDefault();
    activate(btn, true);
  });
}



// 텍스트필드

//인풋 초기화
document.querySelectorAll('.bx_input_box').forEach(group => {
    const inputField = group.querySelector('.bx_input_txt');
    const resetButton = group.querySelector('.clearable_btn')

    if(resetButton) {
        //입력값이 있을 때만 초기화 버튼 보이기
        inputField.addEventListener('input', function(){
            setClass()
        });
        inputField.addEventListener('focus', function(){
            setClass()
        });

        function setClass() {
            if(inputField.value) {
                resetButton.classList.add('is_active');
            } else {
                resetButton.classList.remove('is_active');
            }
        }

        group.addEventListener('focusout', function(event) {
            if(!group.contains(event.relatedTarget)) {
                resetButton.classList.remove('is_active');
            }
        });

        //초기화 버튼 클릭 시 값 지우고 버튼 숨김 + 포커스 이동
        resetButton.addEventListener('click', function() {
            inputField.value = '';
            resetButton.classList.remove('is_active');

            //포커스 이동
            setTimeout(() => {
                inputField.focus();
            }, 100);
        });
    }
});