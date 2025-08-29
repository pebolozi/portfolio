// assets.js
(function loadAssets(){
  const head = document.head;
  const links = [
    { rel:"preconnect", href:"https://fonts.googleapis.com" },
    { rel:"preconnect", href:"https://fonts.gstatic.com", crossOrigin:"anonymous" },
    { rel:"stylesheet", href:"https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&family=Noto+Sans+KR:wght@100..900&display=swap" },
    { rel:"stylesheet", href:"https://use.typekit.net/nen3mlm.css" },
    { rel:"stylesheet", href:"https://fonts.googleapis.com/icon?family=Material+Icons" },
    { rel:"stylesheet", href:"../css/common.css" },
    { rel:"stylesheet", href:"../css/main.css" }
  ];
  links.forEach(attr => {
    const link = document.createElement("link");
    Object.assign(link, attr);
    head.appendChild(link);
  });

  const scripts = [
    "http://code.jquery.com/jquery-3.6.0.min.js",
  ];
  scripts.forEach(src => {
    const s = document.createElement("script");
    s.src = src;
    s.defer = true;
    head.appendChild(s);
  });
})();