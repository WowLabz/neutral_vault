import { empty } from 'ramda'

const eoaTemp = process.env.EOA
const privateKeyTemp = process.env.PRIVATE_KEY

if (typeof (eoaTemp) === "undefined" || empty(eoaTemp)) {
	throw "invalid address or address not found in the environment"
}

export const eoa = eoaTemp
export const privateKey = privateKeyTemp