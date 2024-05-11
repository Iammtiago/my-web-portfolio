// import JsonData from "./projects.json";
// const JsonData = require("./projects.json");

function scrollToElement(e) {
    e.preventDefault();
    const hash = e.target.hash;
    // console.log(hash);
    if (hash !== "#social") {

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

async function fetchProject() {
    const allProjects = document.querySelector('.all-projects');
    // const response = fetch('./projects.json', {
    //     mode: "no-cors"
    // });
    fetch('./projects.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    // console.log(response);
    // const projects = await response.text()
    // console.log(projects);
}

fetchProject();

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

ancla.forEach(element => {
    element.addEventListener('click', scrollToElement);
})

const divButtonAll = document.querySelectorAll('.blank-button');
const projectsAll = document.querySelectorAll('.project');
windowOpenBlank(divButtonAll);
windowOpenBlank(projectsAll);

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

        document.getElementById('wpp-icon-social')
    }

    window.addEventListener('scroll', function () {
        if (window.scrollY > 120 && window.innerWidth > 700) {
            imgContainer.classList.remove('img-photo');
            imgContainer.classList.add('small');
            aboutme.style.marginTop = "330px"

        } else if (window.scrollY < 119 && window.innerWidth > 700) {
            // console.log(window.scrollY);
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
document.querySelector('.img-photo img').addEventListener('click', function (event) {
    // event.stopPropagation();
    // this.classList.toggle('expanded');

    document.body.classList.toggle('no-scroll');

    window.addEventListener('scroll', function (e) {
        // document.querySelector('.img-photo img').classList.remove('expanded');
    });
});


const arrowCuboQr = document.getElementById('arrow');
const iconWpp = document.getElementById('iconWpp');
const cuboQr = document.querySelector('.contact');

arrowCuboQr.addEventListener('click', function (e) {
    e.preventDefault()

    cuboQr.classList.toggle("open");
});

iconWpp.addEventListener('click', function (e) {
    e.preventDefault()

    cuboQr.classList.add("open");
});



const buttonsCV = document.querySelectorAll('.cv');
buttonsCV.forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault()

        var ancla = document.createElement("a");
        ancla.download = "Santiago Rodriguez CV"

        // console.log(e.target.parentNode);
        // console.log(e.target.parentNode.classList.value.includes("spanish"));
        if (e.target.parentNode.classList.value.includes("spanish")) {
            ancla.href = "./src/cv/Santiago Rodriguez curriculum spanish.pdf"
        } else {
            ancla.href = "./src/cv/Santiago Rodriguez curriculum english.pdf"
        }

        ancla.target = "_blank";

        ancla.click();
    });
});