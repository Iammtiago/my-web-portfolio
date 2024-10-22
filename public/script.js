toastr.options = {
    closeButton: true, //Agrega un botón de cierre a la notificación.
    progressBar: true, //Muestra una barra de progreso para indicar el tiempo restante de la notificación.
    positionClass: 'toast-bottom-left', //Define la posición de la notificación en la pantalla.
    showDuration: '200', //Duración del efecto de entrada en milisegundos.
    hideDuration: '500', //Duración del efecto de salida en milisegundos.
    timeOut: '3600', //Tiempo que la notificación se muestra antes de desaparecer.
    extendedTimeOut: '1500', //Tiempo que la notificación permanece visible al pasar el mouse sobre ella.
    showEasing: 'swing', //Valores: 'swing', 'linear'
    hideEasing: 'linear', //Valores: 'swing', 'linear'
    showMethod: 'fadeIn', //Valores: 'fadeIn', 'slideDown'
    hideMethod: 'slideUp', //Valores: 'fadeOut', 'slideUp'
    preventDuplicates: true
};

function scrollToElement(e) {
    e.preventDefault();
    const element = document.querySelector(e.target.hash);

    const offset = (window.innerWidth >= 700) ? 97 : 35;
    let posicionY = Math.round(Number(element?.getBoundingClientRect().top + window.scrollY - offset));
    
    window.scrollTo({
        top: posicionY,
        behavior: 'smooth'
    });       
}

function windowOpenBlank(elements) {
    elements.forEach(element => {
        element.addEventListener('click', function (e) {
            e.stopImmediatePropagation();

            const projectDataLink = e.currentTarget.getAttribute("data-link");
            if (e.target.classList.contains("link") || e.target.parentNode.classList.contains("link")) return;
            else window.open(projectDataLink);
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
        divImageBox.classList.add('image-box', "link");
        ancla.appendChild(divImageBox);

        const imgLogoFramework = document.createElement('img');
        imgLogoFramework.src = framework?.imgSrcFramework ?? "./../src/assets/images/pages-cap/domoluz.png";
        imgLogoFramework.alt = framework?.nameFramework || "";
        divImageBox.appendChild(imgLogoFramework);

        const spanName = document.createElement('span');
        spanName.textContent = framework?.nameFramework || "";
        ancla.appendChild(spanName);

        fragment.appendChild(ancla);
    }

    return fragment;
}

function createAnclaBlank(title, href, hidden = true) {
    let ancla = document.createElement('a');
    ancla.href = href;
    ancla.target = '_blank';
    ancla.hidden = hidden;
    ancla.title = title;

    return ancla
}

function createProjectStructure({ title, href, imgSrc, altImage, details, linkRepository, frameworks }) {
    let divProject = document.createElement('div');
    divProject.classList.add('project', 'blank-button');
    divProject.setAttribute("data-link", href);

    let divContext = document.createElement('div');
    divContext.classList.add('context');
    divProject.appendChild(divContext);

    let divImgContainer = document.createElement('div');
    divImgContainer.classList.add('img-container');
    divContext.appendChild(divImgContainer);

    let divInfo = document.createElement('div');
    divInfo.classList.add('info', 'blank-button');
    divContext.appendChild(divInfo);

    const subDivImg = document.createElement('div');
    divImgContainer.appendChild(subDivImg);

    let imgProject = document.createElement('img');
    imgProject.src = imgSrc;
    imgProject.alt = altImage;
    subDivImg.appendChild(imgProject);

    let divContentTitleParagraph = document.createElement('div');
    divContentTitleParagraph.classList.add("content-title-p");
    divInfo.appendChild(divContentTitleParagraph);

    let divContainerTitleCode = document.createElement('div');
    divContainerTitleCode.classList.add('container-title-code');
    divContentTitleParagraph.appendChild(divContainerTitleCode);

    let h2ProjectTitle = document.createElement('h2');
    h2ProjectTitle.classList.add("project-title");
    h2ProjectTitle.innerHTML = title;
    divContainerTitleCode.appendChild(h2ProjectTitle);

    if (linkRepository != "") {
        let anclaCode = createAnclaBlank(title, linkRepository, false);
        anclaCode.classList.add('ancla-code', 'link');
        divContainerTitleCode.appendChild(anclaCode);

        let spanCode = document.createElement('span');
        spanCode.innerHTML = 'Code'
        anclaCode.appendChild(spanCode);

        let iCode = document.createElement('i');
        iCode.classList.add("fa-solid", "fa-link");
        anclaCode.appendChild(iCode);
    }

    let pContentDetail = document.createElement('p');
    pContentDetail.classList.add('detail-text');
    pContentDetail.innerHTML = details;
    divContentTitleParagraph.appendChild(pContentDetail);

    let divDevelopmentWith = document.createElement('div');
    divDevelopmentWith.classList.add('desarrollo-with');
    divInfo.appendChild(divDevelopmentWith);

    divDevelopmentWith.appendChild(createDevelopmentStructure(frameworks));

    return divProject;
}

async function fetchProject() {
    const allProjects = document.querySelector('.all-projects');
    const response = await fetch('./projects_2.json');

    const data = await response.json();
    const projects = data.projects;
    console.log(projects);

    for (const project of projects) {
        const projectCard = createProjectStructure(project);
        allProjects.appendChild(projectCard)
        console.log(project.title);
    }

    const projectsAll = document.querySelectorAll('.project');
    windowOpenBlank(projectsAll);
}

function createSkillStructure({ name, imgSrc, altImg }) {
    let cardLi = document.createElement('li'); 
    let divImg = document.createElement('div')
    let imgContainer = document.createElement('img');
    let span = document.createElement('span');

    divImg.appendChild(imgContainer);
    cardLi.appendChild(divImg);
    cardLi.appendChild(span);

    imgContainer.src = imgSrc;
    imgContainer.alt = altImg;
    span.textContent = name;

    return cardLi;
}

async function fetchSkills() {
    const ulContainer = document.createElement('ul');

    const response = await fetch('./skills.json');
    const data = await response.json();
    
    // {
    //     "name": "MongoDB",
    //         "imgSrc": "./../src/assets/logos/svg/mongodb-logo.svg",
    //             "altImg": "MongoDB: Sistema de gestión de bases de datos relacionales de objetos"
    // },
    // {
    //     "name": "VueJS",
    //         "imgSrc": "./../src/assets/logos/svg/vue-js-logo.svg",
    //             "altImg": "Vue: Framework de JS"
    // },
    // {
    //     "name": "NuxtJS",
    //         "imgSrc": "./../src/assets/logos/svg/nuxt-js-logo.svg",
    //             "altImg": "Nuxt: libraria de JS basado Vue"
    // },

    // console.log(data.skills);

    const skills = data.skills;
    for (const skill of skills) {

        let res = createSkillStructure(skill);
        ulContainer.appendChild(res);

    }

    divSkills.appendChild(ulContainer)

}

document.querySelector('.form-contact').addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    let name = document.getElementById('contact-name');
    let mail = document.getElementById('contact-mail');
    let message = document.getElementById('contact-message');

    if (
        name.value &&
        mail.value.includes("@") && mail.value &&
        message.value
    ) {

        fetch('/api/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name.value, mail: mail.value, message: message.value })
        })
            .then(response => response.json())
            .then(data => {
                console.log('data:', data);
                name.value = "";
                mail.value = "";
                message.value = "";

                // notie.alert({
                //     type: "success", // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
                //     text: "Correo enviado",
                //     time: 3, // optional, default = 3, minimum = 1,
                //     position: 'bottom' // optional, default = 'top', enum: ['top', 'bottom']
                // })

                toastr.success('Correo enviado con exito!');

            })
            .catch((error) => {
                console.error('Error:', error);
                // notie.alert({ type: 'error', text: 'Algo salió mal al enviar el correo.', time: 3, position: 'bottom' });
                toastr.error('Algo salió mal al enviar el correo.');

            });

    } else {
        // toastr.error('Ingrese los datos completos en el formulario.');
        toastr.warning('Por favor, Complete todos los campos del formulario.');
    }
    
});

