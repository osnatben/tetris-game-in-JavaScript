function generalNewShape(){//מאתחל בכל סיבוב את האובייקט אופסט
    newShape={
        ShapeType:SHAPE_TYPE[Math.floor(Math.random()*SHAPE_TYPE.length)],//מקבלת מספר בן 0-1 ומכפילה באורך המערך של הצורות לעגל לערך הקטן שלא יהיה מעל הערך הגדול שהוא 7
        top:0,
        left:boardSize.cols/2-1,
        shapeOrient:0
    }
    newShape.squareArr=getShape(newShape.ShapeType,newShape.top,newShape.left,newShape.shapeOrient)
    return newShape
}


function drowFallShape(){
    curShape.squareArr.forEach(square => { fillSquare(square)     })
}
function InitOccupiedSquer(){//מערך משבצות שמעדכן מי תפוס ומי לא
    retval=[]
    for (i=0;i<boardSize.rows;i++){
        boardRow=Array(boardSize.cols).fill(false)
        retval.push(boardRow)
    }
    return retval
}

function drowFrame(){ //אחראית לכל הציור המתחלף בכל משחק
    clearBoard()//קריאה לפונקציה מחיקת היסטוריה
    drowBoard()  //קריאה לפונקציה ציור לוח
    drowGrid() //קריאה לפונקציה ציור גריד  
    drowFallShape()  
    drowOccupiedSquars()
}
//פונקציה לבדיקה האם המשבצת תפוסה
function IsSquarOccupied(square){
    if(square.row>=boardSize.rows||square.col<0||square.col>=boardSize.cols){
        return true
    }
    //מוסיפה בדיקה אם הערך שלילי היות ויש צורות שהערך שלהן בתחילת שלילי- יגדיר את הריבוע כלא תפוס
    if(square.row<0){
        return false
    }
      return occupiedSquares[square.row][square.col]//יחזיר ערך חיובי למשבצת  במערך
}
//פןנקציה האם הצורה חוקית
function IsShapeOccupied(shape){
    return shape.some(square=>IsSquarOccupied(square))
}

function AddFallingShapeToOccupiedSquare(){
    curShape.squareArr.forEach(shapeSquare=>{
        if(shapeSquare.row<0){
            ////קישור לעמוד נכשל
            window.location.href = 'Fails.html';  
           
          
            clearInterval(intervalID)
            return 
        }else
         occupiedSquares[shapeSquare.row][shapeSquare.col]=true})
    
}
function FmoveFullLine(){ //הסרת שורה מלאה
    //מציאת שורה מלאה עי חיפוש ורה שלמה שתחזיר TRUE

    fullLine =[]
    for(i=0;i<occupiedSquares.length;i++){
        if(occupiedSquares[i].every(square=>square)) //אם כל הריבועים באותו ערך I יחזירו אמת
        fullLine.push(i)     //הכנסת השורה המלאה למערך   
    }
    //מחיקת השורות שהן מלאות -הEVERY  של הצורה החזיר TRUE

    while(fullLine.length>0){ //כל עוד המערך לא ריק
        for(i=fullLine[0];i>0;i--){//מעבר על מערך השורות המלאות
        occupiedSquares[i]=occupiedSquares[i-1]      //כל שורה יורדת לשורה תחתיה      
    }
//השורה העליונה ירדה שורה תחתיה וצריכה להיות ריקה שלא יווצר שורה כפולה
    occupiedSquares[0]=Array(boardSize.cols).fill(false)
    //הסרת האיבר הראשון מהמערך של השורות המלאות
    fullLine.shift()
}
}

function drowOccupiedSquars(){
    for(i=0;i<occupiedSquares.length;i++){
        for(j=0;j<occupiedSquares[i].length;j++){
            if(occupiedSquares[i][j])
            fillSquare({row:i,col:j})
        }
    }
}


//פונקצית משחק ראשית 
function mainLoop(){
    drowFrame() //מבצעת את רצף הפונקציות לציור המשחק

    moveDownShape=getShape(curShape.ShapeType,curShape.top + 1,curShape.left,curShape.shapeOrient)
    
        if(IsShapeOccupied(moveDownShape)){ //אם הצורה תפוסה
            AddFallingShapeToOccupiedSquare() //הוספת צורה חדשה למערך
            FmoveFullLine() //קריאה לפונקציה לבדיקת מחיקת שורה מלאה

       curShape= generalNewShape()
        }
          else{
             curShape.squareArr=moveDownShape
             curShape.top++
              }
             
    
}
document.addEventListener('keydown',(e)=>{
    switch (e.key){
        case 'ArrowLeft':
            e.preventDefault() //ביטול הברירת מחדל של גלילת הדף
            moveLeftShape=getShape(curShape.ShapeType,curShape.top,curShape.left-1,curShape.shapeOrient) //שליחה לפונקצית הבדיקה עם ערך שמאלה
            if(!IsShapeOccupied(moveLeftShape)){
                curShape.squareArr=moveLeftShape
                curShape.left--
            }            
            break
        case'ArrowRight':
            e.preventDefault()
            moveRightShape=getShape(curShape.ShapeType,curShape.top ,curShape.left+1,curShape.shapeOrient)
            if(!IsShapeOccupied(moveRightShape)){
                curShape.squareArr=moveRightShape
                curShape.left++
            }
            break
        case 'ArrowUp':
            e.preventDefault()
            RotatedShape=getShape(curShape.ShapeType,curShape.top ,curShape.left,(curShape.shapeOrient+1)%4)
            if(!IsShapeOccupied(RotatedShape)){
                curShape.squareArr=RotatedShape
                curShape.shapeOrient=(curShape.shapeOrient+1)%4
            }
            break
            case 'ArrowDown':
            e.preventDefault()
            RotatedShape=getShape(curShape.ShapeType,curShape.top ,curShape.left,(curShape.shapeOrient-1)%4)
            if(!IsShapeOccupied(RotatedShape)){
                curShape.squareArr=RotatedShape
                curShape.shapeOrient=(curShape.shapeOrient-1)%4
            }
            break

    }
})
const boardSize={rows:20,cols:10}
/*curShape =[{rows:0,colm:4,},{rows:0,colm:5}]*/ //מערך צורות 
curShape=generalNewShape()
occupiedSquares=InitOccupiedSquer()
/*drowShape()*/ //קריאה לפונקציה למילוי צורות לפי הערך במערך
//const speed = 150
//const speed =300
//let speedGame = document.querySelector(".option").value;
const speedGame=300

//console.log(speed)
//switch (speed){
 //   case "150":
   //      speedGame=150
   //     break;
  //  case "300":
  //       speedGame=300       
 //       break;
 //   case "450":
  //       speedGame=450
  //      break;
//}
setInterval(mainLoop,speedGame)   
