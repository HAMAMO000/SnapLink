const mainColor = '#141424';
const subColor = '#646474';
const accentColor = '#EEEEEE';
const notificationColor = "#4CAF50";
const motherDiv = document.createElement("div");
const sitesDiv = document.createElement("div");
const overlayDiv = document.createElement("div");
const addURLBtn = document.createElement("div");
const displayURLsBtn = document.createElement("div");
const memoBtn = document.createElement("div");
const hogeBtn = document.createElement("div");
const shadowRoot = sitesDiv.attachShadow({ mode: "open" });
let isDisplay = false;


Object.assign(motherDiv.style, {
    position: "fixed",
    right: "5vw",
    bottom: "5vh",
    height: "8vh",
    width: "8vh",
    zIndex: "100000",
    borderRadius: "4vh",
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

Object.assign(addURLBtn.style, {
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
addURLBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width=32" height=32" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>`;


Object.assign(displayURLsBtn.style, {
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
    justifyContent: "center",
    zIndex: "1000",
    borderRadius: "5vh",
    background: subColor,
    transition: "0.3s",
    cursor: "pointer",
    border: `1px solid ${accentColor}`,

});

Object.assign(memoBtn.style, {
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
    justifyContent: "center",
    zIndex: "1000",
    borderRadius: "5vh",
    background: subColor,
    transition: "0.3s",
    cursor: "pointer",
    border: `1px solid ${accentColor}`,

});

Object.assign(hogeBtn.style, {
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
    justifyContent: "center",
    zIndex: "10",
    borderRadius: "5vh",
    background: subColor,
    transition: "0.3s",
    cursor: "pointer",
    border: `1px solid ${accentColor}`,

});


const displayURLsBtnText = document.createElement("span");
displayURLsBtnText.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
<path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
</svg>`;
const memoBtnText = document.createElement("span");
memoBtnText.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-journal" viewBox="0 0 16 16">
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
</svg>`;

Object.assign(displayURLsBtnText.style, {
    fontSize: "1.2vw",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: accentColor,
    letterSpacing: "0.1vw",
    textAlign: "center",
    userSelect: "none"
});

Object.assign(memoBtnText.style, {
    fontSize: "1.2vw",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: accentColor,
    letterSpacing: "0.1vw",
    textAlign: "center",
    userSelect: "none"
});


displayURLsBtn.appendChild(displayURLsBtnText);
memoBtn.appendChild(memoBtnText);
document.body.prepend(overlayDiv);
document.body.prepend(sitesDiv);
document.body.prepend(motherDiv);
motherDiv.appendChild(addURLBtn);
motherDiv.appendChild(displayURLsBtn);
motherDiv.appendChild(memoBtn);
motherDiv.appendChild(hogeBtn);


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







function saveMemo(content) {
    chrome.storage.local.get("savedMemos", (result) => {
        const savedMemos = result.savedMemos || [];

        // 新しいメモオブジェクトを作成
        const newMemo = {
            content: content,
            timestamp: new Date().toISOString(),  // タイムスタンプを追加
        };

        // メモを保存
        savedMemos.push(newMemo);

        // chrome.storage.local に保存
        chrome.storage.local.set({ savedMemos: savedMemos }, () => {
            console.log("メモが保存されました!");
            showAddMemoForm();  // 保存後にメモを即反映
        });
    });
}

// メモを削除する関数
function deleteMemo(index) {
    chrome.storage.local.get("savedMemos", (data) => {
        const savedMemos = data.savedMemos || [];
        savedMemos.splice(index, 1);  // メモを削除

        chrome.storage.local.set({ savedMemos }, () => {
            showAddMemoForm(); // メモ削除後に再表示
        });
    });
}

// メモをコピーする関数
function copyMemo(content) {
    navigator.clipboard.writeText(content).then(() => {
        showNotification("メモがコピーされました!");
    });
}







function showAddMemoForm() {
    shadowRoot.innerHTML = "";

    const memoContainer = document.createElement("div");
    memoContainer.style.height = "30vh";
    memoContainer.style.overflowY = "auto";  // スクロール可能
    memoContainer.style.padding = "1vh";
    memoContainer.style.whiteSpace = "pre-line"; // 改行を適用

    // メモを表示
    chrome.storage.local.get("savedMemos", (result) => {
        const savedMemos = result.savedMemos || [];

        savedMemos.forEach((memo, index) => {
            const memoDiv = document.createElement("div");
            memoDiv.style.marginBottom = "1vh";
            memoDiv.style.padding = "0.5vw";
            memoDiv.style.borderRadius = "5px";
            memoDiv.style.color = accentColor;
            memoDiv.style.display = "flex"; // 横並びにするためにflexを使用

            // メモ内容
            const memoContent = document.createElement("div");
            memoContent.textContent = memo.content;
            memoContent.style.width = "80%";
            memoContent.style.fontSize = "20px";
            memoContent.style.fontWeight = "bold";
            memoContent.style.color = "#3498db";
            memoDiv.appendChild(memoContent);


            // コピーボタン
            const copyBtn = document.createElement("button");
            copyBtn.textContent = "コピー";
            copyBtn.style.width = "6vw";  // 定型サイズ
            copyBtn.style.height = "5vh"; // 定型サイズ
            copyBtn.style.marginLeft = "1vw";
            copyBtn.style.cursor = "pointer";
            copyBtn.style.background = "#3498db";
            copyBtn.style.border = "none";
            copyBtn.style.color = "#fff";
            copyBtn.style.borderRadius = "5px";
            copyBtn.addEventListener("click", () => copyMemo(memo.content));

            // 削除ボタン
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "削除";
            deleteBtn.style.width = "6vw";  // 定型サイズ
            deleteBtn.style.height = "5vh"; // 定型サイズ
            deleteBtn.style.marginLeft = "1vw";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.background = "#e74c3c";
            deleteBtn.style.border = "none";
            deleteBtn.style.color = "#fff";
            deleteBtn.style.borderRadius = "5px";
            deleteBtn.addEventListener("click", () => deleteMemo(index));


            // ボタンを横並びに追加
            memoDiv.appendChild(copyBtn);
            memoDiv.appendChild(deleteBtn);
            memoContainer.appendChild(memoDiv);
        });
    });

    // テキストエリアと保存ボタンのコンテナ (8vh)
    const textAreaContainer = document.createElement("div");
    textAreaContainer.style.display = "flex";  // 横並びにするためにflexを使用
    textAreaContainer.style.marginTop = "1vh"; // 少しの余白

    const contentInput = document.createElement("textarea");
    contentInput.placeholder = "メモ内容を入力...";
    contentInput.style.width = "80%";  // 80%の幅を確保
    contentInput.style.height = "9vh";  // 高さを親要素に合わせる
    contentInput.style.fontSize = "1em";
    contentInput.style.resize = "none";  // ユーザーによるサイズ変更を防止

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "保存";
    saveBtn.style.width = "18%";  // 余白を含めた定型サイズ
    saveBtn.style.height = "10vh";
    saveBtn.style.background = subColor;
    saveBtn.style.color = accentColor;
    saveBtn.style.border = "none";
    saveBtn.style.borderRadius = "5px";
    saveBtn.style.cursor = "pointer";

    saveBtn.addEventListener("click", () => {
        const content = contentInput.value;
        if (content) {
            saveMemo(content);  // メモを保存
            contentInput.value = "";  // 入力フィールドをクリア
        } else {
            alert("メモ内容を入力してください");
        }
    });

    textAreaContainer.appendChild(contentInput);
    textAreaContainer.appendChild(saveBtn);

    // メモの表示コンテナとテキストエリアを組み合わせて表示
    const siteDiv = document.createElement("div");
    siteDiv.style.marginTop = "2vh";
    siteDiv.style.padding = "1vw";
    siteDiv.style.borderRadius = "5px";
    siteDiv.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
    siteDiv.style.display = "block";

    siteDiv.appendChild(memoContainer);
    siteDiv.appendChild(textAreaContainer);

    shadowRoot.appendChild(siteDiv);

    // テキストエリアにフォーカス
    contentInput.focus();
}









function showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.right = "5vw";
    notification.style.bottom = "20vh";
    notification.style.backgroundColor = "#1abc9c";
    notification.style.color = "#FFF";
    notification.style.padding = "1vw";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "99999";

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 1000);
}







motherDiv.addEventListener("mouseover", () => {
    addURLBtn.style.background = subColor;
    displayURLsBtn.style.right = `calc(5vw + 8vh)`; // 必要に応じて計算式を変更できます
    memoBtn.style.bottom = `calc(5vh + 8vh)`; // 必要に応じて計算式を変更できます
    hogeBtn.style.right = `calc(5vw + 8vh)`; // 必要に応じて計算式を変更できます
    hogeBtn.style.bottom = `calc(5vh + 8vh)`; // 必要に応じて計算式を変更できます
    motherDiv.style.width = "16vh";
    motherDiv.style.height = "16vh";
});

motherDiv.addEventListener("mouseout", () => {
    addURLBtn.style.background = mainColor;
    displayURLsBtn.style.right = "5vw";
    memoBtn.style.bottom = "5vh"; // 必要に応じて計算式を変更できます
    hogeBtn.style.right = "5vw"; // 必要に応じて計算式を変更できます
    hogeBtn.style.bottom = "5vh"; // 必要に応じて計算式を変更できます
    motherDiv.style.width = "8vh";
    motherDiv.style.height = "8vh";
});


addURLBtn.addEventListener("click", saveSite);


function toggleDisplay() {
    isDisplay = !isDisplay;
    sitesDiv.style.display = isDisplay ? "block" : "none";
    overlayDiv.style.display = isDisplay ? "block" : "none";
}


displayURLsBtn.addEventListener("click", () => {
    toggleDisplay();
    setURLs();
});
memoBtn.addEventListener("click", () => {
    toggleDisplay();
    showAddMemoForm();
});

overlayDiv.addEventListener("click", () => {
    toggleDisplay();
});




document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        sitesDiv.style.display = "none";
        overlayDiv.style.display = "none";
    }
});



// ----------------------------------フルスクリーンなら非表示する処理





// フルスクリーンの状態を確認する関数
function isFullScreen() {
    return document.fullscreenElement !== null ||  // 現在フルスクリーン中か
        document.webkitFullscreenElement !== null ||  // Safari用
        document.mozFullScreenElement !== null ||  // Firefox用
        document.msFullscreenElement !== null;  // IE/Edge用
}


function toggleMotherDivVisibility() {
    if (isFullScreen()) {
        motherDiv.style.display = "none"; // フルスクリーンなら非表示
    } else {
        motherDiv.style.display = "block"; // フルスクリーンでない場合は表示
    }
}



document.addEventListener("fullscreenchange", toggleMotherDivVisibility);
document.addEventListener("webkitfullscreenchange", toggleMotherDivVisibility); // Safari用
document.addEventListener("mozfullscreenchange", toggleMotherDivVisibility); // Firefox用
document.addEventListener("MSFullscreenChange", toggleMotherDivVisibility); // IE/Edge用
