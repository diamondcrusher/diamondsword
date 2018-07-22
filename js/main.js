/*global window, GameData */
var canvasWidth = 900;
var canvasHeight = 600;

function Point(x, y) {
	this.x = x;
	this.y = y;
	this.equals = function(other) {
		return this.x === other.x && this.y === other.y;
	};
	this.clone = function(source) {
		return new Point(this.x, this.y);
	};
	this.offsetTo = function(destinationPoint) {
		return new Point(destinationPoint.x - this.x, destinationPoint.y
				- this.y);
	};
	this.subtractOffset = function(offset) {
		return new Point(this.x - offset.x, this.y - offset.y);
	};
	this.addOffset = function(offset) {
		return new Point(this.x + offset.x, this.y + offset.y);
	};
	this.randomOffset = function(offset) {
		return new Point(Math.floor(this.x - offset.x / 2 + Math.random() * offset.x),
				Math.floor(this.y - offset.y / 2 + Math.random() * offset.y));
	};
	this.withinBox = function(box) {
		return this.x >= box.topLeft.x
				&& this.x < box.topLeft.x + box.dimensions.x
				&& this.y >= box.topLeft.y
				&& this.y < box.topLeft.y + box.dimensions.y;
	};
	this.withinBoxPoints = function(topLeft, boxDimensions) {
		return this.x >= topLeft.x && this.x < topLeft.x + boxDimensions.x
				&& this.y >= topLeft.y && this.y < topLeft.y + boxDimensions.y;
	};
	this.withinBoxPointsAbsolute = function(topLeft, bottomRight) {
		return this.x >= topLeft.x && this.x <= bottomRight.x
				&& this.y >= topLeft.y && this.y <= bottomRight.y;
	};
	this.distanceFrom = function(otherPoint) {
		return Math.sqrt(Math.pow(this.x - otherPoint.x, 2)
				+ Math.pow(this.y - otherPoint.y, 2));
	};
	this.angleTo = function(otherPoint) {
		return Math.atan2(this.y - otherPoint.y, this.x - otherPoint.x);
	};
}

function Box(topLeft, dimensions) {
	this.topLeft = topLeft;
	this.dimensions = dimensions;

	this.shrinkBy = function(shrinkDimensions) {
		return new Box(topLeft, dimensions.subtractOffset(shrinkDimensions));
	};
	
	this.getCentre = function() {
		return new Point(this.topLeft.x + (this.dimensions.x / 2), this.topLeft.y + (this.dimensions.y / 2));
	};
}

function Timer(period) {
	this.period = period;
	this.counter = 0;
	
	this.hasFired = function (increment) {
		this.counter += increment;
		if ( this.counter >= this.period ) {
			this.counter = 0;
			return true;
		} else {
			return false;
		}
	};
	
	this.reset = function() {
		this.counter = 0;
	};
}

function AnimationFrame(imageName, duration, xMovement, yMovement, xOffset, yOffset) {
	this.duration = duration;
	this.xMovement = xMovement;
	this.yMovement = yMovement;
	this.xOffset = xOffset;
	this.yOffset = yOffset;
	
	this.image = new Image();
	this.image.src = imageName;
}

function AnimationType(frames) {
	this.frames = frames;
	
	this.getImage = function(index) {
		return this.frames[index].image;
	};
}

function AnimationFrameDirectional(imageName, angleMin) {
	this.angleMin = angleMin;
	
	this.image = new Image();
	this.image.src = imageName;
}

function AnimationTypeDirectional(frames) {
	this.frames = frames;
	
	this.getImage = function(angle) {
		var i;
		var selected;
		
		selected = 0;
		for (i = 0; i < frames.length; i++) {
			if ( angle > frames[i].angleMin ) {
				selected = i;
			}
		}
		
		return selected;
	};
}

