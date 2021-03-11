const searchParams = new URLSearchParams(window.location.search);
const username = searchParams.get("username");
const cardContainer = document.getElementById("cards-container");
const userNameDisplay = document.getElementById("user-name-display");
userNameDisplay.textContent = `Welcome ${username}!`;
const itemCardContainer = document.getElementById("items-container");
const itemForm = document.getElementById("item-form");
const itemsIdList = document.getElementById("item-list-id");
const borrowerIdList = document.getElementById('borrower-id')
console.log(itemsIdList)


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

            const status = document.createElement('h5')
            status.textContent = `Status: ${lend.complete}`

			buttonDiv = document.createElement("div");
			buttonDiv.className = "card-button-div";

			extend = document.createElement("button");
			extend.className = "extend-btn";
			extend.textContent = "Extend The Lend";
			buttonDiv.append(extend);

			const extendModal = document.getElementById("extend-lend");
			const closeExtendButton = document.getElementById(
				"extend-lend-close"
			);
			console.log(closeExtendButton);

			// const endPoint = document.getElementById("updated-end-point");

			extend.addEventListener("click", () => {
				const hiddenIdInput = document.getElementById(
					"updated-lend-id"
				);
				hiddenIdInput.value = lend.id;
				const span = document.createElement("span");
				span.id = `${lend.id}`;
				extendModal.append(span);
				span.style.display = "none";
				extendModal.classList.add("show");
			});
			closeExtendButton.addEventListener("click", () => {
				// const span = document.querySelector(`#${lend.id}`)
				// span.remove
				extendModal.classList.remove("show");
			});

			const extendedLendDate = document.getElementById("updated-end-point");
			// console.log(extendedLendDate.value);
			// extendLendAction.addEventListener("click", (e) => {
			// 	e.preventDefault();
			// 	fetch(`https://lendy-tracker.herokuapp.com/lends/${lend.id}`, {
			// 		method: "PUT",
			// 		body: JSON.stringify({
			// 			end_date: `${extendedLendDate.value}`,
			// 		}),
			// 	});
			// 	console.log("word");
			// });

			const extendForm = document.getElementById("extend-form");
			const lendExtendIdInput = document.createElement("input");

			lendExtendIdInput.name = "id";
			lendExtendIdInput.value = `${lend.id}`;
			lendExtendIdInput.style.display = "none";
			extendForm.append(lendExtendIdInput);

			card.append(titleRow, borrower, start, end, status, buttonDiv);
		});

		const extendForm = document.getElementById("extend-form");
		extendForm.addEventListener("submit", (e) => {
			e.preventDefault();
			const extendFormData = new FormData(e.target);
			const extendedEndDate = extendFormData.get("end_date");
            const lendId = extendFormData.get('lend_id')
			fetch(`https://lendy-tracker.herokuapp.com/lends/${lendId}?end_date=${extendedEndDate}`, {
				method: "PATCH",
			})
		})

		items.forEach((item) => {
			const itemCard = document.createElement("div");
            const itemOption = document.createElement('option')
            itemOption.textContent = `${item.name}`
            itemOption.className = 'list-options'
            itemOption.value = item.id
            itemsIdList.appendChild(itemOption)
            console.log(itemOption)
			itemCard.className = "item-card";
			itemCard.textContent = `${item.name}`;
			itemCardContainer.append(itemCard);
			const removeButton = document.createElement("button");
			removeButton.className = "remove-btn";
			removeButton.innerHTML = `&times;`;
			itemCard.append(removeButton);
			removeButton.addEventListener("click", () => {
				itemCard.remove();
				fetch(`https://lendy-tracker.herokuapp.com/items/${item.id}`, {
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
const itemModal = document.getElementById("new-item");
const closeItemButton = document.getElementById("item-close");

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