document.addEventListener("DOMContentLoaded", function () {

    fetchProject();
    fetchSkills();

});

document.addEventListener('scroll', function (e) {
    const header = document.querySelector('.header-nav');
    // border-bottom: 0.6px solid #f9f9ff27;
    if (window.scrollY > 0) header.style.borderBottom = "0.7px solid #f9f9ff36";
    else header.style.borderBottom = "1px solid #f9f9ff00"
});

function removeActive() {
    navbar.classList.remove("active");
    ixmark.style.display = "none";
    imenu.style.display = "inline-block";
    document.body.style.overflow = '';
    document.body.style.touchAction = "auto"
}

document.body.addEventListener('click', function (event) {
    const container = document.querySelector('.menu');
    const anclas = document.querySelectorAll('a.link');

    anclas.forEach(a => {
        if (a.contains(event.target)) {
            removeActive();
        }
    })

    if (!container.contains(event.target)) {
        removeActive();
    }
});

document.querySelectorAll('.ancla').forEach(element => {
    element.addEventListener('click', scrollToElement);
})

// const divButtonAll = document.querySelectorAll('.blank-button');
// windowOpenBlank(divButtonAll);

const aboutme = document.getElementById('sobremi');
const header = document.querySelector('.header-nav');
const photo = document.getElementById('photo');

const divSkills = document.querySelector('div.skills');

const navbar = document.querySelector('nav#navbar-desktop');
const ixmark = document.getElementById('i-xmark');
ixmark.hidden = true;
const imenu = document.getElementById('i-menu');

document.getElementById("icon-menu").addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    navbar.classList.toggle("active");
    (navbar.classList.contains("active")) ? (
        ixmark.style.display = "inline-block", imenu.style.display = "none",
        document.body.style.overflow = 'hidden', document.body.style.touchAction = "none"
    ) : (ixmark.style.display = "none", imenu.style.display = "inline-block",
        document.body.style.overflow = '', document.body.style.touchAction = "auto"
    );
})

const cuboQr = document.querySelector('.contact');

document.getElementById('arrow').addEventListener('click', function (e) {
    e.preventDefault()

    cuboQr.classList.toggle("open");
});

document.getElementById('iconWpp').addEventListener('click', function (e) {
    e.preventDefault()
    cuboQr.classList.add("open");
});

function getCvUrl(path) {
    return `${window.location.origin}/api/download/cv/${path}`;
}

document.querySelectorAll('.cv').forEach(element => {
    element.addEventListener('click', function (e) {
        const language = e.currentTarget.getAttribute("data-language");
        window.open(getCvUrl(language), "_blank", "noopener,noreferrer");
        window.focus();
    });
});
