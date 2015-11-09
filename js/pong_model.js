var COLS = 20, ROWS = 10;

var interval;

/* player positions (they can move alongside y) */
var player1_x, player1_y;
var player2_x, player2_y;

/* Variables to keep track if somebody won*/
var player1_win,player2_win;

/* The actual score */
var win_count_1 = 0, win_count_2 = 0;

/* Position and velocity vector of the ball*/
var ball_x,ball_y;
var ball_velo_x, ball_velo_y;

/*  
 * Half the player size because we will render from 
 * -half_size to half_size (length = actual size)
 */
var half_player_size = 1;

function Awake() 
{
    /* Init players positions and the win conditions */
    player1_y = player2_y = ROWS/2;
    player1_x = 1;
    player2_x = COLS - 2;

    player1_win = player2_win = false;

    /*The ball starts from the middle going to a random direction*/
    ball_y = ROWS/2;
    ball_x = COLS/2;

    ball_velo_x = (Math.random() > 0.5) ? -1 : 1;
    ball_velo_y = (Math.random() > 0.5) ? -1 : 1;
}

/* Move the ball */
function Update() 
{
    if(CheckCollisions())
    {
        ball_x += ball_velo_x;
        ball_y += ball_velo_y;
    }
    else if(player1_win | player2_win)
    {
        if(player1_win) win_count_1++;
        else            win_count_2++;
        newGame();
        return false;
    }
}

/* Check if the ball will collide with either a player or a wall */
function CheckCollisions()
{
    /* Right wall collision = player 1 wins */
    if(ball_x + ball_velo_x >= COLS)
    {
        player1_win = true;
        return false;
    }
    /* Left wall collision = player 2 wins */
    else if(ball_x + ball_velo_x <= 0)
    {
        player2_win = true;
        return false;
    }
    /* Ball-Player collision = invert the x coord of velocity */
    else if((ball_x + ball_velo_x == player1_x && 
            Math.abs(ball_y + ball_velo_y - player1_y) <= half_player_size) ||
            (ball_x + ball_velo_x == player2_x && 
            Math.abs(ball_y +ball_velo_y - player2_y) <= half_player_size))
    {
        ball_velo_x = -ball_velo_x;
        document.getElementById( 'pong_sound' ).play();
        return false;
    }
    /* Horizontal Wall Collision = invert the y coord of velocity */
    else if(ball_y + ball_velo_y >= ROWS || ball_y + ball_velo_y < 0)
    {
        ball_velo_y = -ball_velo_y;
        return false;        
    }
    /* No collisions */
    else
    {
        return true;
    }
}

function keyPress( key ) 
{
    switch ( key ) 
    {
        case 'down1':
            if ( player1_y + half_player_size < ROWS - 1) 
            {
                player1_y++;
            }
            break;
        case 'up1':
            if ( player1_y - half_player_size > 0) 
            {
                player1_y--;
            }
            break;
        case 'down2':
            if ( player2_y + half_player_size < ROWS - 1) 
            {
                player2_y++;
            }
            break;
        case 'up2':
            if ( player2_y - half_player_size > 0) 
            {
                player2_y--;
            }
            break;
    }
    render();
}

function newGame() {
    clearInterval(interval);
    Awake();
    interval = setInterval( Update, 100 );
}

newGame();
