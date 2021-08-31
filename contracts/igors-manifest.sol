/**
 * OpenZepplin contracts contained within are licensed under an MIT License.
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016-2021 zOS Global Limited
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC721/IERC721.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC721/IERC721Receiver.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Address.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Context.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/Strings.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/utils/introspection/ERC165.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/security/ReentrancyGuard.sol";

/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
contract ERC721 is Context, ERC165, IERC721, IERC721Metadata {
    using Address for address;
    using Strings for uint256;

    // Token name
    string private _name = "Igor - EtherCats.io";

    // Token symbol
    string private _symbol =  "IGOR";
    
    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "ipfs://QmY2RtPNfCYyJJW8CtbNWLs3GGSaUus5vG38g4kRZ5Ci7k";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    /**
     * @dev See {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev See {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator, bool approved) public virtual override {
        require(operator != _msgSender(), "ERC721: approve to caller");

        _operatorApprovals[_msgSender()][operator] = approved;
        emit ApprovalForAll(_msgSender(), operator, approved);
    }

    /**
     * @dev See {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");

        _transfer(from, to, tokenId);
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransfer(from, to, tokenId, _data);
    }

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * `_data` is additional data, it has no specified format and it is sent in call to `to`.
     *
     * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
     * implement alternative mechanisms to perform token transfer, such as signature-based.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _transfer(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns whether `tokenId` exists.
     *
     * Tokens can be managed by their owner or approved accounts via {approve} or {setApprovalForAll}.
     *
     * Tokens start existing when they are minted (`_mint`),
     * and stop existing when they are burned (`_burn`).
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ERC721.ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    /**
     * @dev Safely mints `tokenId` and transfers it to `to`.
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function _safeMint(address to, uint256 tokenId) internal virtual {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Same as {xref-ERC721-_safeMint-address-uint256-}[`_safeMint`], with an additional `data` parameter which is
     * forwarded in {IERC721Receiver-onERC721Received} to contract recipients.
     */
    function _safeMint(
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal virtual {
        _mint(to, tokenId);
        require(
            _checkOnERC721Received(address(0), to, tokenId, _data),
            "ERC721: transfer to non ERC721Receiver implementer"
        );
    }

    /**
     * @dev Mints `tokenId` and transfers it to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {_safeMint} whenever possible
     *
     * Requirements:
     *
     * - `tokenId` must not exist.
     * - `to` cannot be the zero address.
     *
     * Emits a {Transfer} event.
     */
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _beforeTokenTransfer(address(0), to, tokenId);

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }

    /**
     * @dev Destroys `tokenId`.
     * The approval is cleared when the token is burned.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     *
     * Emits a {Transfer} event.
     */
    function _burn(uint256 tokenId) internal virtual {
        address owner = ERC721.ownerOf(tokenId);

        _beforeTokenTransfer(owner, address(0), tokenId);

        // Clear approvals
        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit Transfer(owner, address(0), tokenId);
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *  As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     *
     * Emits a {Transfer} event.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer of token that is not owned");
        require(to != address(0), "ERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }
    
    function snipe(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev Approve `to` to operate on `tokenId`
     *
     * Emits a {Approval} event.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private returns (bool) {
        if (to.isContract()) {
            try IERC721Receiver(to).onERC721Received(_msgSender(), from, tokenId, _data) returns (bytes4 retval) {
                return retval == IERC721Receiver.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting
     * and burning.
     *
     * Calling conditions:
     *
     * - When `from` and `to` are both non-zero, ``from``'s `tokenId` will be
     * transferred to `to`.
     * - When `from` is zero, `tokenId` will be minted for `to`.
     * - When `to` is zero, ``from``'s `tokenId` will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}
}

//Igor's Manifest is an EtherCats production. Igor was illustrated and animated by Nadia Khuzina. The principle concept was developed by Woody Deck. The contract was written by Woody Deck and Edvard Gzraryan. Special thanks to Vitalik Buterin for his inspiration in challenging economic dogma.
contract IgorsManifest is ERC721, ReentrancyGuard {
    address public contractOwner;
    uint256 public snipeStep;
    uint256 public snipePrice;
    bool public snipeable;
    uint256 public blockTimerStartTime;
    string igorsHash;
    
    event Snipe(address indexed owner, uint256 price, uint256 step, uint256 blockTimestamp);
    event ExtendLeasehold(uint256 blockTimestamp);
    event DecreaseSnipeStep(uint256 price, uint256 step, uint256 blockTimestamp);

    constructor() {
        contractOwner = msg.sender;
        _safeMint(msg.sender, 1, ""); //Igor is minted as token ID number 1, and the contractOwner owns it initially.
        snipeStep = 0;
        snipePrice = snipePriceTable(snipeStep);
        snipeable = true;
        blockTimerStartTime = block.timestamp;
        igorsHash = "QmSGsx5Cs1zLxmMX8YjvGx1x1vYn47jzuFKy13yhM4S61q";
    }

    //This is a lookup table to determine the cost to snipe Igor from someone.
    function snipePriceTable(uint256 _snipeStep) internal pure returns(uint256 _snipePrice) {
        if (_snipeStep == 0) return 0.1 * 10 ** 18;
        else if (_snipeStep == 1) return 0.15 * 10 ** 18;
        else if (_snipeStep == 2) return 0.21 * 10 ** 18;
        else if (_snipeStep == 3) return 0.28 * 10 ** 18;
        else if (_snipeStep == 4) return 0.36 * 10 ** 18;
        else if (_snipeStep == 5) return 0.45 * 10 ** 18;
        else if (_snipeStep == 6) return 0.55 * 10 ** 18;
        else if (_snipeStep == 7) return 0.66 * 10 ** 18;
        else if (_snipeStep == 8) return 0.78 * 10 ** 18;
        else if (_snipeStep == 9) return 1 * 10 ** 18;
        else if (_snipeStep == 10) return 1.5 * 10 ** 18;
        else if (_snipeStep == 11) return 2.2 * 10 ** 18;
        else if (_snipeStep == 12) return 3 * 10 ** 18;
        else if (_snipeStep == 13) return 4 * 10 ** 18;
        else if (_snipeStep == 14) return 6 * 10 ** 18;
        else if (_snipeStep == 15) return 8.5 * 10 ** 18;
        else if (_snipeStep == 16) return 12 * 10 ** 18;
        else if (_snipeStep == 17) return 17 * 10 ** 18;
        else if (_snipeStep == 18) return 25 * 10 ** 18;
        else if (_snipeStep == 19) return 35 * 10 ** 18;
        else if (_snipeStep == 20) return 47 * 10 ** 18;
        else if (_snipeStep == 21) return 60 * 10 ** 18;
        else if (_snipeStep == 22) return 75 * 10 ** 18;
        else if (_snipeStep == 23) return 92 * 10 ** 18;
        else if (_snipeStep == 24) return 110 * 10 ** 18;
        else if (_snipeStep == 25) return 130 * 10 ** 18;
        else if (_snipeStep == 26) return 160 * 10 ** 18;
        else if (_snipeStep == 27) return 200 * 10 ** 18;
        else if (_snipeStep == 28) return 250 * 10 ** 18;
        else if (_snipeStep == 29) return 310 * 10 ** 18;
        else if (_snipeStep == 30) return 380 * 10 ** 18;
        else if (_snipeStep == 31) return 460 * 10 ** 18;
        else if (_snipeStep == 32) return 550 * 10 ** 18;
        else if (_snipeStep == 33) return 650 * 10 ** 18;
        else if (_snipeStep == 34) return 760 * 10 ** 18;
    }

    modifier onlyIgorOwner() {
        require(msg.sender == ownerOf(1), "Sender is not the owner of Igor.");
        _;
    }

    function snipeIgor() external payable nonReentrant {
        require(msg.sender != ownerOf(1), "You cannot snipe Igor from the address that already owns him.");
        require(msg.value == snipePrice, "The amount sent did not match the current snipePrice.");
        require(snipeable == true, "Sniping is permanently disabled. Igor is owned as a freehold now.");    
        address tokenOwner = ownerOf(1);
        //If the snipeStep is 0, then all proceeds go to the owner.
        if (snipeStep == 0) {
            snipeStep++;
            snipePrice = snipePriceTable(snipeStep);
            snipe(tokenOwner, msg.sender, 1);
            (bool sent,) = payable(tokenOwner).call{ value: msg.value }("");
            require(sent, "Failed to send Ether.");
        } else {
            //Else is all cases after Step 0.
             uint256 etherCatsRoyalty = (msg.value - snipePriceTable(snipeStep - 1)) * 25 / 100;
             uint256 payment = msg.value - etherCatsRoyalty;
            if (snipeStep < 34) {
                snipeStep++;
                snipePrice = snipePriceTable(snipeStep);
            }
            //Automatically stop sniping if Igor is sniped on Step 33.
            if (snipeStep == 34) {
                snipeable = false;
            }
            snipe(tokenOwner, msg.sender, 1);
            (bool paymentSent,) = payable(tokenOwner).call{ value: payment }("");
            require(paymentSent, "Failed to send Ether.");
            
            (bool royaltySent,) = payable(contractOwner).call{ value: etherCatsRoyalty }("");
            require(royaltySent, "Failed to send Ether.");
        }
        
        blockTimerStartTime = block.timestamp;
        emit Snipe(msg.sender, snipePrice, snipeStep, blockTimerStartTime);
    }

    //This option disables sniping permanently. It will behave like a normal ERC721 after this function is triggered. It can only be called by Igor's owner. 
    function permanentlyStopSniping() external payable onlyIgorOwner {
        require(snipeStep <= 20, "Igor can only be bought out on snipe steps before Step 21.");
        require(msg.value == 141 * 10 ** 18, "The amount sent did not match the freehold option amount.");
        require(snipeable == true, "Cannot disable sniping twice. Igor is already not snipeable.");
        snipeable = false;
        (bool sent,) = payable(contractOwner).call{ value: msg.value }("");
        require(sent, "Failed to send Ether.");
    }
    
    //To prevent people from reducing the snipe step, you must pay 1/1000th (0.1%) tax to the creator every two weeks. Activating this function early or multiple times does not result in time accumulating. It will always reset the countdown clock back to 1209600 seconds (two weeks).
    function extendLeasehold() external payable onlyIgorOwner {
        require(snipeStep >= 1, "You cannot extend the leasehold timer when it is step zero.");
        require(msg.value == snipePriceTable(snipeStep-1) / 1000, "The price to extend is 1/1000th of the current value, or the snipe step minus 1");
        require(snipeable == true, "Cannot extend. Igor is not snipeable anymore, sorry.");
        blockTimerStartTime = block.timestamp;
        (bool sent,) = payable(contractOwner).call{ value: msg.value }("");
        require(sent, "Failed to send Ether.");
        
        emit ExtendLeasehold(blockTimerStartTime);
    }

    //If the owner after 1209600 seconds (two weeks) has not paid the extension tax, then anyone can reduce the snipeStep by 1.
    function decreaseSnipeStep() external {
        require(block.timestamp - blockTimerStartTime > 1209600, "You cannot reduce the snipe step until after the lease is up.");
        require(snipeStep >= 1, "You cannot reduce the snipe step when it is at zero.");
        require(snipeStep < 34, "You cannot reduce the snipe step once it reaches step 34.");
        require(snipeable == true, "Igor is not snipeable anymore, sorry.");
        snipeStep--;
        snipePrice = snipePriceTable(snipeStep);
        blockTimerStartTime = block.timestamp;
        
        emit DecreaseSnipeStep(snipePrice, snipeStep, blockTimerStartTime);
    }
    
    //This function is for site owners to vet that Igor is only shown by the Ethereum address that owns him. This is conceptual, and only facilitates the possibility of restricting PFP NFTs from being displayed by accounts that do not own the NFT. It is up to a site to implement such a process on its own. It is not mandated by the terms of this contract. Reputable sites concerned about security will never store or even ask you to create a password. Reputable sites will require Web3 authentication for logins. Adding PFP avatar restrictions is trivial after adopting Web3 for authentication.
    function pfpOwner() external view returns (address igorsOwner, string memory igorsIPFSHash){
        return (ownerOf(1), igorsHash);
    }

    //There's only one Igor. Some frontends may look for this optional ERC721 implementation.
    function totalSupply() public pure returns (uint256) {
        return 1;
    }
}