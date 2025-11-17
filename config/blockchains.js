module.exports = {
    ethereum: {
        name: "Ethereum Mainnet",
        chainId: 1,
        rpc: "https://mainnet.infura.io/v3/487e87a62b4543529a6fd0bbaef2020f",
        explorer: "https://etherscan.io",
        nativeCurrency: "ETH"
    },
    polygon: {
        name: "Polygon Mainnet", 
        chainId: 137,
        rpc: "https://polygon-mainnet.infura.io/v3/487e87a62b4543529a6fd0bbaef2020f",
        explorer: "https://polygonscan.com",
        nativeCurrency: "MATIC"
    },
    sepolia: {
        name: "Sepolia Testnet",
        chainId: 11155111,
        rpc: "https://sepolia.infura.io/v3/487e87a62b4543529a6fd0bbaef2020f",
        explorer: "https://sepolia.etherscan.io",
        nativeCurrency: "ETH"
    },
    // Add more chains as needed
    chains: ['ethereum', 'polygon', 'sepolia']
};