function UnitType(team, endsLevel, moveAnimationType, attackAnimationType, firingAnimationType, dyingAnimationType, attackRange, attackDamageFrame, attackDamage, cost, velocity, vitality, bounty) {
	this.team = team;
	this.endsLevel = endsLevel;
	this.moveAnimationType = moveAnimationType;
	this.attackAnimationType = attackAnimationType;
	this.firingAnimationType = firingAnimationType;
	this.dyingAnimationType = dyingAnimationType;
	this.attackRange = attackRange;
	this.attackDamageFrame = attackDamageFrame;
	this.attackDamage = attackDamage;
	this.cost = cost;
	this.velocity = velocity;
	this.initialVitality = vitality;
	this.bounty = bounty;
}

UnitType.Team = {
		GOOD : 0,
		ENEMY : 1
};

function EnemySpawn(spawnTime, enemyType) {
	this.time = spawnTime;
	this.enemyType = enemyType;
}

function Level(goodMonument, enemyMonument, spawner) {
	this.goodMonument = goodMonument;
	this.enemyMonument = enemyMonument;
	this.spawner = spawner;
}

function Animation(type) {
	this.type = type;
	this.frame = 0;
	this.timer = 0;
	this.cycleCount = 0;

	this.update = function(elapsedTime, position) {
		if (this.type.frames.length > 1) {
			this.timer += elapsedTime;

			if (this.timer > this.type.frames[this.frame].duration) {
				position.x += this.type.frames[this.frame].xMovement;
				position.y += this.type.frames[this.frame].yMovement;
				//this.frame = (this.frame + 1) % this.type.frames.length;
				this.frame += 1;
				if ( this.frame >= this.type.frames.length ) {
					this.frame = 0;
					this.cycleCount += 1;
					this.timer = 0;
					return false;
				}
				this.timer = 0;
			}
		}
		return true;
	};

	this.currentImage = function() {
		return this.type.frames[this.frame].image;
	};
	
	this.xDistance = function(elapsedTime) {
		return this.type.frames[this.frame].xMovement * elapsedTime / this.type.frames[this.frame].duration; 
	};

	this.yDistance = function(elapsedTime) {
		return this.type.frames[this.frame].yMovement * elapsedTime / this.type.frames[this.frame].duration; 
	};
	
	this.xOffset = function() {
		return this.type.frames[this.frame].xOffset;
	};

	this.yOffset = function() {
		return this.type.frames[this.frame].yOffset;
	};
	
}

function Background(imageName) {
	//this.imageName = imageName;
	
	this.image = new Image();
	this.image.src = imageName;
	
	this.render = function(ctx) {
		ctx.drawImage(this.image, 0, 0);
	};
}

function SpatialObject(game, position, movement) {
	this.game = game;
	this.position = position;
	this.movement = movement;
	this.previousPosition = position;
	this.isFinished = false;

	this.objectUpdate = function() {

		// Animation
		if ( this.animation !== null ) {
			this.animation.update(this.game.frameInterval, position);
			if ( ! this.position.withinBox(game.boundary) ) {
				this.isFinished = true;
			}
		}

		// Movement
		if ( this.movement !== null ) {
			this.previousPosition = position;
			this.movement.move(position, this.game.frameInterval);
		}
	};
	
	this.getLeft = function() {
		return this.position.x;
	};

	this.getRight = function() {
		return this.position.x + this.animation.currentImage().width;
	};
	
	this.getTop = function() {
		return this.position.y;
	};
	
	this.getBottom = function() {
		return this.position.y + this.animation.currentImage().height;
	};
	
	this.collidesWith = function(other) {
		if ( this.getLeft() < other.getRight() && this.getRight() > other.getLeft() &&
				this.getTop() < other.getBottom() && this.getBottom() > other.getTop() ) {
			return true;
		} else {
			return false;
		}
	};
	
	this.hasFinished = function() {
		return this.isFinished;
	};
	
	this.draw = function(ctx) {
		ctx.drawImage(this.animation.currentImage(),
				this.getLeft() + this.animation.xOffset(),
				this.getTop() - this.animation.currentImage().height + this.animation.yOffset());		
	};
}


