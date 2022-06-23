import apiMethods from './api.js';


// Dados 2 arrays, retorna un array con los elementos de arr1 que no estan en arr2
// Ej: [a, b, c] y [a] => [b, c]
const getNoPresentElements = (arr1, arr2) => {
    const filtered = arr1.filter(el => {
       return arr2.indexOf(el) === -1;
    });
    return filtered;
};

async function compareBlocksAlgorithm(blocks) {
  const sortedArray = [];
  // El primer elemento del array ordenado, esta el primer elemento del array de bloques recibidos (por enunciado)
  const firstElement = blocks[0];
  sortedArray.push(firstElement);

  let filteredArray = getNoPresentElements(blocks, sortedArray);
  let actualElement = sortedArray[sortedArray.length - 1];

  let i = 0;
  let numberOfRequest = 1;
  do {
    const response = await apiMethods.checkBlocks(actualElement, filteredArray[i]);
    console.log("Se ejecuto la request nro:", numberOfRequest);
    numberOfRequest++;
    if (response) {
        sortedArray.push(filteredArray[i]);
        filteredArray = getNoPresentElements(blocks, sortedArray);
        actualElement = sortedArray[sortedArray.length - 1];
        i = 0;
        continue;
    };

    i++;
  } while (filteredArray.length !== 0)

  return sortedArray;
}


export default compareBlocksAlgorithm;