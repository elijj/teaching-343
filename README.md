#PHASER.js

Final game: http://embed.plnkr.co/rf3W5naSlvpVkgpgvz9E/

#What is Phaser?

"Phaser is an HTML5 game framework which aims to help developers make powerful, cross-browser HTML5 games really quickly and, unlike some others, has solely been built to work with the mobile browsers. The only browser requirement is the support of the canvas tag. It also borrows a lot from Flixel." -http://phaser.io/

#Requirements

bower install phaser

npm install phaser

src="https://cdnjs.cloudflare.com/ajax/libs/phaser/2.4.4/phaser.min.js"


#Phaser 2.4.4 API Documentation 

http://phaser.io/docs/2.4.4/index

#Git Hub

https://github.com/photonstorm/phaser

#Part I : init , preload, create

http://plnkr.co/edit/3pis2U4ymA3tRmFnvJxX

#init

inti function is for setting the attributes for our game's world

#preload

preload is for preloading assets that will be used for the game artwork
- the assets being used for this tutorial were provided by examples from Phaser's website

#try adding your own sprite

Create a sprite at: http://www.piskelapp.com/

Save PNG file and upload to image hosting site: http://postimage.org/

load sprite into the game! 
  // place this code in the preload section
  this.load.spritesheet('dude', 'http://s11.postimg.org/qxn5gchjz/hatdude.png');

#create and update

establishes the game so that it can run and step through dynamically

#Part II : wrap the platforms

http://plnkr.co/edit/naSBqaLDUbAlQijINeC3

create wrapPlatform function

// this function makes the platforms appear to be wrapping through the game's world

wrapPlatform: function (platform) {

            if (platform.body.velocity.x < 0 && platform.x <= -160)
            {
                platform.x = 640;
            }
            else if (platform.body.velocity.x > 0 && platform.x >= 640)
            {
                platform.x = -160;
            }
    
        },
        
// the following code is used in the update section to dynamically change the properties of the platforms
  
  this.platforms.forEach(this.wrapPlatform, this);

#Part III : add ice platform

http://plnkr.co/edit/L4LisbvqbzXJu39cP5Ne

Here we will add a new ice platform to the game to change the player's movement on the platforms.

First, we need to add the ice platforms to the game. 

// add the following in the for-loop under the create function to add the ice platforms
    var type = i % 2 === 1 ? 'platform' : 'ice-platform';
    var platform = this.platforms.create(x, y, type); 
    
Now that we have the ice platforms, we want to change their friction properties by creating a collision callback function.

// add the following function underneath wrapPlatform
setFriction: function (player, platform) {

            if (platform.key === 'ice-platform')
            {
                player.body.x -= platform.body.x - platform.body.prev.x;
            }

        },
        
// add setFriction to the collide callback in the update section
    this.physics.arcade.collide(this.player, this.platforms, this.setFriction, null, this);






#Conclusion : 
This example of the use of phaser does not work well on mobile devices. Possible solutions to implementing a touch screen game by setting the cursors to be based off 

#Saving games you create

http://www.thebotanistgame.com/blog/2015/08/12/saving-loading-game-state-phaserjs.html
