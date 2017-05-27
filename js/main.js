/**
 * Created by user_kevin on 17/5/27.
 */
var game = new Phaser.Game(800, 600, Phaser.CANVAS, "game");
game.States = {};
game.States.boot = function () {
    /** 加载loading 图 */
    this.preload = function () {
        game.load.image("loading", "res/preloader.gif");
    };
    this.create = function () {
        game.state.start("preload");
    }
};
game.States.preload = function () {
    this.preload = function () {
        /** 加载资源的时候下创建资源加载进度条 */
        var preloadLoading = game.add.sprite(game.width / 2 - 220 / 2, game.height - 80, 'loading');
        game.load.setPreloadSprite(preloadLoading);
        game.load.image('bg', 'res/bg.jpg');
        game.load.image('sprite', 'res/sprite.jpg');
        game.load.onFileComplete.add(function (progress) {
            if (progress === 100) {
                console.log('加载完成');
            }
        })
    };
    this.create = function () {
        game.state.start('start');
    };
};
game.States.start = function () {
    var directionWithChange;
    var move;
    var card;
    this.create = function () {
        // game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 1920, 1200);
        var bg = game.add.sprite(0, 0, 'bg');
        card = game.add.sprite(0, game.height / 2 - 128 / 2, 'sprite');
        directionWithChange = game.input.keyboard.createCursorKeys();
        game.input.onDown.add(this.ObjectWithTouch, this);
        game.physics.arcade.enable(card);
        card.body.collideWorldBounds = true;//保证小人不掉出屏幕外
        setInterval(function () {
            card.x+=4;
        },10);
        //屏幕跟随卡片的移动
        game.camera.follow(card);
    };
    this.ObjectWithTouch = function () {
        move = (move === 0) ? move = 1 : move = 0;
    };
    this.update = function () {
        if (move === 0) {
            if (directionWithChange.up.isDown) {
                game.camera.y -= 4;
            } else if (directionWithChange.down.isDown) {
                game.camera.y += 4;
            } else if (directionWithChange.left.isDown) {
                game.camera.x -= 4;
            } else if (directionWithChange.right.isDown) {
                game.camera.x += 4;
            }
        } else {
            if (directionWithChange.up.isDown) {
                card.y -= 4;
            } else if (directionWithChange.down.isDown) {
                card.y += 4;
            } else if (directionWithChange.left.isDown) {
                card.x -= 4;
            } else if (directionWithChange.right.isDown) {
                card.x += 4;
            }
        }
    };
};
game.state.add("boot", game.States.boot);
game.state.add("preload", game.States.preload);
game.state.add("start", game.States.start);
game.state.start("boot");