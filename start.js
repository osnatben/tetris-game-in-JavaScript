window.onload = () => {
    switch (document.querySelector("body").id) {
        case "home":
            homePage();
            break;

        case "game":
            game();
            break;
    }
}

function homePage() {
    //כניסה
    


    document.querySelector("#enter").onclick = function () {
        document.querySelector("#form").style.display = "flex";
       document.querySelector("#gamers").style.display = "flex";
       document.querySelector("#instructions").style.display = "none";
       document.querySelector("#enter").style.display = "none";
       document.querySelector("#start").style.display = "flex";

        playerName = document.querySelector("#gamers").value;

       
    }
    function start() {
        if (document.querySelector("#name").value != '' && document.querySelector("#system").value != '') {
            let gamer = document.querySelector("#name").value;
            document.querySelector("#enter").style.display = "none";
            document.querySelector("#form").style.display = "none";
            document.querySelector("#gamers").style.display = "block";
            window.location.href = 'tetris.html';
            const speed = document.querySelector("#myDropdown").value;
            game();

        }
        else
            alert("לא הוכנס ערך")
    }


   
    //בלחיצה על כפתור התחל
    document.querySelector("#start").onclick = start;


    //בלחיצה על כפתור נסה שוב
    document.querySelector("#again").onclick = game();



    
    //התחלת המשחק
   //  {
    //    gamer=playerName
   //     if (gamer) {
    //        window.location.href = 'tetris.html';
    //        game();
    //    }
    //    alert("לא נבחר שחקן")

  //  }

    //פוקוס בטופס
    document.querySelector("input").onfocus = function () {
        document.querySelector("input").style.borderColor = "yellow";
    }

    
    let gamer;
    

    //בעת שליחת הטופס
    document.querySelector("#form").addEventListener("submit", function (e) {
        e.preventDefault();
    });
    //בלחיצה על שמור

    //בלחיצה על ביטול
    document.querySelector("#cancle").onclick = function () {
        document.querySelector("#form").style.display = "none";
        document.querySelector("#gamers").style.display = "block";
    }

}

