import apiMethods from './api.js';
import compareBlocksAlgorithm from './utils.js';


const check = async (blocks, token) => {
    console.log("Procedemos a ejecutar el algoritmo de sorting: ");
    const sortedBlocks = await compareBlocksAlgorithm(blocks);
    console.log(sortedBlocks);
    const encodedBlocks = sortedBlocks.join('') ;
    console.log("Verificamos que los bloques fueron ordenados exitosamente: ");
    const response = await apiMethods.verifyEncodedBlocks(encodedBlocks);
    if (response) {
        console.log("El resultado de la operacion fue exitoso");
    } else {
        console.log("El resultado de la operacion fallo");
    }
}

const main = async () => {
    console.log("Obtenemos Token, para el mail: ntaboada93@gmail.com");
    const token = await apiMethods.getUserToken("ntaboada93@gmail.com");
    console.log("Token obtenido. Procedemos a obtener los bloques: ");
    const blocks = await apiMethods.getBlocks(token);
    console.log("Bloques obtenidos: ");
    console.log(blocks);
    check(blocks, token);
}

main();