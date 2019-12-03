test = (idpost, message) => {
    alert(idpost+message);
}

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
    console.log(idpost+message);
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
                let replyNode = createReplyNode(image, message);
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

createReplyNode = (img, message) => {
    const replyDiv = document.createElement("div");
    const imageObject = document.createElement("object");
    const imageDefault = document.createElement("img");
    const messageDiv = document.createElement("div");
    const messagebody = document.createElement("p");

    replyDiv.className="reply";

    imageObject.data=img;
    imageObject.type="image/png";

    imageDefault.className="img-circle";
    imageDefault.src="/img/defaultAvatar.png";
    imageDefault.alt="Default Avatar";

    imageObject.appendChild(imageDefault);

    messagebody.innerText = message;
    messageDiv.appendChild(messagebody);

    replyDiv.appendChild(imageObject);
    replyDiv.appendChild(messageDiv);

    return replyDiv;
}




