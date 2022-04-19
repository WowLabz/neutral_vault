import { ethers } from "ethers";
import { empty } from "ramda";

// TO Think: should we also add the chainID as a requirement for this utility?
const getProvider = () => {
	const rpcURL = "http://127.0.0.1:8545"

	if (rpcURL === null || empty(rpcURL)) {
		throw "invalid rpcURL"
	}

	return new ethers.providers.JsonRpcProvider(rpcURL);
}

export default getProvider