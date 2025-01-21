const mainColor = '#141424';
const subColor = '#646474';
const accentColor = '#EEEEEE';
const notificationColor = "#4CAF50"; // 通知色

const motherDiv = document.createElement("div");
const sitesDiv = document.createElement("div");
const overlayDiv = document.createElement("div");
const mainBtn = document.createElement("div");
const openBtn = document.createElement("div");
let isDisplay = false;

// Shadow DOMを利用するため、sitesDivの親要素にShadowRootを作成
const shadowRoot = sitesDiv.attachShadow({ mode: "open" });

// スタイル設定
Object.assign(motherDiv.style, {
    position: "fixed",
    right: "5vw",
    bottom: "5vh",
    height: "8vh",
    width: "8vh", // サイズ修正（8vhはボタンとして適切なサイズ）
    zIndex: "100000",
    borderRadius: "50%" // 丸いボタンにするため
});
Object.assign(overlayDiv.style, {
    position: "fixed",
    left: "0",
    top: "0",
    height: "100vh",
    width: "100vw", // サイズ修正（8vhはボタンとして適切なサイズ）
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
    display: "none", // 初期状態は非表示
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
    justifyContent: "center",  // 水平方向に中央揃え
    alignItems: "center",      // 垂直方向に中央揃え
    fontSize: "5vh",           // フォントサイズ調整
    color: "#fff",             // 文字色（白）
    fontWeight: "bold",        // 文字を太字
    textAlign: "center",        // テキストの位置を中央に設定
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
    // padding: "1vh",
    zIndex: "1000",
    borderRadius: "5vh",
    background: subColor,
    transition: "0.3s",
    cursor: "pointer"
});

// 'openBtn' のテキストを 'span' 要素にして、スタイルを統一
const openBtnText = document.createElement("span");
openBtnText.innerText = "一覧";

// 'openBtnText' にスタイル設定
Object.assign(openBtnText.style, {
    fontSize: "1.2vw",        // フォントサイズを設定
    fontWeight: "bold",       // フォントを太字に
    textTransform: "uppercase", // 大文字化
    color: accentColor,       // テキスト色を統一
    letterSpacing: "0.1vw",   // 文字間のスペースを設定
    textAlign: "center",      // 中央揃え
    userSelect: "none"        // テキスト選択不可
});

// テキスト要素をボタンに追加
openBtn.appendChild(openBtnText);

// ボタンをページに追加
document.body.prepend(openBtn);
document.body.prepend(overlayDiv);

// 要素をページに追加
document.body.prepend(sitesDiv);
document.body.prepend(motherDiv);
motherDiv.appendChild(mainBtn);
motherDiv.appendChild(openBtn);

// Shadow DOMにCSSをインラインで追加
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

// サイト保存処理
function saveSite() {
    const title = document.title;
    const url = location.href;

    chrome.storage.local.get("savedSites", (result) => {
        let savedSites = result.savedSites || [];

        // 重複チェック
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

// 保存されたサイトを表示
function setURLs() {
    shadowRoot.innerHTML = ""; // 既存の内容をクリア
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

            // aタグ自体がクリック可能な領域
            siteLink.href = site.url;
            siteLink.textContent = `${site.title}`;
            siteLink.target = "_blank";

            // リンク用のdivを作成して、決まった幅を設定
            const linkDiv = document.createElement("div");
            linkDiv.style.width = "100%";
            linkDiv.style.height = "40px";
            linkDiv.style.display = "flex";
            linkDiv.style.alignItems = "center";
            linkDiv.style.padding = "1vh";
            linkDiv.style.overflow = "hidden"
            // linkDiv.style.justifyContent = "center";
            linkDiv.style.transition = "background-color 0.3s";
            linkDiv.style.backgroundColor = mainColor;

            // aタグのスタイル設定
            siteLink.style.textDecoration = "none";
            siteLink.style.color = "#3498db";
            siteLink.style.fontSize = "20px";
            siteLink.style.fontWeight = "bold";

            linkDiv.addEventListener("mouseenter", () => {
                siteLink.style.color = "#1abc9c";  // ホバー時に色を変える
                linkDiv.style.backgroundColor = subColor;
            });

            linkDiv.addEventListener("mouseleave", () => {
                siteLink.style.color = "#3498db";  // 元に戻す
                linkDiv.style.backgroundColor = mainColor;
            });

            // siteLinkをlinkDivに追加
            linkDiv.appendChild(siteLink);

            // 削除ボタンの追加
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "削除";
            deleteBtn.addEventListener("click", () => {
                deleteSite(site.url);
                siteDiv.remove();
            });

            // 親のdivにリンクとボタンを追加
            siteDiv.appendChild(linkDiv);
            siteDiv.appendChild(deleteBtn);

            // shadowRootにサイト情報を追加
            shadowRoot.appendChild(siteDiv);

            // 見た目を整えるためのスタイル設定
            siteDiv.style.display = "flex";
            siteDiv.style.alignItems = "center";
            siteDiv.style.justifyContent = "space-between";
            siteDiv.style.marginBottom = "1vh";
            siteDiv.style.whiteSpace = "nowrap";
            siteDiv.style.overflow = "hidden";
            siteDiv.style.textOverflow = "ellipsis";

            // ボタンのスタイル設定
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

// 通知を表示
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
    }, 1000); // 2秒後に通知を消す
}

// サイト削除処理
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

// イベントリスナー設定
motherDiv.addEventListener("mouseover", () => {
    mainBtn.style.background = subColor;
    openBtn.style.width = "20vh";
});

motherDiv.addEventListener("mouseout", () => {
    mainBtn.style.background = mainColor;
    openBtn.style.width = "8vh";
});

// メインボタンのクリック処理
mainBtn.addEventListener("click", saveSite);

// 一覧表示エリアの表示・非表示を切り替える関数
function toggleDisplay() {
    isDisplay = !isDisplay;
    sitesDiv.style.display = isDisplay ? "block" : "none";
    overlayDiv.style.display = isDisplay ? "block" : "none";
}

// 開くボタンのクリック処理
openBtn.addEventListener("click", () => {
    toggleDisplay();
    setURLs();
});
// 開くボタンのクリック処理
overlayDiv.addEventListener("click", () => {
    toggleDisplay();
});
