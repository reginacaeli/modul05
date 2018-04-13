var score, roundScore, activePlayer, gamePlaying, counter = 0;

init();

document.querySelector('.btn-roll').addEventListener('click', function()
{   
    if(gamePlaying)
    {
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
			
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
			
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
    
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';
    
		
		var simpan = document.createTextNode("[" + dice2 + "," + dice + "] ");
		document.getElementById('History').appendChild(simpan);
		
        if (dice !==1 && dice2 !== 1)
        {
            roundScore += dice + dice2;
            
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
			
					
			if(dice===6 || dice2 === 6)
			{
				counter += 1;
				if(counter === 2)
				{
					window.alert("Player " + (activePlayer+1) + " Mendapatkan Dadu Angka '6'\n\n 2 Kali Berturut turut\n\n Semua Point Hilang!!\n\nGanti Player Selanjutnya");
					scores[activePlayer] = 0;
					document.querySelector('#score-' + activePlayer).textContent = 0;
					nextPlayer();
				}
			}
			else
			{
				counter = 0;
			}
        }
        else
        {
			window.alert("Player " + (activePlayer+1) + " Mendapatkan Dadu Angka '1'\n\nGanti Player Selanjutnya");
			counter = 0;
			nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function()
{    
    if(gamePlaying)
    {
		scores[activePlayer] += roundScore;
    
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var skor_akhir = document.querySelector('.final_score').value;
		var final_score;
	
		if(skor_akhir)
		{
			final_score = skor_akhir;
		}
		else
		{
			final_score = 100;
		}
        if (scores[activePlayer] >= final_score)
        {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
            gamePlaying = false;
        }
        else
        {
			nextPlayer();
        }
    }
});

function nextPlayer()
{   
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
	counter = 0;
	
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
	document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

	document.getElementById('History').textContent = '';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    document.querySelector('.player-0-panel').classList.add('active');
}