function Unit(game, type, direction) {
	this.game = game;
	this.type = type;
	this.direction = direction;
	this.vitality = this.type.initialVitality;
	this.attackPartner = null;
	//this.firingVelocity = Math.sqrt(this.type.attackRange * this.game.gravity);
	this.firingVelocity = 1;
	this.inflictDamage = true;

	this.update = function() {
		this.objectUpdate();
		if ( this.state == Unit.States.ATTACKING ) {
			if ( this.animation.frame == this.type.attackDamageFrame && this.inflictDamage ) {
				this.inflictDamage = false;
				if ( this.type.firingAnimationType != null ) {
					angle = this.calculateFiringAngle();
					game.goodFiring.push(Firing.create(this.game, this.type.firingAnimationType, this.position, Math.sin(angle) * this.firingVelocity, Math.cos(angle) * this.firingVelocity));
				} else {
					this.attackPartner.vitality -= this.type.attackDamage;
					if ( this.attackPartner.vitality <= 0 ) {
						this.attackPartner.die();
						this.attackPartner = null;
						//this.startAdvancing();
					}
				}
			}
			if ( this.animation.cycleCount > 0 ) {
				this.startAdvancing();
			}
		}
	};
	
	this.startAdvancing = function() {
		this.animation = new Animation(this.type.moveAnimationType);
		this.attackPartner = null;
		this.inflictDamage = true;
		this.state = Unit.States.ADVANCING;
	};
	
	this.startAttacking = function(attackPartner) {
		if ( this.canAttack() ) {
			this.animation = new Animation(this.type.attackAnimationType);
			this.attackPartner = attackPartner;
			this.state = Unit.States.ATTACKING;
		}
	};
	
	this.canAttack = function() {
		return this.type.attackAnimationType != null;
	};
	
	this.getFront = function() {
		if ( this.direction == Unit.Direction.RIGHT ) {
			return this.getRight();
		} else {
			return this.getLeft();
		}
	};
	
	this.distanceTo = function(other) {
		return other.getFront() - this.getFront();
	};
	
	this.inAttackRangeOf = function(other) {
		if ( Math.abs(this.distanceTo(other)) <= this.type.attackRange ) {
			return true;
		} else {
			return false;
		}
	};
	
	this.calculateFiringAngle = function() {
		var angle;
		
		if ( this.attackPartner == null ) {
			return;
		}
		angle = this.distanceTo(this.attackPartner) * this.game.gravity / ( this.firingVelocity * this.firingVelocity);
		angle = Math.asin(angle) / 2;
		return angle;
	};
	
	this.hit = function(firing) {
		this.vitality -= firing.damage;
		if ( vitality <= 0 ) {
			this.die();
		}
	};
	
	this.die = function() {
		if ( ! this.isFinished ) {
			if ( this.type.dyingAnimationType != null ) {
				this.game.addEffect(this.type.dyingAnimationType, this.position);
			}
			if ( this.type.team == UnitType.Team.ENEMY ) {
				this.game.money += this.type.bounty;
				if ( this.type.endsLevel ) {
					this.game.endLevel();
				}
			}
			this.isFinished = true;
		}
	};
	
	this.startAdvancing();

}

Unit.States = {
		ADVANCING : 0,
		ATTACKING : 1
};

Unit.Direction = {
	RIGHT : 1,
	LEFT : -1
};

Unit.create = function(game, unitType, position) {
	spatial = new SpatialObject(game, position.clone().randomOffset(game.randomOffset), null);
	Unit.prototype = spatial;
	Unit.prototype.constructor = Unit;
	if ( unitType.team == UnitType.Team.GOOD ) {
		direction = Unit.Direction.RIGHT;
	} else {
		direction = Unit.Direction.LEFT;
	}
	return new Unit(game, unitType, direction);
};

function Firing(animationType, vx, vy) {
	this.vx = vx;
	this.vy = vy;
	
	this.animation = new Animation(animationType);
	
	this.update = function() {
		this.objectUpdate();
		this.position.x += this.vx * this.game.frameInterval;
		this.position.y += this.vy * this.game.frameInterval;
		this.vy -= this.game.gravity * this.game.frameInterval;
		if ( this.position.y <= this.game.groundLevel && this.vy < 0 ) {
			this.isFinished = true;
		}
	};
	
	this.getAngle = function() {
		return Math.atan(vy / vx);
	};
	
	this.draw = function(ctx) {
		ctx.drawImage(this.animation.currentImage(),
				this.getLeft(),	this.getTop());
	};
}

