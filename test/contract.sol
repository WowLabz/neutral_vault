pragma solidity ^0.5.0;
/// @title A Geometry triangle simulator
/// @author Jean Cavallera
/// @notice Use this contract for only the most basic simulation
/// @dev Contract under development to enable floating point
contract Geometry {
    
    struct Triangle {
        uint side_a;
        uint side_b;
        uint hypothenuse;
    }
    
    /// @notice Math function to calculate square root
    /// @dev Not working with decimal numbers
    /// @param x The number to calculate the square root of
    /// @return y The square root of x
    function sqrt(uint x) internal pure returns (uint y) {
            uint z = (x + 1) / 2;
            y = x;
            while (z < y) {
                y = z;
                z = (x / z + z) / 2;
            }
        }
    
    /// @notice Calculate the hypothenuse length based on x and y
    /// @dev Not working as it returns integers and not float
    /// @param _a Side 1
    /// @param _b Side 2
    /// @return uint the hypothenuse length
    function calculateHypothenuse(uint _a, uint _b) public pure returns (uint) {
        return sqrt((_a * _a) + (_b * _b));
    }
    
    Triangle public my_triangle;
    
    /// @author Jean Cavallera
    /// @notice Enter the two legs of your right angle triangle
    /// @dev This function modifies the state of the variable `my_triangle` and use `calculateHypothenuse()` function
    /// @param _a Side 1
    /// @param _b Side 2
    /// @return string return to user a custom success message
    function createTriangle(uint _a, uint _b) public returns (string memory) {
        my_triangle = Triangle ({
            side_a: _a,
            side_b: _b,
            hypothenuse: calculateHypothenuse(_a, _b)
        });
        return "new triangle created";
    }
    
    
}