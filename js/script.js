document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".intro").style.animation = "fadeOut 1s ease-in-out forwards";
        setTimeout(() => {
            document.querySelector(".intro").style.display = "none";
            document.querySelector(".content").style.display = "block";
        }, 1000);
    }, 4000);  // Longer, dramatic animation
});
