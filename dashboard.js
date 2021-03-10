const searchParams = new URLSearchParams(window.location.search);
const username = searchParams.get("username");
const cardContainer = document.getElementById("cards-container");
const userNameDisplay = document.getElementById("user-name-display")
userNameDisplay.textContent = `Welcome ${username}!`

// https://lendy-tracker.herokuapp.com/login/${username}
fetch(`https://lendy-tracker.herokuapp.com/users/11`)
	.then((response) => response.json())
	.then((user) => {
		lends = user.lends;
		items = user.items;
        lends.forEach((lend) => {
            const card = document.createElement('div')
            card.className = 'card'
            cardContainer.append(card)

            const borrower = document.createElement('h4')
            borrower.textContent = `You lent this to: ${lend.borrower.name}`

            const start = document.createElement('h5')
            start.textContent = `You lent this on: ${lend.start_date}`
            
            const end = document.createElement('h5')
            end.textContent = `You lent this on: ${lend.end_date}`

            buttonDiv = document.createElement('div')
            buttonDiv.className = 'card-button-div'


            extend = document.createElement('button')
            extend.className = 'extend-btn'
            extend.textContent = 'Extend The Lend'
            buttonDiv.append(extend)
            
            endLend = document.createElement('button')
            endLend.className = 'end-lend-btn'
            endLend.textContent = 'End The Lend'
            buttonDiv.append(endLend);

            card.append(borrower, start, end, buttonDiv)
        })
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
	});

// function sortedLends(lends) {
// 	lends.sort((a, b) => a.start_date > b.start_date)
// 		? 1
// 		: b.start_date > a.start_date
// 		? -1
// 		: 0;
// }
