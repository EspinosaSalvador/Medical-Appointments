export function openNav() {
    event.preventDefault()
    document.getElementById("mySidebar").style.width = "60%";
}

export function closeNav() {
    event.preventDefault()
    document.getElementById("mySidebar").style.width = "0";
}