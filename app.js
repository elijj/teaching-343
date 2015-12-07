var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

    var PhaserGame = function () {

        this.player = null;
        this.platforms = null;
        this.jumpTimer = 0;
        this.wasStanding = false;
        this.cursors = null;

    };

    PhaserGame.prototype = {

        init: function () {

            this.world.resize(640, 2000);

            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.physics.arcade.gravity.y = 750;
            this.physics.arcade.skipQuadTree = false;

        },

        preload: function () {

            //  We need this because the assets are on Amazon S3 cloud service owned by Phaser
            this.load.image('trees', 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue003/assets/trees.png');
            this.load.image('clouds', 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue003/assets/clouds.png');
            this.load.image('platform', 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue003/assets/platform.png');
            this.load.image('ice-platform', 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue003/assets/ice-platform.png');
            
            // This is where you load your own sprite's image
            this.load.image('dude', 'http://s11.postimg.org/qxn5gchjz/hatdude.png');

        },

        create: function () {

            this.stage.backgroundColor = '#2f9acc';

            this.add.sprite(0, 1906, 'trees');

            this.platforms = this.add.physicsGroup();

            var x = 0;
            var y = 64;

            for (var i = 0; i < 19; i++)
            {
                var type = i % 2 === 1 ? 'platform' : 'ice-platform';
                var platform = this.platforms.create(x, y, type);

                //  Set a random speed between 100 and 150
                platform.body.velocity.x = this.rnd.between(100, 150);

                //  Inverse it?
                if (Math.random() > 0.5)
                {
                    platform.body.velocity.x *= -1;
                }

                x += 200;

                if (x >= 600)
                {
                    x = 0;
                }

                y+= 104;
            }

            this.platforms.setAll('body.allowGravity', false);
            this.platforms.setAll('body.immovable', true);

            this.player = this.add.sprite(320, 1960, 'dude');

            this.physics.arcade.enable(this.player);

            this.player.body.collideWorldBounds = true;

            this.camera.follow(this.player);

            this.cursors = this.input.keyboard.createCursorKeys();

        },

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

        setFriction: function (player, platform) {

            if (platform.key === 'ice-platform')
            {
                player.body.x -= platform.body.x - platform.body.prev.x;
            }

        },

        update: function () {

            this.platforms.forEach(this.wrapPlatform, this);

            // collision check 
            this.physics.arcade.collide(this.player, this.platforms, this.setFriction, null, this);

            //  do this AFTER the collide check, or we won't have blocked/touching set
            var standing = this.player.body.blocked.down || this.player.body.touching.down;

            this.player.body.velocity.x = 0;

            if (this.cursors.left.isDown)
            {
                this.player.body.velocity.x = -200;

            }
            else if (this.cursors.right.isDown)
            {
                this.player.body.velocity.x = 200;
            }
           
            //  Allowed to jump?
            if ((standing) && this.cursors.up.isDown && this.time.time > this.jumpTimer)
            {
                this.player.body.velocity.y = -500;
                this.jumpTimer = this.time.time + 750;
            }

            // reset standing boolean
            this.wasStanding = standing;

        }

    };

    game.state.add('Game', PhaserGame, true);