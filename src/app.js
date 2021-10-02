import Matter from 'matter-js'
import k from './kaboom.js'

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

k.scene('main', () => {
  const engine = Matter.Engine.create()

  k.add([
    k.pos(k.width() * 0.6, k.height() * 0.1),
    k.rect(110, 32),
    k.rotate(0),
    k.origin('center'),
    k.color(255, 0, 0),
    matterRect(engine),
  ])

  k.add([
    k.pos(k.width() * 0.5, k.height() * 0.5),
    k.rect(220, 32),
    k.origin('center'),
    k.color(0, 0, 1),
    matterRect(engine, { isStatic: true }),
  ])

  k.add([
    k.pos(k.width() * 0.7, k.height() * 0.3),
    k.rect(220, 32),
    k.origin('center'),
    k.color(0, 0, 1),
    matterRect(engine, { isStatic: true }),
  ])

  k.action(() => {
    Matter.Engine.update(engine, k.dt() * 1000)
  })
})

k.go('main')
