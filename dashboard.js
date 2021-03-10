const searchParams = new URLSearchParams(window.location.search);
const username = searchParams.get("username");
const cardContainer = document.getElementById("cards-container");
const userNameDisplay = document.getElementById("user-name-display");
userNameDisplay.textContent = `Welcome ${username}!`;
const itemCardContainer = document.getElementById("items-container");
const itemForm = document.getElementById("item-form");

fetch(` https://lendy-tracker.herokuapp.com/users/login/${username}`)
	.then((response) => response.json())
	.then((user) => {
		lends = user.lends;
		items = user.items;
		sortByDate(lends).forEach((lend) => {
			const card = document.createElement("div");
			card.className = "card";
			cardContainer.append(card);

			const titleRow = document.createElement("div");
			titleRow.className = "title-row";

			const itemName = document.createElement("h3");
			itemName.textContent = `Item: ${lend.item.name}`;

			const removeButton = document.createElement("button");
			removeButton.className = "remove-btn";
			removeButton.innerHTML = `&times;`;
			removeButton.addEventListener("click", () => {
				card.remove();
				fetch(`https://lendy-tracker.herokuapp.com/lends/${lend.id}`, {
					method: "DELETE",
				});
			});
			titleRow.append(itemName, removeButton);

			const borrower = document.createElement("h4");
			borrower.textContent = `You lent this to: ${lend.borrower.name}`;

			const start = document.createElement("h5");
			start.textContent = `You lent this on: ${lend.start_date}`;

			const end = document.createElement("h5");
			end.textContent = `You should expect this back on: ${lend.end_date}`;

			buttonDiv = document.createElement("div");
			buttonDiv.className = "card-button-div";

			extend = document.createElement("button");
			extend.className = "extend-btn";
			extend.textContent = "Extend The Lend";
			buttonDiv.append(extend);

			card.append(titleRow, borrower, start, end, buttonDiv);
		});

		items.forEach((item) => {
			const itemCard = document.createElement("div");
			itemCard.className = "item-card";
			console.log(item);
			console.log(itemCardContainer);
			itemCard.textContent = `${item.name}`;
			itemCardContainer.append(itemCard);
			const removeButton = document.createElement("button");
			removeButton.className = "remove-btn";
			removeButton.innerHTML = `&times;`;
            itemCard.append(removeButton)
			removeButton.addEventListener("click", () => {
				itemCard.remove();
				fetch(`https://lendy-tracker.herokuapp.com/lends/${item.id}`, {
					method: "DELETE",
				});
			});
		});

		const userIdInput = document.createElement("input");
		userIdInput.name = "user_id";
		userIdInput.value = `${user.id}`;
		userIdInput.style.display = "none";
		itemForm.append(userIdInput);
	});

const newLend = document.getElementById("new-lend-button");
const lendModal = document.getElementById("new-lend");
const closeLendButton = document.getElementById("lend-close");
newLend.addEventListener("click", () => {
	lendModal.classList.add("show");
});
closeLendButton.addEventListener("click", () => {
	lendModal.classList.remove("show");
});

const newItem = document.getElementById("new-item-button");
console.log(newItem);
const itemModal = document.getElementById("new-item");
console.log(itemModal);
const closeItemButton = document.getElementById("item-close");
console.log(closeItemButton);

newItem.addEventListener("click", () => {
	itemModal.classList.add("show");
});

closeItemButton.addEventListener("click", () => {
	itemModal.classList.remove("show");
});

const sortByDate = (lends) => {
	const sortedArray = lends.sort((a, b) =>
		a.start_date > b.start_date ? 1 : b.start_date > a.start_date ? -1 : 0
	);
	return sortedArray.reverse();
};

// function sortedLends(lends) {
// 	lends.sort((a, b) => a.start_date > b.start_date)
// 		? 1
// 		: b.start_date > a.start_date
// 		? -1
// 		: 0;
// }

// items.forEach((item) => {
// 	const items = document.createElement("h3");
// 	items.textContent = `Item: ${item.name}`;
// 	console.log(items);
// 	label.append(items);

// 	i++;
// 	if (i === 3) {
// 		return;
// 	}
// });
// lends.forEach((lend) => {
// 	for (let i = 0; i < 3; i++) {
// 		const label = document.createElement("label");
// 		label.className = "carousel-card";
// 		label.id = `card${i + 1}`;
// 		label.for = `item-${i + 1}`;
// 		const borrower = document.createElement("h4");
// 		borrower.textContent = `Loaned to: ${lend.borrower.name}`;
// 		const start = document.createElement("h4");
// 		start.textContent = `Loaned on: ${lend.start_date}`;
// 		const end = document.createElement("h4");
// 		end.textContent = `Loaned on: ${lend.end_date}`;

// 		label.append(borrower, start, end);
// 		cardContainer.append(label);
// 	}
// });
