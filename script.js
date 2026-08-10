const itemsContainer = document.getElementById("items");
const addButton = document.getElementById("addButton");
const totalElement = document.getElementById("total");

// 項目を追加
function addItem() {
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
    const amount = item.querySelector(".item-amount");
    const deleteButton = item.querySelector(".delete-button");

    checkbox.addEventListener("change", calculateTotal);
    amount.addEventListener("input", calculateTotal);

    deleteButton.addEventListener("click", function () {
        item.remove();
        calculateTotal();
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
addButton.addEventListener("click", addItem);

// 最初の項目を1つ表示
addItem();