class Entity {
  constructor (id, location, velocity) {
    this.is = id
    this.location = typeof location === 'undefined' ? undefined : location.clone()
    this.velocity = typeof location === 'undefined' ? undefined : velocity.clone()
    this.renderer = null
  }

  equals (object) {
    return object instanceof this.constructor && object.getId() === this.getId()
  }

  getId () {
    return this.id
  }

  getLocation () {
    return this.location.clone()
  }

  getVelocity () {
    return this.velocity.clone()
  }

  teleport (location) {
    this.location.copy(location)
    if (this.renderer) this.renderer.updatePosition(this.location, this.velocity)
  }

  setId (id) {
    this.id = id
  }

  setLocation (location) {
    this.location.clone(location)
  }

  setVelocity (velocity) {
    this.velocity.clone(velocity)
  }
}

module.exports = Entity
