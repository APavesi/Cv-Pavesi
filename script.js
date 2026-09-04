(function(){
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Nav scrolled state + progress dial ---------- */
  var nav = document.getElementById("siteNav");
  var dialHand = document.getElementById("dialHand");

  function onScroll(){
    var y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle("is-scrolled", y > 40);

    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    dialHand.style.width = pct + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMenu(){
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  navToggle.addEventListener("click", function(){
    var isOpen = mobileMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", closeMenu);
  });

  /* ---------- Active section indicator ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));

  var sectionObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id = entry.target.getAttribute("id");
        navLinks.forEach(function(link){
          link.classList.toggle("is-active", link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(function(s){ sectionObserver.observe(s); });

  /* ---------- Experience accordion ---------- */
  var toggles = document.querySelectorAll(".tl-toggle");
  toggles.forEach(function(btn){
    var body = btn.parentElement.querySelector(".tl-body");
    var expanded = btn.getAttribute("aria-expanded") === "true";
    body.style.maxHeight = expanded ? body.scrollHeight + "px" : "0px";

    btn.addEventListener("click", function(){
      var isExpanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", isExpanded ? "false" : "true");
      body.style.maxHeight = isExpanded ? "0px" : body.scrollHeight + "px";
    });
  });

  window.addEventListener("resize", function(){
    toggles.forEach(function(btn){
      var body = btn.parentElement.querySelector(".tl-body");
      if(btn.getAttribute("aria-expanded") === "true"){
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  /* ---------- Reveal on scroll ----------
     Kept to section headings only: a single quiet cue per section,
     not a scattered fade on every card. All content stays visible
     by default with no JS/observer dependency. */
  var revealTargets = document.querySelectorAll(".section-head");
  revealTargets.forEach(function(el){ el.classList.add("reveal"); });

  var revealObserver = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  revealTargets.forEach(function(el){ revealObserver.observe(el); });

})();
