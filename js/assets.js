// assets.js
(function loadAssets(){
  const head = document.head;
  const links = [
    { rel:"preconnect", href:"https://fonts.googleapis.com" },
    { rel:"preconnect", href:"https://fonts.gstatic.com", crossOrigin:"anonymous" },
    { rel:"stylesheet", href:"https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&family=Noto+Sans+KR:wght@100..900&display=swap" },
    { rel:"stylesheet", href:"https://fonts.googleapis.com/icon?family=Material+Icons" }
  ];
  links.forEach(attr => {
    const link = document.createElement("link");
    Object.assign(link, attr);
    head.appendChild(link);
  });

})();