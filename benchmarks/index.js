const crypto = require('crypto')
const XorShift128Plus = require('xorshift.js').XorShift128Plus
const cashaddr = require('../')

const seed = process.env.SEED || crypto.randomBytes(16).toString('hex')
console.log(`Seed: ${seed}`)

const prng = new XorShift128Plus(seed)
const hashes = []
while (hashes.length < 1e5) hashes.push(prng.randomBytes(24).slice(0, 20))

const maxTime = 5 * 1e9
const ts = process.hrtime()
const getSpentTime = () => { const res = process.hrtime(ts); return res[0] * 1e9 + res[1] }

let count = 0
for (; getSpentTime() < maxTime; count += 1) {
  const address = cashaddr.encode('bitcoincash', 'P2PKH', hashes[count % hashes.length])
  cashaddr.decode(address)
}

const spentTime = getSpentTime() * 1e-9
console.log(`Spent ${spentTime.toFixed(9)}s for ${count} encode/decode: ${(count / spentTime).toFixed(3)} op/s`)
