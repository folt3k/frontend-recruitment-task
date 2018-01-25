function Ranking(selector) {
  Component.call(this, selector);
  this.numbers = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function() {
  const self = this;

  axios.get('http://localhost:3000/numbers')
    .then(function(response) {
      self.numbers = response.data.data.map(function(number) {
        return {
          id: number,
          count: 0
        }
      });
      self.render();
    })
    .catch(function(error) {
      console.error(error);
    });
};

Ranking.prototype.update = function(latestNumbers) {

  const self = this;

  //count

  self.numbers.forEach((number) => {
    for (let i = 0; i < latestNumbers.length; i++) {
      if(number.id === latestNumbers[i]) {
        number.count++;
      }
    }
  });

  //sort

  self.numbers.sort((a,b) => {
    if (a.count > b.count)
      return -1;
    if (a.count < b.count)
      return 1;
    return 0;
  });

  // render

  self.render();  

}

Ranking.prototype.render = function() {
  const container = this.getDOMElement();

  // sprawdzam czy lista jest pusta
  if(!container.hasChildNodes()) {

  this.numbers.forEach(function(number) {
    
      const listElement = document.createElement('li');
      listElement.classList.add('list-group-item');
      listElement.innerHTML = number.id + ' | count: ' + number.count;

      container.appendChild(listElement);
    });
  } 
  // jesli nie, to tylko aktualizuje elementy listy
  else {
    const list = container.getElementsByTagName('li');
    this.numbers.forEach((number,index) => {
      list[index].innerHTML = number.id + ' | count: ' + number.count;
    });
  }
  }