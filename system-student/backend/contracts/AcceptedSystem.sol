// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// for accepted students  in ENSET contest
contract AcceptedSystem {
    struct User {
        string cni;
        string cne;
        string name;
        string email;
        string major;
    }

    mapping(string => User) public users;
    mapping(string => string) cneToCNI;
    mapping(string => bool) cniExists;
    mapping(string => bool) cneExists;

    modifier uniqueCNI(string memory _cni) {
        require(!cniExists[_cni], "CNI already exists");
        _;
    }

    modifier uniqueCNE(string memory _cne) {
        require(!cneExists[_cne], "CNE already exists");
        _;
    }

    uint256 public userCount;

    event UserRegistered(string _cni, string name);

    // Register a new user
    function registerUser(
        string memory _cni,
        string memory _cne,
        string memory _email,
        string memory _name,
        string memory _major

    ) public uniqueCNI(_cni) uniqueCNE(_cne) {
        User storage newUser = users[_cni];
        newUser.cni = _cni;
        newUser.cne = _cne;
        newUser.email = _email;
        newUser.name = _name;
        newUser.major = _major;
        cneToCNI[_cne] = _cni;
        cniExists[_cni] = true;
        cneExists[_cne] = true;

        userCount++;
        emit UserRegistered(_cni, _name);
    }

    // Get user data
    function getUser(string memory _cni) public view returns (User memory) {
        return users[_cni];
    }
}