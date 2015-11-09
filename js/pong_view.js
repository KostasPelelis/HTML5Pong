var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var W = 1000, H = 500;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;

/* Draw a square at x,y */
function drawBlock( x, y ) 
{
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
}

/* Draw text at x,y */
function drawText(x,y,text)
{
    ctx.fillText(text, BLOCK_W * x, BLOCK_H * y);
}

/* Dummy way of drawing all the squares */
function render() 
{
    ctx.clearRect( 0, 0, W, H );

    /* Draw the players */
    for(var ps = -half_player_size; ps <= half_player_size; ps++)
    {
        ctx.fillStyle = 'red';
        drawBlock(player1_x,player1_y + ps);
        ctx.fillStyle = 'green';
        drawBlock(player2_x,player2_y + ps);
    }

    /* Draw the ball */
    ctx.fillStyle = 'yellow';
    drawBlock(ball_x,ball_y);

    /* Draw the score */
    ctx.font = "20px Georgia";
    ctx.fillStyle = 'black'
    drawText(2,1,"Player 1 : " + win_count_1);
    drawText(COLS - 6,1,"Player 2 : " + win_count_2);

}

setInterval( render, 50 );
