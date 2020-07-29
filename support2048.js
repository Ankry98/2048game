function getPosTop(i,j){
    return 20 + i*120;
}
function getPosLeft(i,j){
    return 20 + j*120;
}

function getNumberBackgroundColor(number){
    switch(number){
        case 2:return "#ffefe0";break;
        case 4:return "#ffe3ed";break;
        case 8:return "#ffb6b6";break;
        case 16:return "#fddd8a";break;
        case 32:return "#f8a987";break;
        case 64:return "#f37d7a";break;
        case 128:return "#a7d7c5";break;
        case 256:return "#74b49b";break;
        case 512:return "#72a39f";break;
        case 1024:return "#9ee9da";break;
        case 2048:return "#a7c1de";break;
        case 4096:return "#d6cdeb";break;
        case 8192:return "#d8b8e9";break;
    }
    return "black";
}

function getNumberColor(number) { 
    if(number <= 4)
        return "#a69d95";

    return "white";
 }

 function nospace(board) { 
     for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++)
            if(board[i][j] == 0)
                return false;

    return true;
  }

function canMoveLeft(board) { 
    for(var i = 0; i < 4; i++)
        for(var j = 1; j < 4 ; j++)
            if(board[i][j]!= 0) 
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
                    return true;
        
    return false;
}

function canMoveRight( board ){

    // 只需要遍历12个元素，因为最右边的元素不能向左移了
    // 右边是否没有数字？
    // 右边数字是否和自己相等？
    for(var i = 0 ; i < 4 ;i ++)
        for( var j = 2 ; j >= 0 ; j --) //第0列不需要遍历
            if( board[i][j] !=0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                    return true;
        
    return false;  
}

function canMoveUp( board ){

    // 只需要遍历12个元素，因为最上边的元素不能向上移了
    // 上边是否没有数字？
    // 上边数字是否和自己相等？
    for(var j = 0 ; j < 4 ;j ++)
        for( var i = 1 ; i < 4 ; i ++) //第0行不需要遍历
            if( board[i][j] !=0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;
        
    return false;  
}

function canMoveDown( board ){

    // 只需要遍历12个元素，因为最下边的元素不能向下移了
    // 下边是否没有数字？
    // 下边数字是否和自己相等？
    for(var j = 0 ; j < 4 ;j ++)
        for( var i = 2 ; i >= 0 ; i --) //第0行不需要遍历
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;
        
    return false;  
}



function noBlockHorizontal(row, col1, col2, board){
    for(var i = col1 + 1 ; i < col2; i++)
        if( board[row][i] != 0 )
            return false;
    
    return true;
}

function noBlockVertical(col, row1, row2, board){
    for(var i = row1 + 1 ; i < row2; i++)
        if( board[i][col] != 0 )
            return false;
    
    return true;
}

function nomove() { 
    if(canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveUp(board)  )
        return false;
    
    return true;
 }