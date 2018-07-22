/*global TowerType, Point, Track, Level, Image, UnitType, EnemySpawn, AnimationType */
function GameData() {
	
	var self = this;
	var imageDir = 'images/';

	function loadUnits() {
		
		self.goodSwordsmanStandingAnimation = new AnimationType(
				[
		         new AnimationFrame(imageDir + 'good-swordsman-standing.png', 200, 0, 0)
		         ]
		);

		self.goodSwordsmanRunningAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'good-swordsman-running-1.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-running-2.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-running-3.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-running-4.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-running-5.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-running-6.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-running-7.png', 100, 10, 0, 0, -7),
				 new AnimationFrame(imageDir + 'good-swordsman-running-8.png', 100, 10, 0, 0, 0)
				 ]
		);

		self.goodSwordsmanStabAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'good-swordsman-stab-3.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-2.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-1.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-2.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-3.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-4.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-5.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-6.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-7.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-6.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-5.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-4.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-stab-3.png', 80, 0, 0, 0, 0)
				 ]
		);

		self.goodSwordsmanDyingAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'good-swordsman-dying-1.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-dying-2.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-dying-3.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-dying-4.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-dying-5.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-dying-6.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-dying-7.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-dying-8.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-dying-9.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-swordsman-dying-10.png', 10000, 0, 0, 0, 0)
				 ]
		);
		
		self.goodArcherRunningAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'good-archer-running-1.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-running-2.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-running-3.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-running-4.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-running-5.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-running-6.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-running-7.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-running-8.png', 100, 10, 0, 0, 0)			 	
				 ] 
		);
		
		self.goodArcherFiringAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'good-archer-firing-1.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-2.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-3.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-4.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-5.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-6.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-7.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-8.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-9.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-10.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-11.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-12.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-13.png', 100, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-14.png', 100, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-archer-firing-15.png', 100, 0, 0, 0, 0),
				 ]
		);
		
		self.goodArrowAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'good-arrow-1.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-arrow-2.png', 30, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-arrow-3.png', 30, 0, 0, 0, 0)
				 ]
		);
		
		self.giantWalkingAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'good-giant-walk-1.png', 200, 5, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-giant-walk-2.png', 200, 5, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-giant-walk-3.png', 200, 5, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-giant-walk-4.png', 200, 5, 0, 0, 0),
				 new AnimationFrame(imageDir + 'good-giant-walk-5.png', 200, 5, 0, 0, 0),
				 ]
		);


		// Enemies
		self.enemySwordsmanStandingAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'enemy-swordsman-standing.png', 200, 0, 0)
				 ]
		);

		self.enemySwordsmanRunningAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'enemy-swordsman-running-1.png', 100, -10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-running-2.png', 100, -10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-running-3.png', 100, -10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-running-4.png', 100, -10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-running-5.png', 100, -10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-running-6.png', 100, -10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-running-7.png', 100, -10, 0, 0, -7),
				 new AnimationFrame(imageDir + 'enemy-swordsman-running-8.png', 100, -10, 0, 0, 0)
				 ]
		);

		self.enemySwordsmanStabAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-3.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-2.png', 80, 0, 0, 6, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-1.png', 80, 0, 0, 10, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-2.png', 80, 0, 0, 6, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-3.png', 80, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-4.png', 80, 0, 0, -5, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-5.png', 80, 0, 0, -11, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-6.png', 80, 0, 0, -28, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-7.png', 80, 0, 0, -36, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-6.png', 80, 0, 0, -28, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-5.png', 80, 0, 0, -11, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-4.png', 80, 0, 0, -5, 0),
				 new AnimationFrame(imageDir + 'enemy-swordsman-stab-3.png', 80, 0, 0, 0, 0)
				 ]
		);

		self.enemySwordsmanDyingAnimation = new AnimationType(
		         [
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-1.png', 80, 0, 0, 0, 0),
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-2.png', 80, 0, 0, 0, 0),
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-3.png', 80, 0, 0, 0, 0),
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-4.png', 80, 0, 0, 0, 0),
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-5.png', 80, 0, 0, 0, 0),
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-6.png', 80, 0, 0, 0, 0),
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-7.png', 80, 0, 0, 0, 0),
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-8.png', 80, 0, 0, 0, 0),
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-9.png', 80, 0, 0, 0, 0),
		         new AnimationFrame(imageDir + 'enemy-swordsman-dying-10.png', 10000, 0, 0, 0, 0)
		         ]
		 );

		self.enemyArcherRunningAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'enemy-archer-running-1.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-archer-running-2.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-archer-running-3.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-archer-running-4.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-archer-running-5.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-archer-running-6.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-archer-running-7.png', 100, 10, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-archer-running-8.png', 100, 10, 0, 0, 0)			 	
				 ] 
		);

		self.enemyGiantWalkingAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'enemy-giant-walk-1.png', 200, -5, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-giant-walk-2.png', 200, -5, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-giant-walk-3.png', 200, -5, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-giant-walk-4.png', 200, -5, 0, 0, 0),
				 new AnimationFrame(imageDir + 'enemy-giant-walk-5.png', 200, -5, 0, 0, 0)

				 ]
		);
		
		self.goodMonumentAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'good-monument.png', 0, 0, 0, 0, 0)
				 ]
		);
		self.enemyMonumentAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'enemy-monument.png', 0, 0, 0, 0, 0)
				 ]
		);
		
		self.goodMinerWalkingAnimation = new AnimationType(
				[
				 new AnimationFrame(imageDir + 'miner-walking-1.png', 0, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'miner-walking-2.png', 0, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'miner-walking-3.png', 0, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'miner-walking-4.png', 0, 0, 0, 0, 0),
				 new AnimationFrame(imageDir + 'miner-walking-5.png', 0, 0, 0, 0, 0)
				 ]
		);

		// new UnitType(team, endsLevel, moveAnimation, attackAnimation, firingAnimation, dyingAnimation, attackRange, attackDamageFrame, attackDamage, cost, velocity, vitality, bounty);
		self.goodSwordsman = new UnitType(UnitType.Team.GOOD, false, self.goodSwordsmanRunningAnimation, self.goodSwordsmanStabAnimation, null, self.goodSwordsmanDyingAnimation, 0, 8, 10, 100, 25, 100, 15);
		self.goodArcher = new UnitType(UnitType.Team.GOOD, false, self.goodArcherRunningAnimation, self.goodArcherFiringAnimation, self.goodArrowAnimation, null, 100, 0, 20, 200, 25, 1000, 100);
		self.goodGiant = new UnitType(UnitType.Team.GOOD, false, self.giantWalkingAnimation, null, null, null, 0, 0, 25, 400, 10, 200, 250);
		self.enemySwordsman = new UnitType(UnitType.Team.ENEMY, false, self.enemySwordsmanRunningAnimation, self.enemySwordsmanStabAnimation, null, self.enemySwordsmanDyingAnimation, 0, 8, 10, 100, 25, 100, 34);
		self.enemyGiant = new UnitType(UnitType.Team.ENEMY, false, self.enemyGiantWalkingAnimation, null, null, 0, 0, 25, 400, 10, 200, 250);
		self.goodMonument = new UnitType(UnitType.Team.GOOD, true, self.goodMonumentAnimation, null, null, null, 0, 0, 0, 0, 0, 700, 500);
		self.enemyMonument = new UnitType(UnitType.Team.ENEMY, true, self.enemyMonumentAnimation, null, null, null, 0, 0, 0, 0, 0, 700, 500);

		self.backgrounds = [];

		self.backgrounds[0] = new Background(imageDir + 'background-1.png');
		self.backgrounds[1] = new Background(imageDir + 'background-2.png');

		// Load level spawners
		self.levels = [];

		// Level 1
		self.levels[0] = new Level(self.goodMonument, self.enemyMonument,
				[
				 new EnemySpawn(0, self.enemySwordsman),
		         new EnemySpawn(15000, self.enemySwordsman),
		         new EnemySpawn(30000, self.enemySwordsman),
		         new EnemySpawn(45000, self.enemySwordsman),
		         new EnemySpawn(60000, self.enemySwordsman),
		         new EnemySpawn(75000, self.enemySwordsman),
		         new EnemySpawn(90000, self.enemySwordsman)
				 ]
		);
		
		self.levels[1] = new Level(self.goodMonument, self.enemyMonument,
				[
				 new EnemySpawn(60000, self.enemySwordsman),
				 new EnemySpawn(60500, self.enemySwordsman),
				 new EnemySpawn(61000, self.enemySwordsman),
				 new EnemySpawn(61500, self.enemySwordsman),
				 new EnemySpawn(62000, self.enemySwordsman),
				 new EnemySpawn(62500, self.enemySwordsman),
				 new EnemySpawn(63000, self.enemySwordsman)
				 ]
		);
	}
	/*
	function loadControlBar() {
		self.playButtonImage = new Image();	
		self.playButtonImage.src = imageDir + 'play-button.png';
	}
	 */

	/*
	function loadFiring() {
		self.firingStarAnimationType = new AnimationType( [ imageDir + 'ninja-star.png' ], 0);
	}
	 */

	this.load = function () {
		loadUnits();
		//loadLevels();
		//loadTracks();
		//loadEnemies();
		//loadLevels();
		//loadControlBar();
		//loadFiring();
	};

}
