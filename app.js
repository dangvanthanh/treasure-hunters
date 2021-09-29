import kaboom from 'https://unpkg.com/kaboom@next/dist/kaboom.mjs';

kaboom();

loadSprite('wall', './sprites/wall_mid.png');
loadSprite('door', './sprites/wall_fountain_top.png');
loadSprite('knight', './sprites/knight_f_hit_anim_f0.png');
loadSprite('demons', './sprites/big_demon_run_anim_f0.png');
loadSprite('undeads', './sprites/big_zombie_run_anim_f0.png');
loadSprite('orcs', './sprites/ogre_run_anim_f0.png');

scene('main', (levelId) => {
	// Charactor dialog
	const characters = {
		a: {
			sprite: 'demons',
			msg: 'Demons'
		},
		b: {
			sprite: 'undeads',
			msg: 'Undeads'
		},
		c: {
			sprite: 'orcs',
			msg: 'Ors'
		}
	};

	// Level layouts
	const levels = [
		[
			'=====|===',
			'=       =',
			'=       =',
			'=       =',
			'=       =',
			'=    a  =',
			'=       =',
			'=       =',
			'=       =',
			'=   @   =',
			'=       =',
			'========='
		],
		[
			'=========',
			'=       =',
			'=       =',
			'=       =',
			'=       =',
			'=       =',
			'=       |',
			'= b     =',
			'=       =',
			'=   @   =',
			'=       =',
			'========='
		],
		[
			'=========',
			'=       =',
			'=       =',
			'=       =',
			'|       =',
			'=       =',
			'=       =',
			'=       =',
			'=     c =',
			'=   @   =',
			'=       =',
			'========='
		]
	];

	addLevel(levels[levelId], {
		width: 16,
		height: 16,
		pos: vec2(16, 16),
		'=': () => [sprite('wall'), area(), solid()],
		'|': () => [sprite('door'), area(), solid(), 'door'],
		'@': () => [sprite('knight'), area(), solid(), 'player'],
		any(ch) {
			const character = characters[ch];
			if (character) {
				return [
					sprite(character.sprite),
					area(),
					solid(),
					'character',
					{ msg: character.msg }
				];
			}
		}
	});

	// Player
	const player = get('player')[0];

	function addDialog() {
		const h = 160;
		const pad = 16;

		const bg = add([
			pos(0, height() - h),
			rect(width(), h),
			color(0, 0, 0),
			z(100)
		]);
		const txt = add([
			text('', { width: width() }),
			pos(0 + pad, height() - h + pad),
			z(100)
		]);

		bg.hidden = true;
		txt.hidden = true;

		return {
			say(t) {
				txt.text = t;
				bg.hidden = false;
				txt.hidden = false;
			},
			dismiss() {
				if (!this.active()) {
					txt.text = '';
					bg.hidden = true;
					txt.hidden = true;
				}
			},
			active() {
				return !bg.hidden;
			},
			destroy() {
				bg.destroy();
				txt.destroy();
			}
		};
	}

	const hasKey = true;
	const dialog = addDialog();

	player.collides('door', () => {
		if (hasKey) {
			if (levelId + 1 < levels.length) {
				go('main', levelId + 1);
			} else {
				go('win');
			}
		} else {
			dialog.say('No key!');
		}
	});

	player.collides('character', (ch) => {
		dialog.say(ch.msg);
	});

	const dirs = {
		left: LEFT,
		right: RIGHT,
		up: UP,
		down: DOWN
	};

	for (const dir in dirs) {
		keyPress(dir, () => {
			dialog.dismiss();
		});

		keyDown(dir, () => {
			player.move(dirs[dir].scale(100));
		});
	}
});

scene('win', () => {
	add([text('You win!'), pos(width() / 2, height() / 2), origin('center')]);
});

go('main', 0);
