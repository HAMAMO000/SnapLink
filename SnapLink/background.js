chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "saveSite") {
        chrome.storage.local.get("savedSites", (data) => {
            const savedSites = data.savedSites || [];

            // 重複チェック
            if (savedSites.some(site => site.url === message.url)) {
                sendResponse({ status: "duplicate" });
                return;
            }

            // 保存
            savedSites.push({ title: message.title, url: message.url });
            chrome.storage.local.set({ savedSites }, () => {
                sendResponse({ status: "success" });
            });
        });
        return true; // 非同期処理のため、true を返す
    }

    if (message.action === "getSites") {
        chrome.storage.local.get("savedSites", (data) => {
            sendResponse({ sites: data.savedSites || [] });
        });
        return true;
    }

    if (message.action === "deleteSite") {
        chrome.storage.local.get("savedSites", (data) => {
            const savedSites = data.savedSites || [];
            const filteredSites = savedSites.filter(site => site.url !== message.url);

            chrome.storage.local.set({ savedSites: filteredSites }, () => {
                sendResponse({ status: "deleted" });
            });
        });
        return true;
    }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // メモを保存する
    if (message.action === "saveMemo") {
        chrome.storage.local.get("savedMemos", (data) => {
            const savedMemos = data.savedMemos || [];

            // メモ内容が空の場合は保存しない
            if (!message.content || message.content.trim() === "") {
                sendResponse({ status: "empty" });
                return;
            }

            // 新しいメモを追加
            const newMemo = {
                content: message.content,
                timestamp: new Date().toISOString()  // タイムスタンプを追加
            };

            savedMemos.push(newMemo);

            // 保存処理
            chrome.storage.local.set({ savedMemos }, () => {
                sendResponse({ status: "success" });
            });
        });
        return true;  // 非同期処理のため、true を返す
    }

    // メモを取得する
    if (message.action === "getMemos") {
        chrome.storage.local.get("savedMemos", (data) => {
            sendResponse({ memos: data.savedMemos || [] });
        });
        return true;  // 非同期処理のため、true を返す
    }

    // メモを削除する
    if (message.action === "deleteMemo") {
        chrome.storage.local.get("savedMemos", (data) => {
            const savedMemos = data.savedMemos || [];
            const filteredMemos = savedMemos.filter((memo, index) => index !== message.index);

            chrome.storage.local.set({ savedMemos: filteredMemos }, () => {
                sendResponse({ status: "deleted" });
            });
        });
        return true;  // 非同期処理のため、true を返す
    }
});
