window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        enableDarkMode();
    } else {
        enableLightMode();
    }

    setTimeout(() => {
        document.body.classList.remove("preload");
    }, 300)

    getQuote();

    attachObserver();
})


function enableLightMode() {
    document.body.classList.remove("dark");
    document.querySelector("#role p").innerHTML = "I am a Frontend Developer."
    localStorage.setItem("theme", "light");
}

function enableDarkMode() {
    document.body.classList.add("dark");
    document.querySelector("#role p").innerHTML = "I am a UI/UX Designer.";
    localStorage.setItem("theme", "dark");
}


async function getQuote() {
    let request = await fetch("https://api.quotable.io/random?minLength=100");
    let response = await request.json();
    document.querySelector(".quote blockquote").innerHTML = response.content;
    document.querySelector(".author span").innerHTML = response.author;
}



const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
        }
    })
}, observerOptions)


function attachObserver() {
    const elements = document.querySelectorAll(".fadeup");
    elements.forEach((element) => {
        observer.observe(element);
    })
}