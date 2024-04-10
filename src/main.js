import Matter from 'matter-js'
import matterRect from './physics/rect'

import kaboom from 'kaboom'

const k = kaboom({
	fullscreen: true,
	debug: true,
	scale: 1,
	clearColor: [0, 0, 0, 1],
})

k.scene('main', () => {
	const Engine = Matter.Engine
	const engine = Engine.create()

	k.add([
		k.pos(k.width() * 0.5, k.height() * 0.1),
		k.rect(128, 32),
		k.rotate(0),
		k.anchor('center'),
		k.color(255, 0, 0),
		matterRect(engine),
	])

	k.add([
		k.pos(k.width() * 0.5, k.height() * 0.5),
		k.rect(220, 32),
		k.anchor('center'),
		k.color(0, 0, 1),
		matterRect(engine, { isStatic: true }),
	])

	k.add([
		k.pos(k.width() * 0.7, k.height() * 0.3),
		k.rect(220, 32),
		k.anchor('center'),
		k.color(0, 0, 1),
		matterRect(engine, { isStatic: true }),
	])

	k.onUpdate(() => {
		Matter.Engine.update(engine, k.dt() * 500)
	})
})

k.go('main')