Firing.create = function(game, animationType, position, vx, vy) {
	spatial = new SpatialObject(game, position.clone(), null);
	Firing.prototype = spatial;
	Firing.prototype.constructor = Firing;
	return new Firing(animationType, vx, vy);
};

function Effect(animationType) {
	this.animation = new Animation(animationType);
	this.update = function() {
		this.objectUpdate();
		if ( this.animation.cycleCount > 0 ) {
			this.isFinished = true;
		}
	};
}

Effect.create = function(game, animationType, position) {
	spatial = new SpatialObject(game, position.clone(), null);
	Effect.prototype = spatial;
	Effect.prototype.constructor = Effect;
	return new Effect(animationType);
};

function GameContext(data) {
	this.data = data;

	this.frameInterval = 50;
	this.gravity = 0;
	this.groundLevel = 50;

	this.state = GameContext.States.STARTLEVEL;
	this.level = 0;
	this.money = 400;
	this.score = 0;
	this.gameLoopID = null;
	this.goodies = [];
	this.enemies = [];
	this.goodFiring = [];
	this.enemyFiring = [];
	this.effects = [];
	this.enemyCounter = 0;
	this.levelTimer = 0;
	
	this.goodSpawnPosition = new Point(0, 300);
	this.enemySpawnPosition = new Point(900, 300);
	this.goodMonumentPosition = new Point(50, 300);
	this.enemyMonumentPosition = new Point(700, 300);
	this.randomOffset = new Point(40, 20);
	this.boundary = new Box(new Point(-100, -100), new Point(1100, 600));
	
	this.startLevel = function() {
		this.goodies.push(Unit.create(this, this.data.goodMonument, this.goodMonumentPosition));
		this.enemies.push(Unit.create(this, this.data.enemyMonument, this.enemyMonumentPosition));
		this.state = GameContext.States.MIDLEVEL;
	};
	
	this.endLevel = function() {
		this.goodies = [];
		this.enemies = [];
		this.enemyCounter = 0;
		this.levelTimer = 0;
		this.level += 1;
		this.startLevel();
	};
	
	this.addEffect = function(animationType, position) {
		this.effects.push(Effect.create(this, animationType, position));
	};
	
	this.progressFrame = function() {
		var i;
		var j;

		if (this.state === GameContext.States.STARTLEVEL) {
			this.startLevel();
		}
		
		else if (this.state === GameContext.States.MIDLEVEL) {
			
			// Increase level timer
			this.levelTimer += this.frameInterval;

			// Spawn any new enemies due
			while (this.enemyCounter < this.data.levels[this.level].spawner.length
					&& this.data.levels[this.level].spawner[this.enemyCounter].time < this.levelTimer) {
				newEnemyType = this.data.levels[this.level].spawner[this.enemyCounter].enemyType;
				this.enemies.push(Unit.create(this, newEnemyType, new Point(this.enemySpawnPosition.x, this.enemySpawnPosition.y)));
				this.enemyCounter++;
			}
			
			// Update game objects
			GameContext.updateArray(this.enemies);
			GameContext.updateArray(this.goodies);			
			GameContext.updateArray(this.effects);
			GameContext.updateArray(this.goodFiring);
			
			// Check for new battles
			for (i = 0; i < this.goodies.length; i++) {
				for (j = 0; j < this.enemies.length; j++) {
					if ( this.goodies[i].inAttackRangeOf(this.enemies[j]) ) {
						if ( this.goodies[i].state != Unit.States.ATTACKING && this.goodies[i].canAttack() ) {
							this.goodies[i].startAttacking(this.enemies[j]);
						}
						if ( this.enemies[j].state != Unit.States.ATTACKING && this.enemies[j].canAttack() ) {
							this.enemies[j].startAttacking(this.goodies[i]);
						}
					}
				}
			}
			
			// Firing collisions with enemies
			for (i = 0; i < this.goodFiring.length; i++) {
				hitEnemyIndex = -1;
				for (j = 0; j < this.enemies.length; j++) {
					if ( this.goodFiring[i].collidesWith(this.enemies[j]) ) {
						hitEnemyIndex = j;
					}
				}
				if ( hitEnemyIndex !== -1 ) {
					this.enemies[hitEnemyIndex].hit(this.goodFiring[i]);
					//this.firing[i].isFinished;
					if (this.goodFiring[i].isFinished) {
						this.goodFiring.splice(i, 1);
						i--;
					}
					if (this.enemies[hitEnemyIndex].isFinished) {
						this.enemies.splice(hitEnemyIndex, 1);
					}
				}
			}
			
		}
	};
}

