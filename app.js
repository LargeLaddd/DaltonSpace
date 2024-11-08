// Drag-and-drop handlers for the drop zone
function dragOverHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
}

function dropHandler(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const element = document.createElement(file.type.startsWith("image/") ? "img" : "video");
                element.src = e.target.result;
                element.classList.add("media-item");
                if (file.type.startsWith("video/")) {
                    element.controls = true; // Enable video controls
                }
                document.getElementById("dropZone").appendChild(element);
            };
            reader.readAsDataURL(file);
        }
    }
}

// Save scrapbook content as JSON (can be stored in local storage or sent to a backend)
document.getElementById("saveButton").addEventListener("click", function() {
    const textContent = document.getElementById("textEditor").value;
    const images = [...document.querySelectorAll("#dropZone img")].map(img => img.src);
    const videos = [...document.querySelectorAll("#dropZone video")].map(video => video.src);
    
    const scrapbook = {
        textContent,
        images,
        videos
    };

    // Example: Save to local storage (temporary)
    localStorage.setItem("scrapbook", JSON.stringify(scrapbook));
    alert("Scrapbook saved!");
});
