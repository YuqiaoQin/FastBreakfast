function Element2(x, y) {
  this.w = 8;
  this.h = 24;
  this.r = 28;

  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  var fd = new box2d.b2FixtureDef();
  fd.shape = new box2d.b2CircleShape();
  fd.shape.m_radius = scaleToWorld(this.r);
  var offset = scaleToWorld(new box2d.b2Vec2(0,-this.h/2));
  fd.shape.m_p = new box2d.b2Vec2(offset.x,offset.y);
  fd.density = 1.0;
  fd.friction = 0.5;
  fd.restitution = 0.2;

  this.body = world.CreateBody(bd);
  this.body.CreateFixture(fd);

  this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(-2, 5)));
  this.body.SetAngularVelocity(random(-5,5));

  //spring grab
  this.contains = function(x,y) {
    var worldPoint = scaleToWorld(x, y);
    var f = this.body.GetFixtureList();
    var inside = f.TestPoint(worldPoint);
    return inside;
  };

  this.display = function() {
    var pos = scaleToPixels(this.body.GetPosition());
    var a = this.body.GetAngleRadians();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    noStroke();
    fill(160,199,245);
    ellipse(0, -this.h/2, this.r*2, this.r*2);
    pop();
  };
}
