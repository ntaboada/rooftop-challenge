import {
    getUserToken,
    getBlocks,
    checkBlocks,
    verifyEncodedBlocks,
} from './api.js';

import compareBlocksAlgorithm from './utils.js';


const check = async (blocks, token) => {
    const sortedBlocks = await compareBlocksAlgorithm(blocks);
    const encodedBlocks = sortedBlocks.join(',') ;
    const response = await verifyEncodedBlocks(encodedBlocks);
    console.log(response);
}


const main = async () => {
    const token = await getUserToken("ntaboada93@gmail.com");
    const blocks = await getBlocks(token);
    check(blocks, token);
}

main();