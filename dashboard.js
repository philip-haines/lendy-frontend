const searchParams = new URLSearchParams(window.location.search);
const username = searchParams.get("username");
const cardContainer = document.getElementById("cards-container");
const userNameDisplay = document.getElementById("user-name-display");
userNameDisplay.textContent = `Welcome ${username}!`;
const itemCardContainer = document.getElementById("items-container");
const itemForm = document.getElementById("item-form");
const itemsIdList = document.getElementById("item-list-id");
const borrowerIdList = document.getElementById("borrower-list-id");
const lendsFormExtend = document.getElementById("add-form-extend");
const extendForm = document.getElementById("extend-lend-form");

fetch(`https://lendy-tracker.herokuapp.com/users/login/${username}`)
	.then((response) => response.json())
	.then((user) => {
		const lends = user.lends;
		const items = user.items;
		renderCards(lends, items)
        renderItems(items)
        addItem(user)
        extendLend(lends)
	});




    function extendLend(lends){
        extendForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const extendLendFormData = new FormData(e.target);
            const extendedEndDate = extendLendFormData.get("end_date");
            const lendId = extendLendFormData.get("lend_id");
            fetch(
                `https://lendy-tracker.herokuapp.com/lends/${lendId}?end_date=${extendedEndDate}`,
                {
                    method: "PATCH",
                }
            ).then(window.location.reload());
        });
    }


    function renderItems(items){
        items.forEach((item) => {
			const itemCard = document.createElement("div");
			itemCard.className = "item-card";
			itemCard.textContent = `${item.name}`;
			itemCardContainer.append(itemCard);

			const itemOption = document.createElement("option");
			itemOption.textContent = `${item.name}`;
			itemOption.className = "list-options";
			itemOption.value = item.id;
			itemsIdList.appendChild(itemOption);

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
    }

    function renderCards(lends, items){
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

			const extendModal = document.getElementById("extend-lend");
			const closeExtendButton = document.getElementById(
				"extend-lend-close"
			);

			const toggleButton = document.createElement("div");
			toggleButton.className = "toggle-button";
			const innerCircle = document.createElement("div");
			innerCircle.className = "inner-circle";

			toggleButton.append(innerCircle);
			buttonDiv.append(extend, toggleButton);

			toggleButton.addEventListener("click", (e) => {
				e.preventDefault();
				toggleButton.classList.toggle("active");
			});

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
				extendModal.classList.remove("show");
			});

			const extendedLendDate = document.getElementById(
				"updated-end-point"
			);

			const extendLendForm = document.getElementById("extend-lend-form");
			const lendExtendIdInput = document.createElement("input");

			lendExtendIdInput.name = "id";
			lendExtendIdInput.value = `${lend.id}`;
			lendExtendIdInput.style.display = "none";
			extendLendForm.append(lendExtendIdInput);

			card.append(titleRow, borrower, start, end, buttonDiv);
		});
    }

    function addItem(user){
        itemForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const itemFormFormData = new FormData(e.target);
            const itemName = itemFormFormData.get("name");
            const itemCategory = itemFormFormData.get("category");
            fetch(`https://lendy-tracker.herokuapp.com/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: itemName,
                    user_id: user.id,
                    category: itemCategory,
                }),
            }).then(window.location.reload());
            console.log(user.id, itemName, itemCategory);
	    })
    };

fetch("https://lendy-tracker.herokuapp.com/borrowers")
	.then((response) => response.json())
	.then((borrowers) => {
		borrowers.forEach((borrower) => {
			const borrowerOption = document.createElement("option");
			borrowerOption.value = borrower.id;
			borrowerOption.textContent = borrower.name;
			borrowerIdList.append(borrowerOption);
		});
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
