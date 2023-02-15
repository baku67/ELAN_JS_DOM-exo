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

    window.localStorage.setItem("1", 0);
    window.localStorage.setItem("2", 0);
    window.localStorage.setItem("3", 0);
    function highScores(actualTimer) {
        // comparaison et ecrasement
        if (actualTimer < window.localStorage.getItem("1")) {
            window.localStorage.setItem("1", timer);
            document.getElementById("top1").innerText = window.localStorage.getItem("1");
        }
        else if (actualTimer < window.localStorage.getItem("2")) {
            window.localStorage.setItem("2", timer);
            document.getElementById("top2").innerText = window.localStorage.getItem("2");
        }
        else if (actualTimer < window.localStorage.getItem("3")) {
            window.localStorage.setItem("3", timer);
            document.getElementById("top3").innerText = window.localStorage.getItem("3");
        }

    }
    

    const box = document.createElement('div');
    box.classList.add('box');

    const board = document.querySelector("#board");

    let nb = 1;
    var timer = 0; // En secondes pour commencer, voire pour affichage "00:00"
    timerState = true;
    functionState = false;

   
    for(let i = 1; i <= 10; i++) {
        const newBox = box.cloneNode();
        newBox.innerText = i;
        board.appendChild(newBox);
        

        newBox.addEventListener("click", function() {
            // start timer (fonction récursive pour avoir acces à la var State dynamiquement):
            if (nb == 1) {
                timerState = true;

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
                    // Reinitialisation jeu 3s apres Win
                    setTimeout(function() {
                        nb = 1;
                        document.getElementById('timer').innerText = timer + " secondes";
                        board.querySelectorAll(".box-valid").forEach(function(validBox) {
                            validBox.classList.remove("box-valid");
                            validBox.classList.remove("success");
                        })
        
                    }, 3000);
                    // Fin reinit
                    timerState = false;
                    highScores(timer);
                    timer = 0;
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