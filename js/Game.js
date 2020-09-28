class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var pcRef = await database.ref('playerCount').once("value")
      if(pcRef.exists()){
        playerCount = pcRef.val()
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide()
    textSize(30)
    text("Game starts",120,100)
    Player.getPlayerInfo()
    if(allPlayers !== undefined){
      var yPos = 130
      for(var plr in allPlayers){
        yPos = yPos+20
        if(plr === "player" + player.index){
          fill("red")
        }
        else{
          fill("black")
        }
        textSize(15)
        text(allPlayers[plr].name+":"+allPlayers[plr].distance,120,yPos)
      }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance = player.distance + 50
      player.update() 
    }
  }
}
