// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.5;

// TODO: Add a SPDX-License-Identifier

interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    function mint(address _account, uint256 _amount) external;

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }

    function sqrrt(uint256 a) internal pure returns (uint256 c) {
        if (a > 3) {
            c = a;
            uint256 b = add(div(a, 2), 1);
            while (b < c) {
                c = b;
                b = div(add(div(a, b), b), 2);
            }
        } else if (a != 0) {
            c = 1;
        }
    }

    function percentageAmount(uint256 total_, uint8 percentage_)
        internal
        pure
        returns (uint256 percentAmount_)
    {
        return div(mul(total_, percentage_), 1000);
    }

    function substractPercentage(uint256 total_, uint8 percentageToSub_)
        internal
        pure
        returns (uint256 result_)
    {
        return sub(total_, div(mul(total_, percentageToSub_), 1000));
    }

    function percentageOfTotal(uint256 part_, uint256 total_)
        internal
        pure
        returns (uint256 percent_)
    {
        return div(mul(part_, 100), total_);
    }

    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow, so we distribute
        return (a / 2) + (b / 2) + (((a % 2) + (b % 2)) / 2);
    }

    function quadraticPricing(uint256 payment_, uint256 multiplier_)
        internal
        pure
        returns (uint256)
    {
        return sqrrt(mul(multiplier_, payment_));
    }

    function bondingCurve(uint256 supply_, uint256 multiplier_)
        internal
        pure
        returns (uint256)
    {
        return mul(multiplier_, supply_);
    }
}

