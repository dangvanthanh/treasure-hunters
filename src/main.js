import Matter from 'matter-js'
import matterRect from './physics/rect'
import k from './kaboom'

const {
	scene,
	add,
	pos,
	rect,
	rotate,
	anchor,
	color,
	dt,
	width,
	height,
	onUpdate,
	onKeyDown,
} = k

scene('main', () => {
	const Engine = Matter.Engine
	const engine = Engine.create()

	const box = add([
		pos(width() * 0.5, height() * 0.1),
		rect(128, 32),
		rotate(0),
		anchor('center'),
		color(255, 0, 0),
		matterRect(engine),
	])

	add([
		pos(width() * 0.5, height() * 0.5),
		rect(220, 32),
		anchor('center'),
		color(0, 0, 1),
		matterRect(engine, { isStatic: true }),
	])

	add([
		pos(width() * 0.7, height() * 0.3),
		rect(220, 32),
		anchor('center'),
		color(0, 0, 1),
		matterRect(engine, { isStatic: true }),
	])

	onUpdate(() => {
		Matter.Engine.update(engine, dt() * 500)
	})

	onKeyDown('left', () => {
		Matter.Body.translate(box, { x: -32, y: 0 })
		console.log('left')
	})
})

go('main')
