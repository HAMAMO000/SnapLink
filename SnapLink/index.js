const mainColor = '#141424';
const subColor = '#646474';
const accentColor = '#EEEEEE';
const notificationColor = "#4CAF50";
const motherDiv = document.createElement("div");
const sitesDiv = document.createElement("div");
const overlayDiv = document.createElement("div");
const mainBtn = document.createElement("div");
const openBtn = document.createElement("div");
let isDisplay = false;
const shadowRoot = sitesDiv.attachShadow({ mode: "open" });


Object.assign(motherDiv.style, {
    position: "fixed",
    right: "5vw",
    bottom: "5vh",
    height: "8vh",
    width: "8vh",
    zIndex: "100000",
    borderRadius: "50%"
});
Object.assign(overlayDiv.style, {
    position: "fixed",
    left: "0",
    top: "0",
    height: "100vh",
    width: "100vw",
    zIndex: "10000",
    opacity: "0.5",
    backgroundColor: "black",
    display: "none"
});

Object.assign(sitesDiv.style, {
    position: "fixed",
    right: "25vw",
    bottom: "25vh",
    height: "50vh",
    width: "50vw",
    zIndex: "100000",
    borderRadius: "8px",
    background: mainColor,
    display: "none",
    overflow: "auto",
    padding: "1vw"
});

Object.assign(mainBtn.style, {
    position: "fixed",
    right: "5vw",
    bottom: "5vh",
    height: "8vh",
    width: "8vh",
    zIndex: "10000",
    borderRadius: "50%",
    border: `1px solid ${accentColor}`,
    background: mainColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "5vh",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    cursor: "pointer"
});
mainBtn.textContent = "＋";


Object.assign(openBtn.style, {
    display: "flex",
    fontSize: "16px",
    textAlign: "left",
    alignItems: "center",
    color: accentColor,
    position: "fixed",
    right: "5vw",
    bottom: "5vh",
    height: "8vh",
    width: "8vh",

    zIndex: "1000",
    borderRadius: "5vh",
    background: subColor,
    transition: "0.3s",
    cursor: "pointer"
});


const openBtnText = document.createElement("span");
openBtnText.innerText = "一覧";


Object.assign(openBtnText.style, {
    fontSize: "1.2vw",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: accentColor,
    letterSpacing: "0.1vw",
    textAlign: "center",
    userSelect: "none"
});


openBtn.appendChild(openBtnText);


document.body.prepend(openBtn);
document.body.prepend(overlayDiv);


document.body.prepend(sitesDiv);
document.body.prepend(motherDiv);
motherDiv.appendChild(mainBtn);
motherDiv.appendChild(openBtn);


const style = document.createElement("style");
style.textContent = `
    div {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    a {
        color: ${accentColor};
        text-decoration: none;
        font-size: 1rem;
    }
    button {
        background: ${mainColor};
        border: none;
        padding: 0.5vw 1vw;
        cursor: pointer;
        color: ${accentColor};
    }
    button:hover {
        background: ${subColor};
    }
`;
shadowRoot.appendChild(style);


function saveSite() {
    const title = document.title;
    const url = location.href;

    chrome.storage.local.get("savedSites", (result) => {
        let savedSites = result.savedSites || [];


        if (savedSites.some(site => site.url === url)) {
            showNotification("このサイトは既に保存されています！");
            return;
        }

        savedSites.push({ title, url });

        chrome.storage.local.set({ savedSites }, () => {
            showNotification(`サイトが保存されました!(${(location.href).split("/")[2]})`

            );
            console.log("保存成功:", title, url);
        });
    });
}


function setURLs() {
    shadowRoot.innerHTML = "";
    chrome.storage.local.get("savedSites", (result) => {
        const savedSites = result.savedSites || [];

        if (savedSites.length === 0) {
            const noDataText = document.createElement("div");
            noDataText.textContent = "保存されたデータはありません。";
            shadowRoot.appendChild(noDataText);
            return;
        }


        savedSites.forEach((site, index) => {
            const siteDiv = document.createElement("div");
            const siteLink = document.createElement("a");


            siteLink.href = site.url;
            siteLink.textContent = `${site.title}`;
            siteLink.target = "_blank";


            const linkDiv = document.createElement("div");
            linkDiv.style.width = "100%";
            linkDiv.style.height = "40px";
            linkDiv.style.display = "flex";
            linkDiv.style.alignItems = "center";
            linkDiv.style.padding = "1vh";
            linkDiv.style.overflow = "hidden"

            linkDiv.style.transition = "background-color 0.3s";
            linkDiv.style.backgroundColor = mainColor;


            siteLink.style.textDecoration = "none";
            siteLink.style.color = "#3498db";
            siteLink.style.fontSize = "20px";
            siteLink.style.fontWeight = "bold";

            linkDiv.addEventListener("mouseenter", () => {
                siteLink.style.color = "#1abc9c";
                linkDiv.style.backgroundColor = subColor;
            });

            linkDiv.addEventListener("mouseleave", () => {
                siteLink.style.color = "#3498db";
                linkDiv.style.backgroundColor = mainColor;
            });


            linkDiv.appendChild(siteLink);


            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "削除";
            deleteBtn.addEventListener("click", () => {
                deleteSite(site.url);
                siteDiv.remove();
            });


            siteDiv.appendChild(linkDiv);
            siteDiv.appendChild(deleteBtn);


            shadowRoot.appendChild(siteDiv);


            siteDiv.style.display = "flex";
            siteDiv.style.alignItems = "center";
            siteDiv.style.justifyContent = "space-between";
            siteDiv.style.marginBottom = "1vh";
            siteDiv.style.whiteSpace = "nowrap";
            siteDiv.style.overflow = "hidden";
            siteDiv.style.textOverflow = "ellipsis";


            deleteBtn.style.marginLeft = "1vw";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.background = subColor;
            deleteBtn.style.border = "none";
            deleteBtn.style.padding = "0.5vw 1vw";
            deleteBtn.style.color = "#fff";
            deleteBtn.style.borderRadius = "5px";
        });





    });
}


function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.right = "5vw";
    notification.style.bottom = "20vh";
    notification.style.backgroundColor = notificationColor;
    notification.style.color = "#FFF";
    notification.style.padding = "1vw";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "99999";

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 1000);
}


function deleteSite(url) {
    chrome.storage.local.get("savedSites", (result) => {
        let savedSites = result.savedSites || [];
        savedSites = savedSites.filter(site => site.url !== url);

        chrome.storage.local.set({ savedSites }, () => {
            console.log("削除しました:", url);
            showNotification("サイトが削除されました！");
        });
    });
}


motherDiv.addEventListener("mouseover", () => {
    mainBtn.style.background = subColor;
    openBtn.style.width = "20vh";
});

motherDiv.addEventListener("mouseout", () => {
    mainBtn.style.background = mainColor;
    openBtn.style.width = "8vh";
});


mainBtn.addEventListener("click", saveSite);


function toggleDisplay() {
    isDisplay = !isDisplay;
    sitesDiv.style.display = isDisplay ? "block" : "none";
    overlayDiv.style.display = isDisplay ? "block" : "none";
}


openBtn.addEventListener("click", () => {
    toggleDisplay();
    setURLs();
});

overlayDiv.addEventListener("click", () => {
    toggleDisplay();
});