contract Vault {
    using SafeMath for uint256;

    uint256 public APY;

    /// @notice The total time (measured in terms of Block Numbers) for which a given deposit will be locked
    /// @dev LockPeriod is measured in terms of Block Numbers
    uint256 public lockPeriod;

    uint256 public totalValueLocked;

    address public burnAddress = 0x0000000000000000000000000000000000000000;

    address public inputTokenAddress;
    address public outputTokenAddress;

    address public wrappedTokenAddress;

    uint256 public inputTokenDecimal;
    uint256 public outputTokenDecimal;

    address public adminAddress;

    struct DepositInfo {
        uint256 amount;
        uint256 blockNumberAtDeposit;
    }

    mapping(address => DepositInfo[]) private _unmaturedDeposits;

    mapping(address => uint256) public totalDeposited;

    mapping(address => uint256) public totalRedeemable;

    modifier onlyAdmin(address _address) {
        require(
            _address == adminAddress,
            "the given address is not the admin address of the vault"
        );
        _;
    }

    modifier onlyInputTokens(address _tokenAddress) {
        require(
            _tokenAddress == inputTokenAddress,
            "the given token is accepted as an input token by the vault"
        );
        _;
    }

    modifier onlyOutputTokens(address _tokenAddress) {
        require(
            _tokenAddress == outputTokenAddress,
            "the given token is accepted as an output token by the vault"
        );
        _;
    }

    modifier onlyAllowedTokens(address _tokenAddress) {
        require(
            _tokenAddress == inputTokenAddress ||
                _tokenAddress == outputTokenAddress,
            "the given token is not accepted by the vault"
        );
        _;
    }

    modifier onlyIfBalanceAvailable(address _account, uint256 _amount) {
        uint256 _totalRedeemable = totalRedeemable[_account];

        if (_totalRedeemable < _amount) {
            rebase(_account);
            require(
                totalRedeemable[_account] >= _amount,
                "total redeemable balance is less then the amount being claimed"
            );
        }
        _;
    }

    /// @notice An event that is emitted everytime a Deposit is made
    /// @param _account account for which the deposit was made
    /// @param _amount amount for which the deposit was made
    event DEPOSIT(address _account, uint256 _amount);

    /// @notice An event that is emitted everytime a redeem is done
    /// @param _account account which redeemed
    /// @param _amount amount redeemed
    event REDEEM(address _account, uint256 _amount);

    /// @param _APY the interest to be payed on top of the princiapl once the deposit matures
    /// @param _lockPeriod the Period (measured in Block Numbers) for which a given deposit will be locked
    /// @param _inputTokenAddress address of the input token, i.e the token that an address will deposit in the contract via the `deposit` method
    /// @param _outputTokenAddress address of the output token, i.e the token that an address will withdraw in the contract via the `withdraw` method
    /// @param _wrappedTokenAddress address of the wrapped token, i.e the token that an address get in return of the deposit made via the `deposit` method
    /// @param _inputTokenDecimal the decimal that the input token uses
    /// @param _outputTokenDecimal the decimal that the output token uses

    constructor(
        uint256 _APY,
        uint256 _lockPeriod,
        address _inputTokenAddress,
        address _outputTokenAddress,
        address _wrappedTokenAddress,
        uint256 _inputTokenDecimal,
        uint256 _outputTokenDecimal
    ) {
        adminAddress = msg.sender;

        APY = _APY;
        lockPeriod = _lockPeriod;
        inputTokenAddress = _inputTokenAddress;
        outputTokenAddress = _outputTokenAddress;
        wrappedTokenAddress = _wrappedTokenAddress;
        inputTokenDecimal = _inputTokenDecimal;
        outputTokenDecimal = _outputTokenDecimal;

        totalValueLocked = 0;
    }

    /// @dev removes a given deposit from the array that contains that user's unmatured deposits while keeping the order of the array intact
    /// @param _account account for which to delete the deposit
    /// @param _index index of the deposit to be deleted

    // TODO: this function can be optimized by passing in an index till which all the elements have to be deleted(as the array is ordered)!
    // After base implementation of contract this optimization can be made

    function _removeDeposit(address _account, uint256 _index) private {
        for (
            uint256 i = _index;
            i < _unmaturedDeposits[_account].length - 1;
            i += 1
        ) {
            _unmaturedDeposits[_account][i] = _unmaturedDeposits[_account][
                i + 1
            ];
        }

        _unmaturedDeposits[_account].pop();
    }

    /// @notice a function via which deposits to the vault can be made, IMPORTANT -> the depositor needs to first `approve` the vault contract to spend the `_amount` of input ERC20 token from their address
    /// @param _amount amount of the input ERC20 token to be deposited

    function deposit(uint256 _amount) public {
        IERC20(inputTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
        );

        _unmaturedDeposits[msg.sender].push(DepositInfo(_amount, block.number));

        totalDeposited[msg.sender] = totalDeposited[msg.sender] + _amount;

        totalValueLocked += _amount;

        IERC20(wrappedTokenAddress).mint(msg.sender, _amount);

        emit DEPOSIT(msg.sender, _amount);
    }

    /// @notice a function to redeem your wrapped input token with interest applied
    /// @param _amount the amount of wrapped token to be used for redeeming
    function redeem(uint256 _amount) public {
        rebase(msg.sender);

        totalRedeemable[msg.sender] = totalRedeemable[msg.sender].sub(
            _amount,
            "total redeemable balance is less than the amount being claimed"
        );
        totalDeposited[msg.sender] -= _amount;

        uint256 _amountToBePayed = _calculateReturn(_amount);

        totalValueLocked -= _amount;

        IERC20(wrappedTokenAddress).transferFrom(
            msg.sender,
            burnAddress,
            _amount
        );

        ///TODO: the output can be made to be payable by both, INPUT and OUTPUT token or by a combination of both of them
        IERC20(inputTokenAddress).transfer(msg.sender, _amountToBePayed);

        emit REDEEM(msg.sender, _amount);
    }

    function _calculateReturn(uint256 _amount) public view returns (uint256) {
        return _amount + (_amount.div(100)).mul((APY.div(100)));
    }

    /// @notice a function that updates the amount of redeemable token for a given _account by checking which deposits have matured to become redeemable
    /// @param _account the account for which to do these updates

    function rebase(address _account) public {
        for (uint256 i = 0; i < _unmaturedDeposits[_account].length; i += 1) {
            DepositInfo memory _deposit = _unmaturedDeposits[_account][i];

            if (block.number - _deposit.blockNumberAtDeposit >= lockPeriod) {
                totalRedeemable[_account] =
                    totalRedeemable[_account] +
                    _deposit.amount;

                _removeDeposit(_account, i);
            } else {
                break;
            }
        }
    }

    /// @notice a function that returns the total amount of unmatured deposits a person has at the given time
    /// @param _account the account for which to return the total number of unmatured deposits
    function totalBonds(address _account) public view returns (uint256) {
        return _unmaturedDeposits[_account].length;
    }

    /// @notice A function for the admin to deposit funds in the vault, the admin has to first approve the vault to use thier ERC20 balance in order to use this function
    /// @param _tokenAddress the address of the token to deposit
    /// @param _amount the amount of token to deposit

    function adminDeposit(address _tokenAddress, uint256 _amount)
        public
        onlyAdmin(msg.sender)
        onlyAllowedTokens(_tokenAddress)
    {
        IERC20(_tokenAddress).transferFrom(
            adminAddress,
            address(this),
            _amount
        );
    }

    /// @notice A function for the admin to withdraw funds from the vault
    /// @param _tokenAddress the address of the token to withdraw
    /// @param _amount the amount of token to withdraw
    function adminWithdraw(address _tokenAddress, uint256 _amount)
        public
        onlyAdmin(msg.sender)
        onlyAllowedTokens(_tokenAddress)
    {
        IERC20(_tokenAddress).transfer(adminAddress, _amount);
    }
}