// Game states
GameContext.States = {
	STARTLEVEL : 0,
	MIDLEVEL : 1,
	ENDLEVEL : 2
};

GameContext.updateArray = function(updateable) {
	var i;
	
	for (i = 0; i < updateable.length; i++) {
		updateable[i].update();
		if (updateable[i].isFinished) {
			updateable.splice(i, 1);
			i--;
		}
	}
};

function KeyHandler(data, game) {
	
	this.handleKey = function(event) {
		unitType = KeyHandler.getUnitTypeFromKey(data, event);
		if ( unitType != null ) {
			if ( game.money >= unitType.cost ) {
				game.goodies.push(Unit.create(game, unitType, game.goodSpawnPosition));
				game.money -= unitType.cost;
			}
		}
		switch (event.keyCode) {
		// Q
		case 81:
			// quit
			clearInterval(game.gameLoopID);
			break;
		}
	};
}

KeyHandler.getUnitTypeFromKey = function(data, event) {
	switch (event.keyCode) {
	// A
	case 65:
		unitType = data.goodArcher;
		break;
	// S
	case 83:
		unitType = data.goodSwordsman;
		break;
	// G
	case 91:
		unitType = data.goodGiant;
		break;
	default:
		unitType = null;
	}
	return unitType;
};


function MouseHandler(layout, data, game) {
	this.game = game;

	//var canvas = document.getElementById("gameCanvas");

	// function getPosition(event) {
	/*
	var getPosition = function(event) {
		return new Point(event.x - canvas.offsetLeft, event.y
				- canvas.offsetTop);
	};
	*/
	
	// this.handleMouseMove = function(event) {
	/*
	var handleMouseMove = function(event) {
		if (game.draggingTower) {
			game.draggingPoint = getPosition(event);
		}
	};
	*/
	
	/*
	this.handleMouseDown = function(event) {
		var mousePos;

		mousePos = getPosition(event);
		if (mousePos.withinBox(layout.playButtonBox)) {
			if (game.state === game.States.STARTLEVEL) {
				game.state = game.States.MIDLEVEL;
			}
		} else {
			for ( var tower = 0; tower < data.towerTypesControl.length; tower++) {
				if (mousePos.withinBox(layout.controlTowerBox[tower])
						&& game.money >= data.towerTypesControl[tower].cost) {
					game.draggingTower = true;
					game.draggingTowerType = data.towerTypesControl[tower];
					game.draggingTowerImage = new Animation(game.draggingTowerType.animationType).currentImage();
					// game.draggingTowerType = tower;
					game.draggingOffset = layout.controlTowerBox[tower].getCentre()
							.offsetTo(mousePos);
					game.draggingPoint = mousePos;
					canvas
							.addEventListener('mousemove', handleMouseMove,
									false);
				}
			}
		}
	};
	*/
	
	/*
	this.handleMouseUp = function(event) {
		var spatial;
		if (game.draggingTower) {
			// Place tower if on track
			if (getPosition(event)
					.subtractOffset(game.draggingOffset)
					.withinBox(layout.trackBox.shrinkBy(layout.towerDimensions))) {
				game.money -= game.draggingTowerType.cost;
				spatial = new SpatialObject(data, game,
						new Animation(game.draggingTowerType.animationType),
						getPosition(event).subtractOffset(game.draggingOffset), null);
				switch(game.draggingTowerType) {
				case data.towerTypes.HUNTER:
					TowerHunter.prototype = spatial;
					TowerHunter.prototype.constructor = TowerHunter;
					game.towers.push(new TowerHunter());
					break;
				case data.towerTypes.DART:
					TowerDart.prototype = spatial;
					TowerDart.prototype.constructor = TowerDart;
					game.towers.push(new TowerDart());
				}
				//game.towers.push(new Tower(data, game, getPosition(event)
				//		.subtractOffset(game.draggingOffset)));
			}
			game.draggingTower = false;
			canvas.removeEventListener('mousemove', handleMouseMove, false);
		}
	};
	*/
}

