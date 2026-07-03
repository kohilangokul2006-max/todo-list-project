window.onload = function () {
    let players = JSON.parse(localStorage.getItem("players")) || [];

    players.forEach(player => {
        createListElement(player.name, player.score);
    });
};


const mainbtn = document.getElementById("add");

mainbtn.addEventListener("click", function () {

    const in_first = document.getElementById("in-text");
    const in_two = document.getElementById("in-num");

    let first_val = in_first.value.trim();
    let two_val = in_two.value.trim();

    // Validation
    if (first_val === "") {
        in_first.placeholder="ENTER PLAYER NAME ";
        in_first.classList.add("error");
        
    }else{
         in_first.classList.remove("error");
    }

    if (two_val === "") {
        in_two.placeholder="ENTER PLAYER SCORE ";
        in_two.classList.add("error");
    }
    else{
          in_two.classList.remove("error");
    }
    if (first_val === "" || two_val === "") { 
        return;
     }

    let players = JSON.parse(localStorage.getItem("players")) || [];

    let player = {
        name: first_val,
        score: two_val
    };

    players.push(player);

    localStorage.setItem("players", JSON.stringify(players));

    createListElement(first_val, two_val);

    in_first.value = "";
    in_two.value = "";
});


function createListElement(name, score) {

    const ul = document.getElementById("ul");

    let li = document.createElement("li");
    li.classList.add("list");

    let textSpan = document.createElement("span");
    textSpan.innerText = `${name} - ${score}`;

    // Edit Button
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
            editBtn.classList.add("edit");

    editBtn.addEventListener("click", function () {

        let newName = prompt("Enter New Name", name);
        let newScore = prompt("Enter New Score", score);

        if (newName === null || newScore === null) {
            return;
        } 
        if (isNaN(newScore)) {
        alert("Only Enter Number in Score");
        return;
        }

        newName = newName.trim();
        

        if (newName === "" || newScore === "") {
            alert("Fields cannot be empty");
            return;
        }

        textSpan.innerText = `${newName} - ${newScore}`;

        let players = JSON.parse(localStorage.getItem("players")) || [];

        let index = players.findIndex(
            p => p.name === name && p.score == score
        );

        if (index !== -1) {
            players[index].name = newName;
            players[index].score = newScore;

            localStorage.setItem("players", JSON.stringify(players));
        }

        name = newName;
        score = newScore;

    });

    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("del");

    deleteBtn.addEventListener("click", function () {

        let players = JSON.parse(localStorage.getItem("players")) || [];

        players = players.filter(
            p => !(p.name === name && p.score == score)
        );

        localStorage.setItem("players", JSON.stringify(players));

        li.remove();
    });

    li.appendChild(textSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    ul.appendChild(li);
}