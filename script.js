window.addEventListener('load', () => {

    const ctx = canvas1.getContext('2d');
    canvas1.width = 800
    canvas1.height = 720
    let enemies = []
    class InputHandler {
        constructor() {
            this.keys = []
            window.addEventListener('keydown', (e) => {
                if ((e.key == 'ArrowDown' ||
                    e.key == 'ArrowUp' ||
                    e.key == 'ArrowLeft' ||
                    e.key == 'ArrowRight'
                ) && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key)
                }
            })

            window.addEventListener('keyup', e => {
                if (e.key == 'ArrowDown' ||
                    e.key == 'ArrowUp' ||
                    e.key == 'ArrowLeft' ||
                    e.key == 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            })
        }
    }

    class Player {
        constructor(gameHeight, gameWidth) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = playerImage
            this.frameX = 0
            this.frameY = 0
            this.speedX = 0
            this.speedY = 0
            this.weight = 1
        }
        draw(context) {


            context.fillStyle = 'white'
            context.fillRect(this.x, this.y, this.height, this.width);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.height, this.width);



        }
        update(input) {
            // console.log(input.keys)

            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speedX = 5
            }
            else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speedX = -5
            }
            else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.speedY = -32
            }
            else {
                this.speedX = 0
                // this.speedY = 0
            }


            // horizontal movement
            this.x += this.speedX
            // horizontal boundries 
            if (this.x < 0) this.x = 0
            if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

            // vertical movement
            this.y += this.speedY
            if (!this.onGround()) {
                this.speedY += this.weight
                this.frameY = 1
            }
            else {
                this.speedY = 0
                this.frameY = 0
            }
            if (this.y >= this.gameHeight - this.height) this.y = this.gameHeight - this.height
        }
        onGround() {
            return this.y >= this.gameHeight - this.height

        }
    }

    class Background {
        constructor(gameHeight, gameWidth) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.image = backgroundImage
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 7
        }

        draw(context) {
            // console.log(this)  
            context.drawImage(this.image, this.x, this.y)
            context.drawImage(this.image, this.x + this.width - this.speed, this.y)
        }
        update() {
            this.x -= this.speed
            if (this.x < 0 - this.width) this.x = 0
        }
    }


    class Enemy {
        constructor(gameHeight, gameWidth) {
            this.gameHeight = gameHeight;
            this.gameWidth = gameWidth;
            this.width = 160
            this.height = 119
            this.image = enemyImage;
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0
            this.speed = 8
        }
        draw(context) {
            context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
        }
        update() {
            this.x -= this.speed
        }

    }



    let enemyTimer = 0
    let enemyInterval = 1000
    function handleEnemies(deltaTime) {

        if (enemyTimer > enemyInterval) {
            enemies.push(new Enemy(canvas1.height, canvas1.width))
            enemyTimer = 0
        }
        else {
            enemyTimer += deltaTime
        }

        enemies.forEach(enemy => {
            enemy.draw(ctx)
            enemy.update()
        })
    }

    function displayStatusText() {

    }


    try {


        const input = new InputHandler()
        const background = new Background(canvas1.height, canvas1.width)
        const player = new Player(canvas1.height, canvas1.width)
        // const enemy1 = new Enemy(canvas1.height, canvas1.width)



        let lastTime = 0
        function animate(timestamp) {
            const deltaTime = timestamp - lastTime
            lastTime = timestamp
            ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
            background.update()
            player.update(input)
            background.draw(ctx)
            player.draw(ctx)
            handleEnemies(deltaTime)
            // background.draw(ctx)

            requestAnimationFrame(animate)
        }

        animate(0)
    } catch (error) {
        console.log(error)
    }

})