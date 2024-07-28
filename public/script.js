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

function createDevelopmentStructure(frameworks) {

    const fragment = new DocumentFragment();

    for (const framework of frameworks) {
        const ancla = document.createElement("a");
        ancla.classList.add("link");
        ancla.target = '_blank';
        ancla.href = framework?.hrefFramework;

        const divImageBox = document.createElement('div');
        divImageBox.classList.add('image-box');
        ancla.appendChild(divImageBox);

        const imgLogoFramework = document.createElement('img');
        imgLogoFramework.src = framework?.imgSrcFramework ?? "src/pages-cap/react-lading-page.png";
        imgLogoFramework.alt = framework?.nameFramework || "";
        divImageBox.appendChild(imgLogoFramework);

        const spanName = document.createElement('span');
        spanName.textContent = framework?.nameFramework || "";
        ancla.appendChild(spanName);

        fragment.appendChild(ancla);
    }

    return fragment;
}

function createAnclaBlank(href, hidden = true) {
    let ancla = document.createElement('a');
    ancla.href = href;
    ancla.target = '_blank';
    ancla.hidden = hidden;

    return ancla
}

function createProjectStructure({ title, href, imgSrc, altImage, details, linkRepository, frameworks }) {

    let divProject = document.createElement('div');
    divProject.classList.add('project');
    divProject.classList.add('blank-button');

    // let anclaFirst = document.createElement('a');
    // anclaFirst.href = href;
    // anclaFirst.target = '_blank';
    // anclaFirst.hidden = true;
    divProject.appendChild(createAnclaBlank(href, true));

    let divContext = document.createElement('div');
    divProject.appendChild(divContext);
    divContext.classList.add('context');

    let divImgContainer = document.createElement('div');
    divImgContainer.classList.add('img-container');
    divContext.appendChild(divImgContainer);

    let divInfo = document.createElement('div');
    divContext.appendChild(divInfo);
    divInfo.classList.add('info');
    divInfo.classList.add('blank-button');

    // let anclaImg = document.createElement('a');
    // anclaImg.href = href;
    // anclaImg.target = '_blank';
    let anclaImg = createAnclaBlank(href, false);
    anclaImg.classList.add('link');
    divImgContainer.appendChild(anclaImg);

    let imgProject = document.createElement('img');
    anclaImg.appendChild(imgProject);
    imgProject.src = imgSrc;
    imgProject.alt = altImage;


    // let anclaSecond = document.createElement('a');
    // anclaSecond.href = href;
    // anclaSecond.target = '_blank';
    // anclaSecond.hidden = true;
    divInfo.appendChild(createAnclaBlank(href, true));


    let divContentTitleParagraph = document.createElement('div');
    divContentTitleParagraph.classList.add("content-title-p");
    divInfo.appendChild(divContentTitleParagraph);


    let divContainerTitleCode = document.createElement('div');
    divContentTitleParagraph.appendChild(divContainerTitleCode);
    divContainerTitleCode.classList.add('container-title-code');

    let h2ProjectTitle = document.createElement('h2');
    divContainerTitleCode.appendChild(h2ProjectTitle);
    h2ProjectTitle.classList.add("project-title");
    h2ProjectTitle.innerHTML = title;

    if (linkRepository != "") {

        let anclaCode = createAnclaBlank(linkRepository, false);
        anclaCode.classList.add('ancla-code');
        divContainerTitleCode.appendChild(anclaCode);
        let spanCode = document.createElement('span');
        spanCode.innerHTML = 'Code'
        anclaCode.appendChild(spanCode);

        let iCode = document.createElement('i');
        iCode.classList.add("fa-solid");
        iCode.classList.add("fa-link");
        anclaCode.appendChild(iCode);
    }

    let pContentDetail = document.createElement('p');
    divContentTitleParagraph.appendChild(pContentDetail);
    pContentDetail.classList.add('detail-text');
    pContentDetail.innerHTML = details;

    let divDevelopmentWith = document.createElement('div');
    divInfo.appendChild(divDevelopmentWith);
    divDevelopmentWith.classList.add('desarrollo-with');

    let anclasFragmentos = createDevelopmentStructure(frameworks);
    divDevelopmentWith.appendChild(anclasFragmentos);

    return divProject;
}

async function fetchProject() {
    const allProjects = document.querySelector('.all-projects');
    const response = await fetch('./projects.json');
    // fetch('./projects.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     });

    const data = await response.json();
    const projects = data.projects;
    console.log(projects);

    for (const project of projects) {
        const projectCard = createProjectStructure(project);
        allProjects.appendChild(projectCard)
        console.log(project.title);
        console.log(project);
    }

    // console.log(data.projects[0]);
}

document.addEventListener("DOMContentLoaded", function () {

    // if (window.scrollY > 120 && window.innerWidth > 700) {
    //     img.classList.add('small');
    //     img.classList.remove('img-photo');
    //     aboutme.style.marginTop = "330px"

    // }

    fetchProject();



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