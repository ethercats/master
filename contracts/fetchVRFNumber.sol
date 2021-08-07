pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract fetchVRFNumber is VRFConsumerBase {
    //Polygon Mainnet
    //This contract will generate a random number for ipfs://QmaUY7TEsXZqUoikxyx9MXJ39LtNEsC1LdWXFbmrHsX8mu
    address internal contractOwner;
    address internal vrfCoordinator = 0x3d2341ADb2D31f1c5530cDC622016af293177AE0;
    address internal linkToken = 0xb0897686c545045aFc77CF20eC7A532E3120E0F1;
    bool internal permanentlyStop = false;
    bool internal coordinatorBlocked = false;
    bytes32 internal keyHash = 0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da;
    uint256 internal fee =  0.0001 * 10 ** 18;
    string public targetScript = "ipfs://QmaUY7TEsXZqUoikxyx9MXJ39LtNEsC1LdWXFbmrHsX8mu";
    bytes32 public requestIDGenerated;
    uint256 public randomNumberGenerated;
    
    constructor() 
        VRFConsumerBase(
            vrfCoordinator,
            linkToken
        ) public
    {
        contractOwner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the owner of the contract may call this function.");
        _;
    }
    
    modifier contractAlive() {
        require(permanentlyStop == false, "The contract is no longer accepting VRF requests.");
        _;
    }
    
    modifier coordinatorAllowed() {
        require(coordinatorBlocked == false, "The VRF Coordinator is no longer allowed to call this function.");
        _;
    }
    
    function getRandomNumber() public onlyOwner contractAlive {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK to pay the coordinator.");
        requestRandomness(keyHash, fee);
        permanentlyStop = true;
    }

    //When the Chainlink VRF Coordinator calls back with the random number the information is permanently stored in the variables since the contract is single use.
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override coordinatorAllowed {
        require(msg.sender == vrfCoordinator, "Only the VRF Coordinator may call this function.");
        requestIDGenerated = requestId;
        randomNumberGenerated = randomNumber;
        coordinatorBlocked = true;
    }

}