squareSize=20;  //גודל ריבוע 
canvas=document.getElementById(`baseCanvas`)
ctx=canvas.getContext(`2d`)

function drowBoard(){  //ציור מרובע של הלוח
    ctx.beginPath()
    ctx.rect(0,0,boardSize.cols*squareSize,boardSize.rows*squareSize)
    ctx.stroke()
}
function clearBoard(){//מנקה לוח בשביל מחיקת היסטוריה
    ctx.beginPath()
    ctx.fillStyle='#FFFFFF'
    ctx.fillRect(0,0,boardSize.cols*squareSize,boardSize.rows*squareSize)
}
function drowGrid(){
    //ציור קוי רוחב
    startP={}
    endP={}
    startP.col=0
    endP.col=boardSize.cols
    for ( i=0;i<boardSize.rows;i++)
    {
        startP.row=i
        endP.row = i
        drowLine(startP,endP) 
     }
     //ציור קוי אורך
    startP.row=0
    endP.row=boardSize.rows
    for ( i=0;i<boardSize.cols;i++)
    {
        startP.col=i
        endP.col = i
        drowLine(startP,endP) 
     }
    
}
//פונקציה ציור קו והכפלת גודל משבצת לפי הגודל הנתון
function drowLine(startP,endP){
    ctx.beginPath()
    ctx.moveTo(startP.col*squareSize,startP.row*squareSize)
    ctx.lineTo(endP.col*squareSize,endP.row*squareSize)
    ctx.stroke()
   
}

//פונקציה לציור משבצת מלאה
function fillSquare(square){
    ctx.beginPath()
    ctx.fillStyle='#000000'
    ctx.fillRect(square.col*squareSize,square.row*squareSize,squareSize,squareSize)
   
}

//  ושליחת פרמטרים פונקציה לציור צורה מלאה עי מעבר על המשבצות במערך
function drowShape(){
    curShape.forEach(square => { fillSquare(square) });
}

