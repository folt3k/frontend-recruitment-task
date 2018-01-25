function Random(selector) {
    Component.call(this, selector);
    this.numbers = [];
} 

Random.prototype = Object.create(Component.prototype);
Random.constructor = Random;

Random.prototype.init = function() {
  const self = this;

  axios.get('http://localhost:3000/random-numbers')
    .then(function(response) {
      self.numbers = response.data.data.map(function(number) {
        return number;
      });

      // aktualizacja rankingu
      ranking.update(self.numbers);

      self.render();
    })
    .catch(function(error) {
      console.error(error);
    });
};

Random.prototype.render = function() {
  const container = this.getDOMElement();
  container.innerHTML = '';

  this.numbers.forEach(function(number,index) {
      index == 4 ? container.innerHTML += number : container.innerHTML += number + ', ';
  });
};