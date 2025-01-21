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
