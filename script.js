function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "grid";
    evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".tab button").click();
});


document.addEventListener("DOMContentLoaded", function() {
    const spritesContainer = document.getElementById("Sprites");

    fetch("https://getsprites.online/tempdb/sprites.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(sprite => {
                const containerDiv = document.createElement("div");
                containerDiv.className = "container";

                const img = document.createElement("img");
                img.src = sprite.Thumbnail || "img/placeholder.png";
                img.alt = "sprite-img";
                containerDiv.appendChild(img);

                const title = document.createElement("h3");
                title.textContent = sprite.Name;
                containerDiv.appendChild(title);

                const author = document.createElement("p");
                author.textContent = `by ${sprite.Author}`;
                containerDiv.appendChild(author);

                const desc = document.createElement("p");
                desc.className = "desc";
                desc.textContent = sprite.Desc;
                containerDiv.appendChild(desc);

                const button = document.createElement("button");
                button.textContent = "Download";
                button.onclick = function() {
                    window.location.href = sprite.Download;
                };
                containerDiv.appendChild(button);

                if (sprite.Verified) {
                    const verifiedDiv = document.createElement("div");
                    verifiedDiv.className = "verified";
                    const verifiedSpan = document.createElement("span");
                    verifiedSpan.textContent = "✔ Verified";
                    verifiedDiv.appendChild(verifiedSpan);
                    containerDiv.appendChild(verifiedDiv);
                }

                // Append the container div to the sprites container
                spritesContainer.appendChild(containerDiv);
            });
        })
        .catch(error => console.error("Error fetching sprites data:", error));
});
