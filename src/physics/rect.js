import Matter from 'matter-js'

function matterRect(engine, options = {}, w = 32, h = 32) {
	return {
		add() {
			const { x, y } = this.pos
			const { width = w, height = h } = this
			this.body = Matter.Bodies.rectangle(x, y, width, height, options)
			Matter.Composite.add(engine.world, this.body)
		},
		update() {
			if (!this.body) {
				return
			}

			this.pos.x = this.body.position.x
			this.pos.y = this.body.position.y
			this.angle = -this.body.angle
		},
	}
}

export default matterRect
