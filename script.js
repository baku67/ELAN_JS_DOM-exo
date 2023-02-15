window.onload = function() {

    // Coquille Ici:
    function shuffleChidren(parent) {
        let children = parent.children;
        let i = children.length, k, temp;

        while(i-- > 0) {
            k = Math.floor(Math.random() * (i+1));
            temp = children[k];
            children[k] = children[i];
            // Coquille (manque .parent):
            parent.appendChild(temp);
        }
    }

    // Retour visuel de la vérification (au lieu des alert)
    function showReaction(type, clickedBox) {
        clickedBox.classList.add(type);
        if (type !== "success") {
            setTimeout(function() {
                clickedBox.classList.remove(type);
            }, 800);
        }
    }
    

    const box = document.createElement('div');
    box.classList.add('box');

    const board = document.querySelector("#board");

    let nb = 1;
    var timer = 0; // En secondes pour commencer, voire pour affichage "00:00"
    timerState = true;
   
    for(let i = 1; i <= 10; i++) {
        const newBox = box.cloneNode();
        newBox.innerText = i;
        board.appendChild(newBox);

        newBox.addEventListener("click", function() {
            // start timer (fonction récursive pour avoir acces à la var State dynamiquement):
            if (nb == 1) {
                timerState = true;
                functionState = false;

                function ongoing() {
                    functionState = true;
                    setTimeout(function() {
                        if(timerState == true) {
                            timer++;
                            document.getElementById('timer').innerText = timer + " secondes";
                        }
                        ongoing();
                    }, 1000);
                }
                // State pour éviter de dupliquer la fonction apres un resultat (pas de refresh page)
                if (functionState == false) {
                    ongoing();
                }
            }


            if (i == nb) {
                newBox.classList.add("box-valid");
                if (nb == board.children.length) {
                    board.querySelectorAll(".box").forEach(function(box) {
                        showReaction("success", box);
                    });
                    timerState = false;
                    timer = 0;
                    document.getElementById('timer').innerText = timer + " secondes";
                }
                nb++;
            }
            else if(i > nb) {
                showReaction("error", newBox);
                nb = 1;
                board.querySelectorAll(".box-valid").forEach(function(validBox) {
                    validBox.classList.remove("box-valid");
                })
                timerState = false;
                timer = 0;
                document.getElementById('timer').innerText = timer + " secondes";
            }
            else {
                showReaction("notice", newBox);
            }
        })
    }

    shuffleChidren(board);


    
}