function scrollToElement(e) {
    const hash = e.target.hash;
    // console.log(hash);
    if (hash !== "#social") {
        e.preventDefault();

        const offset = (window.innerWidth >= 700) ? 97 : 35;

        const element = document.querySelector(hash);
        let posicionY = Number(element.getBoundingClientRect().top + window.scrollY - offset);
        posicionY = Math.round(posicionY)
        // console.log(posicionY);


        window.scrollTo({
            top: posicionY,
            behavior: 'smooth'
        });
    } else {
        const element = document.querySelector(hash);
        let posicionY = Number(element.getBoundingClientRect().top + window.scrollY);
        window.scrollTo({
            top: posicionY,
            behavior: 'smooth'
        });
    }
}


var boolClick = true;
function windowOpenBlank(elements) {
    elements.forEach(element => {
        element.addEventListener('click', function (e) {

            // console.log("event:", e.target);
            // console.log("event father:", e.target.parentNode);
            // console.log("blank-button", e.target.parentNode.parentNode.classList.value.includes("blank-button"));
            // console.log("event frames:", e.target.parentNode.classList.value.includes("link"));

            var href = ""

            if (!(e.target.parentNode.classList.value.includes("link")) && !(e.target.parentNode.classList.value.includes("desarrollo-with"))) {

                if (e.target.parentNode.parentNode.classList.value.includes("blank-button")) {
                    // console.log("target firstelement:", e.target.parentNode.parentNode.firstElementChild.href);
                    href = e.target.parentNode.parentNode.firstElementChild.href;
                }
                // else {
                // console.log("parendNode?href: ", e.target.parentNode.parentNode.parentNode.firstElementChild.href);
                // console.log("parendNode?: ", e.target.parentNode.parentNode.parentNode.classList.value.includes("blank-button"));
                // href = e.target.parentNode.parentNode.parentNode.firstElementChild.href;
                // }
            }


            if (boolClick && !!(href)) {
                window.open(href, "_blank")
                boolClick = false
            }

            setTimeout(() => {
                boolClick = true
            }, 500);

            // window.open(href, "_self");
        });
    });


}


const ancla = document.querySelectorAll('.ancla');
const divButton = document.querySelectorAll('.blank-button');
const projects = document.querySelectorAll('.project');

ancla.forEach(element => {
    element.addEventListener('click', scrollToElement);
})

windowOpenBlank(divButton);
windowOpenBlank(projects);

// divButton.forEach(element => {
//     element.addEventListener('click', windowOpenBlank);
// });

// projects.forEach(element => {
//     element.addEventListener('click', windowOpenBlank);
// });

const imgContainer = document.querySelector('.img-container');
const aboutme = document.getElementById('sobremi');
const header = document.querySelector('.header-nav');
const photo = document.getElementById('photo');

document.addEventListener("DOMContentLoaded", function () {

    // if (window.scrollY > 120 && window.innerWidth > 700) {
    //     img.classList.add('small');
    //     img.classList.remove('img-photo');
    //     aboutme.style.marginTop = "330px"

    // }


    if (window.innerWidth > 700) {
        imgContainer.classList.add('img-photo');
        // aboutme.style.marginTop = "50px"
    }

    if (window.innerWidth < 700) {
        imgContainer.classList.add('img-photo');
        imgContainer.classList.remove('small');
        aboutme.style.marginTop = "0px"

    }

    window.addEventListener('scroll', function () {
        if (window.scrollY > 120 && window.innerWidth > 700) {
            imgContainer.classList.remove('img-photo');
            imgContainer.classList.add('small');
            aboutme.style.marginTop = "330px"

        } else if (window.scrollY < 119 && window.innerWidth > 700) {
            console.log(window.scrollY);
            aboutme.style.marginTop = "0px"
            imgContainer.classList.remove('small');
            photo.style.height = parseInt(photo.style.height) - parseInt(window.scrollY) + "px";
            // photo.style.height = `${window.scrollY - 200}px`;
            // console.log("img:", photo.style.height);

        } else if (window.innerWidth > 700) {
            imgContainer.classList.add('img-photo');
            aboutme.style.marginTop = "50px"
        }

        if (window.innerWidth < 700) {
            imgContainer.classList.add('img-photo');
            imgContainer.classList.remove('small');
            aboutme.style.marginTop = "0px"

        }

        // var lastScroll = (window.scrollY < 297) ? 297 : Math.round(lastScroll);

        // console.log(lastScroll);

    });
});



var bool = true
document.querySelector('.img-photo img').addEventListener('click', function () {
    event.stopPropagation();
    this.classList.toggle('expanded');

    document.body.classList.toggle('no-scroll');

    window.addEventListener('scroll', function (e) {
        // document.querySelector('.img-photo img').classList.remove('expanded');
    });
});

// photo.addEventListener('click', function (e) {
//     e.preventDefault();

//     // if (bool) {
//     //     imgContainer.style.height = "100vh";
//     //     imgContainer.style.width = "100vw";

//     //     photo.style.width = "70%";
//     //     photo.style.height = "70%";

//     // } else {

//     //     imgContainer.style.height = "auto";
//     //     imgContainer.style.width = "auto";
//     //     imgContainer.style.justifyContent = "center"

//     //     photo.style.width = "200px";
//     //     photo.style.height = "200px";

//     // }
//     bool = !bool

// });


const arrowCuboQr = document.getElementById('arrow');
const cuboQr = document.querySelector('.contact');

arrowCuboQr.addEventListener('click', function (e) {
    e.preventDefault()

    cuboQr.classList.toggle("open");
});