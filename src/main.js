import apiMethods from './api.js';
import {  compareBlocksAlgorithm, getEncodedBlocks } from './utils.js';

const USER_EMAIL = "ntaboada93@gmail.com";

const check = async (blocks, token) => {
    console.log("Procedemos a ejecutar el algoritmo de sorting: ");
    const sortedBlocks = await compareBlocksAlgorithm(blocks, token);
    console.log(sortedBlocks);
    const encodedBlocks = getEncodedBlocks(sortedBlocks) ;
    console.log("Verificamos que los bloques fueron ordenados exitosamente: ");
    const response = await apiMethods.verifyEncodedBlocks(encodedBlocks);
    if (response) {
        console.log("El resultado de la operacion fue exitoso");
    } else {
        console.log("El resultado de la operacion fallo");
    }
}

const main = async () => {
    console.log("Obtenemos Token, para el mail:", USER_EMAIL);
    const token = await apiMethods.getUserToken(USER_EMAIL);
    console.log("Token obtenido. Procedemos a obtener los bloques: ");
    const blocks = await apiMethods.getBlocks(token);
    console.log("Bloques obtenidos: ");
    console.log(blocks);
    check(blocks, token);
}

main();