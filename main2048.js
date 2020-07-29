var board = new Array();
var score = 0;
var hasConflicted = new Array();

$(document).ready(function() { 
    newgame();
 });

function newgame() { 

    // 1.初始化棋盘
    init();

    // 2.随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();

  }

function init() { 
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++)
        {
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css('top', getPosTop(i,j));
            gridCell.css('left', getPosLeft(i,j));
        }

    for(var i = 0; i < 4; i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
            for(var j = 0; j < 4; j++){
                board[i][j] = 0;
                hasConflicted[i][j] = false;
            }     
   }

   updateBoardView();

   score = 0;
}

function updateBoardView() { 

    $(".number-cell").remove();
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++){
            $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px'); 
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);

            }
            else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted [i][j] = false;

        }   
 }

 function generateOneNumber(){
     if(nospace(board))
         return false;

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));

    /* while(true){
        if(board[randx][randy]==0) 
            break;

        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
    */
    
    var count = 0;
    var temporary = new Array();
    for(var i = 0; i < 4; i++)
        for(var j = 0; j < 4; j++){
            if(board[i][j]==0){
                temporary[count] = i*4 + j;
                count++;
            }
        }
    var pos = parseInt(Math.floor(Math.random()*count));
    randx = Math.floor(temporary[pos]/4);
    randy = Math.floor(temporary[pos]%4);

    //随机一个数字
    var randNumber = Math.random() > 0.5?2:4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;

 } 





$(document).keydown(function(event){
    switch(event.keyCode){
        //left
        case 37:
            if (moveLeft()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;

        //up
        case 38:
            if (moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;

        //right
        case 39:
            if (moveRight()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;

        //down
        case 40:
            if (moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
            break;
             

    }
});


function isgameover() { 
    if(nospace(board) && nomove(board)){
        gameover();
    }
 }

function gameover() { 
    alert("Gameover");
 }

function moveLeft(){
    if(!canMoveLeft(board))
        return false;

    for(var i = 0; i < 4; i++)
        for(var j = 1; j < 4 ; j++){
            if(board[i][j] != 0){
                for(var k = 0; k < j; k++){
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k] ){
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board)){
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                
                }
            }

        }

    setTimeout("updateBoardView()",200);
    return true;  
}

function moveRight(){
    if(!canMoveRight(board))
        return false;

    
        for(var i = 0; i < 4; i++)
            for(var j = 2; j >= 0 ; j--){
                if(board[i][j] != 0){
                    for(var k = 3; k > j; k--){
                        if(board[i][k] == 0 && noBlockHorizontal( i, j, k, board ) && !hasConflicted[i][k]){
                            showMoveAnimation(i, j, i, k);
                            board[i][k] = board[i][j];
                            board[i][j] = 0;
                            continue;
                    }
                        else if(board[i][k] == board[i][j] && noBlockHorizontal( i, j, k, board )){
                            showMoveAnimation(i, j, i, k);
                            board[i][k] *= 2;
                            board[i][j] = 0;
                            score += board[i][k];
                            updateScore(score);

                            hasConflicted[i][k] = true;
                            continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;  
}

function moveUp() { 
    if( !canMoveUp( board ))
  //   上边是否没有数字？
  //   上边数字是否和自己相等？
      return false;

      // moveRight
      for(var j = 0 ; j < 4 ;j ++)
          for( var i = 1 ; i < 4 ; i ++){
              if ( board[i][j] !=0 ){

                  //遍历(i,j)右侧的所有元素 k
                  for( var k = 0; k < i; k++ ){
                      if( board[k][j] == 0 && noBlockVertical( j, k, i, board ) && !hasConflicted[k][j]){
                          // 如果没有障碍物的话，就可以产生移动
                          // move
                          showMoveAnimation( i, j, k, j );
                          board[k][j] = board[i][j];
                          board[i][j] = 0;
                          continue;
                      }
                      else if( board[k][j] == board[i][j] && noBlockVertical( j, k, i, board )){
                          // 有障碍物，但障碍物k与j相同，则产生叠加
                          // move
                          // add
                          showMoveAnimation( i, j, k, j );
                          board[k][j] *= 2;
                          board[i][j] = 0;
                          score += board[k][j];
                          updateScore(score);

                          hasConflicted[k][j] = true;
                          continue;
                      }
                  }
              }
          }
      

      setTimeout("updateBoardView()",200) ; //等待200ms等动画效果再每次进行一次刷新
      return true;
 
}

function moveDown() { 
    if( !canMoveDown( board ))
  //   下边是否没有数字？
  //   下边数字是否和自己相等？
      return false;

      // moveRight
      for(var j = 0 ; j < 4 ;j ++)
          for( var i = 2 ; i >=0 ; i --){
              if ( board[i][j] != 0 ){

                  //遍历(i,j)下侧的所有元素 k
                  for( var k = 3; k > i; k-- ){
                      if( board[k][j] == 0 && noBlockVertical( j, i, k, board ) && !hasConflicted[k][j]){
                          // 如果没有障碍物的话，就可以产生移动
                          // move
                          showMoveAnimation( i, j, k, j );
                          board[k][j] = board[i][j];
                          board[i][j] = 0;

                          continue;
                      }
                      else if( board[k][j] == board[i][j] && noBlockVertical( j, i, k, board )){
                          // 有障碍物，但障碍物k与j相同，则产生叠加
                          // move
                          // add
                          showMoveAnimation( i, j, k, j );
                          board[k][j] *= 2;
                          board[i][j] = 0;
                          score += board[k][j];
                          updateScore(score);

                          hasConflicted[k][j] = true;
                          continue;
                      }
                  }
              }
          }
      

      setTimeout("updateBoardView()",200) ; //等待200ms等动画效果再每次进行一次刷新
      return true;
 
}