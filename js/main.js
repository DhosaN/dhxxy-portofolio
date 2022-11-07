// Nav Menu

(() =>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavMenu = document.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavMenu.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navMenu.classList.toggle("open");
        bodyScrollingToggle()();
    }
    function hideNavMenu(){  
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyStopScrollingToggle();
    }
    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }

    document.addEventListener("click", (event) =>{
        if(event.target.classList.contains("link-item")){
            if(event.target.hash !==""){
                event.preventDefault();
                const hash = event.target.hash;
                // deactive active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // active new section
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // deactive new section
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                // Active new section link-item 
                if(navMenu.classList.contains("open")){
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide nav menu
                    hideNavMenu();
                    bodyScrollingToggle();
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) =>{
                        if(hash === item.hash){
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("inner-shadow", "outer-shadow"); 
                        }
                    })

                    fadeOutEffect();
                }
                window.location.hash = hash;
                
            }
        }
    })

})();

// About Section Tabs 

(() =>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("tab-item") &&
        !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector(".active").classList.remove("outer-shadow",
            "active");
            event.target.classList.add("active", "outer-shadow");
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    });
})();

    function bodyStopScrollingToggle(){
        document.body.classList.toggle("hidden-scrolling");
    }
    function bodyScrollingToggle(){
        document.body.classList.toggle("scrolling");
    }

// Portofolio filter and popup
(() =>{
    const filterContainer = document.querySelector(".portofolio-filter"),
    portofolioItemsContainer = document.querySelector(".portofolio-items"),
    portofolioItems = document.querySelectorAll(".portofolio-item"),
    popup = document.querySelector(".portofolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    // filter portofolio item
    filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") &&
        !event.target.classList.contains("active")){
            // Deactive exit active 'filter-items'
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // activate new 'filter-item'
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            portofolioItems.forEach((item) =>{
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portofolioItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".portofolio-item-inner")){
            const portofolioItem = event.target.closest(".portofolio-item-inner").
            parentElement;
            // get portofolion index
            itemIndex = Array.from(portofolioItem.parentElement.children).indexOf(
                portofolioItem);
            screenshots = portofolioItems[itemIndex].querySelector(
                ".portofolio-item-img img").getAttribute("data-screenshots");
            // convert screenshoots
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            }
            else{
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", ()=>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open")
        bodyStopScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // Active img popup
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src=imgSrc;
        // Deactive img popup
        popupImg.onload = () => {
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })
    // prev slide
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
        console.log("slideIndex:" + slideIndex);
    })
    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })

    function popupDetails(){
        // if
        if(!portofolioItems[itemIndex].querySelector(".portofolio-item-details")){
            projectDetailsBtn.style.display="none";
            return; // end
        }
        projectDetailsBtn.style.display="block";
        // get the project details
        const details = portofolioItems[itemIndex].querySelector(
            ".portofolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portofolioItems[itemIndex].querySelector(
            ".portofolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portofolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }

})();


(() =>{
    const sliderContainer = document.querySelector(".teams-slider-container"),
    slides = sliderContainer.querySelectorAll(".teams-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".teams-slider-nav .prev"),
    nextBtn = document.querySelector(".teams-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".teams-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    // set width
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })
    // set width of sliderContainer
    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () =>{
        if(slideIndex === slides.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        slider();
    })
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = slides.length-1;
        }
        else{
            slideIndex--;
        }
        slider();
    })

    function slider(){
        // Deactive class active
        sliderContainer.querySelector(".teams-item.active").classList.remove("active");
        // active new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }

})();
// Links
(() =>{
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>{
        if(!section.classList.contains(".active")){
            section.classList.add("hide");
        }
    })
})