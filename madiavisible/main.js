// チェックボックスを作成
var checkboxElement = document.createElement('input');
checkboxElement.setAttribute('type', 'checkbox');
checkboxElement.setAttribute('id', 'twitgram-toggle');
checkboxElement.setAttribute('class', 'twitgram-checkbox');

// チェックボックスのラベルを作成
var labelElement = document.createElement('label');
labelElement.setAttribute('for', 'twitgram-toggle');
labelElement.textContent = '写真のみ';
labelElement.setAttribute('class', 'twitgram-label');

// チェックボックスとラベルをページに追加
document.body.prepend(checkboxElement);
document.body.prepend(labelElement);

// 有効な画像をカウントする関数
function countValidImages(article) {
    const imgTags = article.querySelectorAll('img');
    let count = 0;
    imgTags.forEach(img => {
        const src = img.getAttribute('src') || '';
        // `https://pbs.twimg.com/media` で始まり、SVG で終わらないかチェック
        if (src.startsWith('https://pbs.twimg.com/media') && !src.endsWith('.svg')) {
            count++;
        }
    });
    return count;
}

// 無効な画像とテキストを非表示にする関数
function hideInvalidContent(article) {
    const imgTags = article.querySelectorAll('img');
    imgTags.forEach(img => {
        const src = img.getAttribute('src') || '';
        // `https://pbs.twimg.com/media` で始まる画像以外を非表示にする
        if (!src.startsWith('https://pbs.twimg.com/media') || src.endsWith('.svg')) {
            img.style.display = 'none';
        }
    });

    // `<article>` 内のテキストを非表示にする
    const textNodes = article.childNodes;
    textNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.parentNode.style.display = 'none';
        }
    });

    // チェックボックスがオンの場合、`<span>` タグを非表示にする
    if (checkboxElement.checked) {
        const spanTags = article.querySelectorAll('span');
        spanTags.forEach(span => {
            span.style.display = 'none';
        });
    }
}

// 動的に追加される article 要素を監視
let articles = [];
const observer = new MutationObserver(() => {
    // 監視する度に最新の article 要素を取得
    articles = document.querySelectorAll('article');
    updateArticlesDisplay(); // 初期表示を更新
});

// チェックボックスの状態に応じて記事の表示/非表示を更新する関数
function updateArticlesDisplay() {
    const isChecked = checkboxElement.checked;

    articles.forEach((article, index) => {
        const validImgCount = countValidImages(article);

        if (isChecked) {
            // チェックボックスがオンの場合、1個以上の有効な画像を含む記事のみ表示
            if (validImgCount > 0) {
                article.style.display = ''; // 表示にする
                hideInvalidContent(article); // 無効な画像とテキストを非表示にする
            } else {
                article.style.display = 'none'; // 非表示にする
            }
        } else {
            // チェックボックスがオフの場合、すべての記事を表示
            article.style.display = ''; // 表示にする
            hideInvalidContent(article); // 無効な画像とテキストを非表示にする
        }
    });
}

// チェックボックスの変更イベントで記事の表示/非表示を更新
checkboxElement.addEventListener('change', updateArticlesDisplay);

// DOMの変更を監視する設定
observer.observe(document.body, {
    childList: true,  // 子要素の追加・削除を監視
    subtree: true     // すべての子孫ノードを監視
});

// ページ読み込み時に初期状態の article 要素も処理する
window.addEventListener('load', () => {
    articles = document.querySelectorAll('article');
    updateArticlesDisplay(); // 初期表示を更新
});