function Layout(ctx, data) {
	this.ctx = ctx;

	// Text layout
	this.textHeight = 18;
	this.moneyX = 10;
	this.moneyY = 10;
	this.moneyMaxWidth = 200;
	
	ctx.fillStyle = '#00f';
	ctx.font = 'italic ' + this.textHeight + 'px sans-serif';
	ctx.textBaseline = 'top';

}

function Renderer(layout, data, game) {

	this.layout = layout;
	this.data = data;
	this.game = game;

	var ctx = layout.ctx;

	this.render = function() {
		//var i;

		// Progress game one frame
		game.progressFrame();

		// Clear canvas
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		// Draw background
		data.backgrounds[game.level].render(ctx);
		
		// Draw controls
		ctx.fillText('Gems ' + game.money, layout.moneyX, layout.moneyY,
				layout.moneyMaxWidth);
		/*
		ctx.drawImage(data.playButtonImage, layout.playButtonX,
				layout.playButtonY, layout.playButtonWidth,
				layout.playButtonHeight);
		ctx.fillText('Level ' + (game.level + 1), layout.levelX, layout.levelY,
				layout.levelMaxWidth);
		ctx.fillText('Lives ' + game.lives, layout.livesX, layout.livesY,
				layout.livesMaxWidth);
		ctx.fillText('Money ' + game.money, layout.moneyX, layout.moneyY,
				layout.livesMaxWidth);
		ctx.fillText('Score ' + game.score, layout.scoreX, layout.scoreY,
				layout.livesMaxWidth);
		for (i = 0; i < data.towerTypesControl.length; i++) {
			ctx.drawImage(data.towerTypesControl[i].animationType.getImage(0),
					layout.firstControlTowerX, layout.firstControlTowerY
							+ (i * layout.towerWidth), layout.towerWidth,
					layout.towerHeight);
		}
		*/
		
		// Draw firing
		/*
		for (i = 0; i < game.firing.length; i++) {
			ctx.drawImage(game.firing[i].animation.currentImage(),
					game.firing[i].getLeft(),
					game.firing[i].getTop());
		}
		*/
		
		Renderer.drawArray(ctx, game.goodies);
		Renderer.drawArray(ctx, game.enemies);
		Renderer.drawArray(ctx, game.effects);
		Renderer.drawArray(ctx, game.goodFiring);
	};
}

Renderer.drawArray = function(ctx, drawableArray) {
	var i;
	
	for (i = 0; i < drawableArray.length; i++) {
		drawableArray[i].draw(ctx);
	}
};

function startGame() {
	var canvas;
	var ctx;
	var data;
	var game;
	var layout;
	var renderer;
	var keyHandler;
	//var mouseHandler;

	// Get the canvas element
	canvas = document.getElementById("gameCanvas");

	if (canvas.getContext) {

		// Load track and level data
		data = new GameData();
		data.load();

		// Initialise game context
		game = new GameContext(data);

		// Initialise layout
		ctx = canvas.getContext("2d");
		layout = new Layout(ctx, data);

		// Initialise renderer
		renderer = new Renderer(layout, data, game);

		// Initialise input handlers
		keyHandler = new KeyHandler(data, game);
		//mouseHandler = new MouseHandler(layout, data, game);
		window.addEventListener('keydown', keyHandler.handleKey, false);
		//canvas.addEventListener('mousedown', mouseHandler.handleMouseDown,
		//		false);
		//canvas.addEventListener('mouseup', mouseHandler.handleMouseUp, false);

		// Play the game
		game.gameLoopID = setInterval(renderer.render, game.frameInterval);
	}
}
