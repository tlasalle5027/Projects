// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (number, dna) => {
  return {
    specimenNum: number,
    dna: dna,
    mutate: function(){
      let newBase = returnRandBase();
      const index = Math.floor(Math.random() * this.dna.length);
      const oldBase = this.dna[index];

      do{
        newBase = returnRandBase();
      } while (oldBase === newBase)

      this.dna[index] = newBase;

      return this.dna;
    },
    compareDNA: function(pAequor){
      let sameBases = 0;
      for(let i = 0; i < this.dna.length - 1; i++){
        if(this.dna[i] === pAequor.dna[i]){
          sameBases++;
        }
      }

      const percentage = ((sameBases / this.dna.length) * 100).toFixed(0);
      console.log(`Specimen #${this.specimenNum} and Specimen #${pAequor.specimenNum} have ${percentage}% DNA in common.`);
    },
    willLikelySurvive: function(){
      let cOrGBases = 0;
      for(let i = 0; i < this.dna.length - 1; i++){
        let base = this.dna[i];
        if(base === 'C' || base === 'G'){
          cOrGBases++;
        }        
      }

      let percentage = (cOrGBases / this.dna.length) * 100;

      if(percentage >= 60){
        return true;
      } else {
        return false;
      }
    },

  };
}

/*
const test = pAequorFactory(1, mockUpStrand());
const second = pAequorFactory(2, mockUpStrand());
console.log(test.specimenNum + ": " + test.dna);
console.log(test.specimenNum + " Mutated: " + test.mutate());
console.log(second.specimenNum + ": " + second.dna);
console.log(second.specimenNum + " Mutated: " + second.mutate());
test.compareDNA(second);
console.log(test.specimenNum + " will likely survive: " + test.willLikelySurvive());
console.log(second.specimenNum + " will likely survive: " + second.willLikelySurvive());
*/

let pAequorArray = [];
let i = 1;

do{
  const specimen = pAequorFactory(i, mockUpStrand());
  if(specimen.willLikelySurvive()){
    pAequorArray.push(specimen);
  }
  i++;
} while(pAequorArray.length < 30);

pAequorArray.forEach(specimen => {
  console.log(specimen.specimenNum + ": " + specimen.dna);
});








