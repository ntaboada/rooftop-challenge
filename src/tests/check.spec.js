import { jest } from '@jest/globals'

import {  compareBlocksAlgorithm, getEncodedBlocks } from '../utils.js'; 

import apiMethods from '../api.js';


const blocks = [
    'QU0p9VnGgeZhmoz2XWjLCRFwLz8DwUqz54wVjGogCUSnvrC7UuXWYVcY3lFcKVFfLu3dXal7f5DC0cYtfLq0HTTyTVji9vdWTG6B',
    'Y2d3ldwMwoiQIVfAY0Q4ggDKZBitqrsAJRh8HKxBkF8L0jKSEv5LyBQyIPfjy14tBDswkOQGglcx1PHyX7x8ReCkqrbOaEYb8PJL',
    'JoqQzZ8tzDmVTB8Yf55y9HokviPjz1rEA9KmfFU2A9yuJwVTgqbJYvgMLKEpBszDEovzEYnD2CDOWdjamKpYpnmQAqkY7Z3LL6KR',
    'RJscHI0YeysjrYDwtgpQQjghJYb75enc44VSAhulmtFUugmPc80QAtnVkqKyoVtEyLYQADC1iGt4DshuaHqduBiLSHxOTBxRd6Jr',
];  

const sortedBlocks = [
    'QU0p9VnGgeZhmoz2XWjLCRFwLz8DwUqz54wVjGogCUSnvrC7UuXWYVcY3lFcKVFfLu3dXal7f5DC0cYtfLq0HTTyTVji9vdWTG6B',
    'RJscHI0YeysjrYDwtgpQQjghJYb75enc44VSAhulmtFUugmPc80QAtnVkqKyoVtEyLYQADC1iGt4DshuaHqduBiLSHxOTBxRd6Jr',
    'JoqQzZ8tzDmVTB8Yf55y9HokviPjz1rEA9KmfFU2A9yuJwVTgqbJYvgMLKEpBszDEovzEYnD2CDOWdjamKpYpnmQAqkY7Z3LL6KR',
    'Y2d3ldwMwoiQIVfAY0Q4ggDKZBitqrsAJRh8HKxBkF8L0jKSEv5LyBQyIPfjy14tBDswkOQGglcx1PHyX7x8ReCkqrbOaEYb8PJL',
];

const sortedEncodedBlocks = "QU0p9VnGgeZhmoz2XWjLCRFwLz8DwUqz54wVjGogCUSnvrC7UuXWYVcY3lFcKVFfLu3dXal7f5DC0cYtfLq0HTTyTVji9vdWTG6BRJscHI0YeysjrYDwtgpQQjghJYb75enc44VSAhulmtFUugmPc80QAtnVkqKyoVtEyLYQADC1iGt4DshuaHqduBiLSHxOTBxRd6JrJoqQzZ8tzDmVTB8Yf55y9HokviPjz1rEA9KmfFU2A9yuJwVTgqbJYvgMLKEpBszDEovzEYnD2CDOWdjamKpYpnmQAqkY7Z3LL6KRY2d3ldwMwoiQIVfAY0Q4ggDKZBitqrsAJRh8HKxBkF8L0jKSEv5LyBQyIPfjy14tBDswkOQGglcx1PHyX7x8ReCkqrbOaEYb8PJL";

describe('check', () => {

    
    test('test checkBlocks', async () => {
        const spy = jest.spyOn(apiMethods, 'checkBlocks');
        await compareBlocksAlgorithm(blocks);
        expect(spy).toHaveBeenCalled();
    });

    test('test edge case of min numberOfRequests when blocks are sorted', async () => {
        apiMethods.checkBlocks = jest.fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true);

        const resp = await compareBlocksAlgorithm(sortedBlocks);

        expect(resp[0]).toBe(sortedBlocks[0]);
        expect(resp[1]).toBe(sortedBlocks[1]);
        expect(resp[2]).toBe(sortedBlocks[2]);
        expect(resp[3]).toBe(sortedBlocks[3]);

        expect(apiMethods.checkBlocks).toHaveBeenCalledTimes(3);
    });

    test('test edge case of max numberOfRequests when blocks are not sorted ', async () => {
        apiMethods.checkBlocks = jest.fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true);

        await compareBlocksAlgorithm(blocks);

        expect(apiMethods.checkBlocks).toHaveBeenCalledTimes(6);
    });

    test('test getSortedBlocks', async () => {
        apiMethods.checkBlocks = jest.fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true);

        const resp = await compareBlocksAlgorithm(blocks);
        expect(getEncodedBlocks(resp)).toBe(sortedEncodedBlocks);

    });

    test('test encoded sorted Blocks ', async () => {
        apiMethods.checkBlocks = jest.fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true);

        const response = await compareBlocksAlgorithm(blocks);


        expect(apiMethods.checkBlocks).toHaveBeenCalledTimes(6);
    });

  });