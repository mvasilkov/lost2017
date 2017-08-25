import { addFeatures } from '../evo'
import test from 'ava'

const table = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 2, 1],
    [0, 3, 1],
    [1, 1, 1],
    [1, 2, 2],
    [1, 3, 2],
    [2, 2, 2],
    [2, 3, 3],
    [3, 3, 3],
]

test('addFeatures', t => {
    for (let [a, b, result] of table) {
        t.is(addFeatures(a, b), result)
    }
})
