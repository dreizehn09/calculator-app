const itemsContainer = document.getElementById("items");
const addButton = document.getElementById("addButton");
const totalElement = document.getElementById("total");

const selectAllButton = document.getElementById("selectAllButton");
const deselectAllButton = document.getElementById("deselectAllButton");

const STORAGE_KEY = "calculatorItems";

// 項目を保存
function saveItems() {
  const items = document.querySelectorAll(".item");

  const data = [];

  items.forEach(function (item) {
    const checkbox = item.querySelector(".item-checkbox");
    const name = item.querySelector(".item-name");
    const amount = item.querySelector(".item-amount");

    data.push({
      name: name.value,
      amount: amount.value,
      checked: checkbox.checked
    });
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 項目を追加
function addItem(itemData = null) {
  const item = document.createElement("div");
  item.className = "item";

  item.innerHTML = `
    <input type="checkbox" class="item-checkbox" checked>

    <input
      type="text"
      class="item-name"
      placeholder="項目名"
    >

    <input
      type="number"
      class="item-amount"
      placeholder="金額"
      min="0"
      value="0"
    >

    <button class="delete-button">削除</button>
  `;

  const checkbox = item.querySelector(".item-checkbox");
  const name = item.querySelector(".item-name");
  const amount = item.querySelector(".item-amount");
  const deleteButton = item.querySelector(".delete-button");

  // 保存されているデータを反映
  if (itemData) {
    name.value = itemData.name || "";
    amount.value = itemData.amount ?? "0";
    checkbox.checked = itemData.checked ?? true;
  }

  // チェック状態が変わったら保存
  checkbox.addEventListener("change", function () {
    calculateTotal();
    saveItems();
  });

  // 項目名を変更したら保存
  name.addEventListener("input", function () {
    saveItems();
  });

  // 金額を変更したら保存
  amount.addEventListener("input", function () {
    calculateTotal();
    saveItems();
  });

  // 削除
  deleteButton.addEventListener("click", function () {
    item.remove();
    calculateTotal();
    saveItems();
  });

  itemsContainer.appendChild(item);

  calculateTotal();
}

// 合計金額を計算
function calculateTotal() {
  let total = 0;

  const items = document.querySelectorAll(".item");

  items.forEach(function (item) {
    const checkbox = item.querySelector(".item-checkbox");
    const amount = item.querySelector(".item-amount");

    if (checkbox.checked) {
      total += Number(amount.value) || 0;
    }
  });

  totalElement.textContent = "¥" + total.toLocaleString("ja-JP");
}

// ＋ボタンを押したとき
addButton.addEventListener("click", function () {
  addItem();
  saveItems();
});

// 全選択
selectAllButton.addEventListener("click", function () {
  const checkboxes = document.querySelectorAll(".item-checkbox");

  checkboxes.forEach(function (checkbox) {
    checkbox.checked = true;
  });

  calculateTotal();
  saveItems();
});

// 全解除
deselectAllButton.addEventListener("click", function () {
  const checkboxes = document.querySelectorAll(".item-checkbox");

  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });

  calculateTotal();
  saveItems();
});

// 保存データを読み込む
function loadItems() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  // 保存データがある場合
  if (savedData !== null) {
    try {
      const items = JSON.parse(savedData);

      items.forEach(function (itemData) {
        addItem(itemData);
      });

      calculateTotal();
      return;
    } catch (error) {
      console.error("保存データの読み込みに失敗しました:", error);
    }
  }

  // 初回だけ空の項目を1つ表示
  addItem();
}

// アプリ起動時に保存データを読み込む
loadItems();
