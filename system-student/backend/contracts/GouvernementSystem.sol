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
        User storage newUser = users[_cni];
        newUser.cni = _cni;
        newUser.cne = _cne;
        newUser.email = _email;
        newUser.name = _name;



        userCount++;
        emit UserRegistered(_cni, _name);
    }

    // Get user data
    function getUser(string memory _cni) public view returns (User memory) {
        return users[_cni];
    }
}