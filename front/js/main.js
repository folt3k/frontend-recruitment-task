const ranking = new Ranking('#numbers-ranking');
const random = new Random('#latest-numbers');
ranking.init();

setInterval(() => {
    random.init();
},10000);


