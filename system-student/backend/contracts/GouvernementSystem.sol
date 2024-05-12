// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Gouvernement system blockchain exemple for  users
contract GouvernementSystem {
    struct User {
        string cni;
        string cne;
        string name;
        string email;
    }

    mapping(string => User) public users;
    mapping(string => string) cneToCNI;

    uint256 public userCount;

    event UserRegistered(string _cni, string name);

    // Register a new user
    function registerUser(
        string memory _cni,
        string memory _cne,
        string memory _email,
        string memory _name
    ) public {
        User storage newUser = users[_cne];
        newUser.cni = _cni;
        newUser.cne = _cne;
        newUser.email = _email;
        newUser.name = _name;



        userCount++;
        emit UserRegistered(_cne, _name);
    }

    // Get user data
    function getUser(string memory _cne) public view returns (string memory, string memory, string memory, string memory) {
        User memory user = users[_cne];
        return (user.cni, user.cne, user.name, user.email);
    }
}