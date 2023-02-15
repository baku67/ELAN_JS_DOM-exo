window.onload = function() {

    const box = document.createElement('div');
    box.classList.add('box');

    const board = document.querySelector("#board");

    for(let i = 1; i <= 10; i++) {
        let newBox = box.cloneNode();
        newBox.innerText = i;
        board.appendChild(newBox);

        newBox.addEventListener("click", function() {
            console.log("Boite n°" + i + ", click");
            newBox.classList.add("box-valid");
        })
    }

    function shuffleChidren(parent) {
        let children = parent.children;

        let i = children.length, k, temp;
        while(i-- > 0) {
            k = Math.floor(Math.random() * (i+1));
            temp = children[k];
            children[k] = children[i];
            appendChild(temp);
        }
    }
    shuffleChidren(board);
    
}