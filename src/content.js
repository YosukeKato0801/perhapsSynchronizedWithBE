/**
 * Merge Pull Requestボタンを監視する
 */
const mergeButtonClickHandler = (event) => {
  // カスタム属性をチェックして、既に処理されたクリックかどうかを確認
  if (event.target.dataset.customClickProcessed) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const isSelfReviewed = confirm(
      "🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\nBEと一緒にmergeしなくて大丈夫？\n一回確認しとく？"
  );

  if (isSelfReviewed) {
    // カスタム属性を設定して、このクリックが処理されたことを示す
    event.target.dataset.customClickProcessed = "true";
    // 元のクリックイベントをトリガー
    event.target.click();
    // カスタム属性をリセット
    setTimeout(() => {
      delete event.target.dataset.customClickProcessed;
    }, 0);
  }
};

const watchMergePullRequestButton = () => {
  const mergePullRequestButton = document.querySelector('.merge-box-button.hx_create-pr-button');

  if (mergePullRequestButton && document.querySelector('a[data-name=":bento: BEと同期かも？"]')) {
    // 既存のリスナーを削除
    mergePullRequestButton.removeEventListener("click", mergeButtonClickHandler);
    // 新しいリスナーを追加
    mergePullRequestButton.addEventListener("click", mergeButtonClickHandler);
  }
};



const observer = new MutationObserver(() => {
  watchMergePullRequestButton();
});
observer.observe(document.body, { childList: true, subtree: true });

watchMergePullRequestButton();