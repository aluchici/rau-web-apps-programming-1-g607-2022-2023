// complete friends list 

// <div class="friends-list-item">
//     <div>
//         <img class="friends-list-logo" src="D:\LUCHICI\Source\rau-web-apps-programming-1-g607-2022-2023\royal607\client\assets\97654965-abstract-virtual-coin-object-on-a-white-background.webp">
//         <span class="friends-list-name">Ionel Popescu</span>
//     </div>
//     <div>
//         <span class="friends-list-status friends-list-status-on">Online</span>
//     </div>
// </div>

function createFriendListItem(friendNameValue = "Ionel Popescu", friendProfilePic = "", friendStatusValue = "Offline") {
    const friendsListItem = document.createElement("div");
    friendsListItem.className = "friends-list-item";

    const friendNameAndImageSection = document.createElement("div");

    const friendImage = document.createElement("img");
    friendImage.src = friendProfilePic;
    friendImage.className = "friends-list-logo";

    const friendName = document.createElement("span");
    friendName.className = "friends-list-name";
    friendName.innerText = friendNameValue;

    friendNameAndImageSection.appendChild(friendImage);
    friendNameAndImageSection.appendChild(friendName);

    const friendStatusSection = document.createElement("div");

    const friendStatus = document.createElement("span");
    friendStatus.classList.add("friends-list-status");

    if (friendStatusValue === "Online") {
        friendStatus.classList.add("friends-list-status-on");
        friendStatus.innerText = "Online";
    } else {
        friendStatus.classList.add("friends-list-status-off");
        friendStatus.innerText = "Offline";
    }

    friendStatusSection.appendChild(friendStatus);

    friendsListItem.appendChild(friendNameAndImageSection);
    friendsListItem.appendChild(friendStatusSection);
    return friendsListItem;
}

function createFriendsList(friendsListDetails) {
    const friendsListContainer = document.getElementById("friends-section");
    for (const friend of friendsListDetails) {
        const friendName = `${friend.firstName} ${friend.lastName}`;
        const friendItem = createFriendListItem(friendName, friend.profilePictureUrl, friend.status);
        friendsListContainer.appendChild(friendItem);
    }
}

// TODO: <!!FUTURE!!> Change this to an HTTP request to get data from an API
const FRIENDS = [
    {
        firstName: "I",
        lastName: "Popescu",
        profilePictureUrl: "",
        status: "Online"
    },
    {
        firstName: "V",
        lastName: "Ionescu",
        profilePictureUrl: "",
        status: "Offline"
    },
    {
        firstName: "K",
        lastName: "Popper",
        profilePictureUrl: "",
        status: "Offline"
    },
    {
        firstName: "W",
        lastName: "Doe",
        profilePictureUrl: "",
        status: "Online"
    },
    
    {
        firstName: "Q",
        lastName: "Doe",
        profilePictureUrl: "",
        status: "Offline"
    }
]

createFriendsList(FRIENDS);
