const SHAPE_TYPE=["L","L_REV","DOG","DOG_REV","LINE","SQUARE","PLUS"]

function getBaseShape(ShapeType){
    let baseShape={}
    baseShape["L"]=[{col:-1,row:-1},{col:0,row:-1},{col:0,row:0},{col:0,row:1},]
    baseShape["L_REV"]=[{col:0,row:-1},{col:1,row:-1},{col:0,row:0},{col:0,row:1},]
    baseShape["DOG"]=[{col:0,row:0},{col:1,row:0},{col:-1,row:1},{col:0,row:1},]
    baseShape["DOG_REV"]=[{col:-1,row:0},{col:0,row:0},{col:0,row:1},{col:1,row:1},]
    baseShape["LINE"]=[{col:0,row:-2},{col:0,row:-1},{col:0,row:0},{col:0,row:1},]
    baseShape["SQUARE"]=[{col:0,row:0},{col:1,row:0},{col:0,row:1},{col:1,row:1},]
    baseShape["PLUS"]=[{col:0,row:-1},{col:-1,row:0},{col:0,row:0},{col:1,row:0},]
    
   //return[{rows:0,colm:0,},{rows:0,colm:1}]
   return baseShape[ShapeType]
}

function RotateShape(baseShape,orientation){  //סיבוב צורה
    rotatedShape=baseShape //המשתנה מקבל את  הצורה הבסיסית
    for(i=0;i<orientation;i++){       
        rotatedShape=rotatedShape.map(sq=>{return{col:-sq.row,row:sq.col}}) //מבצע סיבוב של 90 מעלות כמספר הפעמים שהתקבל בקלט
    }
    return rotatedShape //מחזיר צורה מסובבת
}

function getShape(ShapeType,top,left,shape_orient){
    baseShape=getBaseShape(ShapeType)
    rotatedShape=RotateShape(baseShape,shape_orient)
    shapeWithOffset=rotatedShape.map(square=>{
        return{row:square.row+top,col:square.col+left}
    })
    return shapeWithOffset
}