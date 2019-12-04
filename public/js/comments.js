toggleReplies = (idpost) => {
    const replySection = document.getElementById("comments-section-" + idpost);
    if (!replySection.hasChildNodes()) {
        getReplies(idpost);
    } else {
        while(replySection.firstChild) {
            replySection.removeChild(replySection.firstChild);
        }
    }
}

addReply = async (idpost, message) => {
    const res = await fetch("/post/addReply", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({idpost: idpost, message: message})
    });

    if (res.status == 200) {
        updateReplyCount(idpost);
        getReplies(idpost);    
    }
}

updateReplyCount = (idpost) => {
    const count = document.getElementById("reply-number-"+idpost);
    let countContent = count.innerText.split(" ");
    let number = countContent[0];
    number = 1 + (+number);
    count.innerText = number + " " + countContent[1];
}

getReplies = (id) => {
    const replySection = document.getElementById("comments-section-" + id);
    
    while(replySection.firstChild) {
        replySection.removeChild(replySection.firstChild);
    }
    
    const res = fetch("/post/" + id + "/replies");
        res.then(data => {
        data.json().then(replies => {
            for (reply of replies) {
                let message = reply.message;
                let image = reply.image;
                let id = reply.id;
                let replyNode = createReplyNode(image, message, id);
                replySection.appendChild(replyNode);
            }

            let replyForm = createPostForm(id);
            replySection.appendChild(replyForm);
        });
    });
}

createPostForm = (idpost) => {
    const formContainer = document.createElement("div");
    const messageInput = document.createElement("input");
    const addReplyButton = document.createElement("button");

    formContainer.className = "add-comment";
    
    messageInput.type="textarea";
    messageInput.placeholder="Add your reply..";

    addReplyButton.className="replyBTN"
    addReplyButton.type="button";
    addReplyButton.innerText="Add Reply";
    

    formContainer.appendChild(messageInput);
    formContainer.appendChild(addReplyButton);

    addReplyButton.onclick= () => {
        if(messageInput.value) {
            addReply(idpost, messageInput.value);
            messageInput.value="";
        }
    }

    return formContainer;
}

createReplyNode = (img, message, iduser) => {
    const replyDiv = document.createElement("div");
    const userLink = document.createElement("a");
    const imageObject = document.createElement("object");
    const imageDefault = document.createElement("img");
    const messageDiv = document.createElement("div");
    const messagebody = document.createElement("p");

    
    
    replyDiv.className="reply";

    userLink.href = "/profile/" + iduser;

    imageObject.data=img;
    imageObject.type="image/png+jpg";

    imageDefault.className="replyIMG";
    imageDefault.src="/img/defaultAvatar.png";
    imageDefault.alt="Default Avatar";

    imageObject.appendChild(imageDefault);
    userLink.appendChild(imageObject);

    messagebody.className="replyMSG"
    messagebody.innerText = message;
    messageDiv.appendChild(messagebody);

    replyDiv.appendChild(userLink);
    replyDiv.appendChild(messageDiv);

    return replyDiv;
}



nextPage = () => {
    const postNum = document.getElementById("postNum").innerText;
    const curPage = document.getElementById("page").innerText;

    let page = +curPage + 1;
    let hasNextPage = ((page + 1) * 2) < postNum;

    showNextPage(page);
    document.getElementById("page").innerText = page;
    document.getElementById("prevPaginate").style.display = "block";

    if (!hasNextPage) {
        document.getElementById("nextPaginate").style.display = "none";
    } 
}

showNextPage = (page) => {
    let one = page * 2;
    let two = page * 2 + 1;
    let previousOne = (page - 1) * 2;
    let previousTwo = (page - 1) * 2 + 1;
    let nodeOne = document.getElementById("reply-" + +one);
    let nodeTwo = document.getElementById("reply-" + +two);
    let previousNodeOne = document.getElementById("reply-" + +previousOne);
    let previousNodeTwo = document.getElementById("reply-" + +previousTwo);
    if (nodeOne) {
        nodeOne.style.display = "block";
    }

    if (nodeTwo) {
        nodeTwo.style.display = "block";
    }

    previousNodeOne.style.display = "none";
    previousNodeTwo.style.display = "none";
}

previousPage = () => {
    const curPage = document.getElementById("page").innerText;
    let page = +curPage - 1;
    showPreviousPage(page);
    document.getElementById("page").innerText = page;
    document.getElementById("nextPaginate").style.display = "block";

    if (page == 0) {
        document.getElementById("prevPaginate").style.display = "none";
    }
}

showPreviousPage = (page) => {
    let one = page * 2;
    let two = page * 2 + 1;
    let previousNodeOne = document.getElementById("reply-" + +one);
    let previousNodeTwo = document.getElementById("reply-" + +two);
    previousNodeOne.style.display = "block";
    previousNodeTwo.style.display = "block";

    let curOne = (page + 1) * 2;
    let curTwo = (page + 1) * 2 + 1;
    let nodeOne = document.getElementById("reply-" + +curOne);
    let nodeTwo = document.getElementById("reply-" + +curTwo);

    if (nodeOne) {
        nodeOne.style.display = "none";
    }

    if (nodeTwo) {
        nodeTwo.style.display = "none";
    }

}









