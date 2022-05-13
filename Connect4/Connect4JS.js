var board = new Array(6).fill("").map(() => new Array(7).fill(""));
var p1Turn = true;
var p1Win = 0;
var p2Win = 0;

function clicked(obj, row, col) {
	var source = "yellowChip.png";
	var colour = "yellow";
	var row = 5;
	var done = false;
	
	if(p1Turn == true) {
		source = "redChip.png";
		colour = "red";
	}
	//checks to see where the first open white space is to place the marker
	while(!done) {
		//if row is greater than 0, end the loop
		if(row < 0) {
			done = true;
		}
		else {
			//if the specific row + column are blank, enter the if statement
			if(board[row][col] == "") {
				//define the object as the row and column of the blank space
				obj = document.getElementById("box_r" + row + "c" + col);
				obj.src = source;
				//place the definition of the colour into the array space
				board[row][col] = colour;
				p1Turn = !p1Turn;
				//exit the loop
			 	done = true;
			}
			//if the if statement is false, decrease the row
			row--;
		}	
	}
	checkForWinner(colour);
}

function checkForWinner(colour) {
	
	var p1Sucess = document.getElementById("p1Wins");
	var p2Sucess = document.getElementById("p2Wins");
	//check if there is four of the same colour in the area
	//for loops meant for horizontal, vertical, and forward diagonal
	for(var i = 0; i < board.length; i++) {
		for(var j = 0; j < board[0].length; j++) {
			//horizontal, with an if statement that checks if the column is less than four before entering the if statement
			if(j < 4) {
				//checks to see that if, from the current position, as the column increases, that the next three placements are all the same colour
				if(board[i][j] == colour && board[i][j + 1] == colour && board[i][j + 2] == colour && board[i][j + 3] == colour) {
					if(colour == "red") {
						p1Win++;
						p1Sucess.innerHTML = "P1 Wins: " + p1Win;
						winnerTrue();
						break;
					}
					else {
						p2Win++;
						p2Sucess.innerHTML = "P2 Wins: " + p2Win;
						winnerTrue();
						break;
					}
				}
			} 
			//vertical, with if statement that checks if the column is less than three before it enters the if statement
			if(i < 3) {
				//checks to see that if, from the current position as the row increases that the next three placements are the same colour
				if(board[i][j] == colour && board[i + 1][j] == colour && board[i + 2][j] == colour && board[i + 3][j] == colour) {
					if(colour == "red") {
						p1Win++;
						p1Sucess.innerHTML = "P1 Wins: " + p1Win;
						winnerTrue();
						break;
					}
					else {
						p2Win++;
						p2Sucess.innerHTML = "P2 Wins: " + p2Win;
						winnerTrue();
						break;
					}
				}
			}
			//forwards diagonal, with an if statement that checks that the row is less than 3 and the column is less than four before it enters the if statement
			if(i < 3 && j < 4) {
				//as both the row and colummn increase, check for the next three placements being the same colour
				if(board[i][j] == colour && board[i + 1][j + 1] == colour && board[i + 2][j + 2] == colour && board[i + 3][j + 3] == colour) {
					if(colour == "red") {
						p1Win++;
						p1Sucess.innerHTML = "P1 Wins: " + p1Win;
						winnerTrue();
						break;
					}
					else {
						p2Win++;
						p2Sucess.innerHTML = "P2 Wins: " + p2Win;
						winnerTrue();
						break;
					}
				}
			}  
		}
	}
	//new for loops for backwards diagonal, because second for loop goes backwards
	for(var i = 0; i < board.length; i++) {
		for(var j = board[0].length - 1; j > 0; j--) {
			//backwords diagonal, if statement making sure that the row is less than three, and the column is greater than 2 before it enters the if statement
			if( i < 3 && j > 2) {
				//as both the row + column decrease, check for the next three placements that they're the same colour
				if(board[i][j] == colour && board[i + 1][j - 1] == colour && board[i + 2][j - 2] == colour && board[i + 3][j - 3] == colour) {
					if(colour == "red") {
						p1Win++;
						p1Sucess.innerHTML = "P1 Wins: " + p1Win;
						winnerTrue();
						break;
					}
					else {
						p2Win++;
						p2Sucess.innerHTML = "P2 Wins: " + p2Win;
						winnerTrue();
						break; 
					}
				}
			} 
		}
	}
	
}

//when there is a defined winner, enter this function, go through the entire board and disable all of the open spaces, as the game has ended
function winnerTrue() {
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[0].length; j++) {
      name = "box_r" + i + "c" + j;

      document.getElementById(name).disabled = true;
    }
  }

}


//when the reset button is clicked, go through the entireity of the board, replace all chips with a blank slot, and then empty the array by redefining the board as a new array
//resets the player turns, so that p1 will start again.
function reset() {
	var name;

	for(var i = 0; i < board.length; i++) {
		for(var j = 0; j < board[0].length; j++) {
			name = "box_r" + i + "c" + j;
			document.getElementById(name).src = "whiteSquare.jpg";
			document.getElementById(name).disabled = false;
		}
	}
	board = new Array(6).fill("").map(() => new Array(7).fill(""));
	p1Turn = true;
}
