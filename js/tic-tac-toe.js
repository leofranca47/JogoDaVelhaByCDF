const tic_tac_toe = {
    board: ['','','','','','','','',''],
    symbols: {
      options: ['X',"O"],
      turn_index: 0,
      change: function(){
          this.turn_index = (this.turn_index === 0 ? 1:0)
      }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container){
        this.container_element = container
    },

    make_play: function(position){
        if(this.gameover) return false
        if(this.board[position] == ''){
            this.board[position] = this.symbols.options [ this.symbols.turn_index ]
            this.draw()
            let winnig_sequence_index = this.check_winning_sequences(this.symbols.options [ this.symbols.turn_index ])
            if(winnig_sequence_index >= 0 ){
                this.game_is_over();
                this.stylize_winner_sequence(this.winning_sequences[winnig_sequence_index])
                alert(`O jogo acabou!`)
                
            } else if(!this.board.includes('')){
                this.game_is_over();
                alert(`Deu VELHA, jogo empatado!`)
            }else{
            this.symbols.change();
            }
            return true
        } else{
            return false
        }
    },

    stylize_winner_sequence(winning_sequences){
        winning_sequences.forEach((position) => {
            this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner')
            
        })
        
    },

    game_is_over: function(){
        this.gameover = true
        console.log("GAME OVER")
    },

    start: function(){
        this.board.fill('')
        this.draw()
        this.gameover = false;
    },

    check_winning_sequences: function(symbols){
        for(i in this.winning_sequences){
            if(this.board[this.winning_sequences[i][0]] == symbols &&
                this.board[this.winning_sequences[i][1]] == symbols &&
                this.board[this.winning_sequences[i][2]] == symbols){
                    console.log('Sequencia vencedora: '+ i)
                    return i
                    
                }
        }
        return -1;
    },

    draw: function(){
        let content = ''

        for(i in this.board){
            content += '<div onclick="tic_tac_toe.make_play('+i+')">'+this.board[i]+'</div>'
        }

        this.container_element.innerHTML = content
    }

}