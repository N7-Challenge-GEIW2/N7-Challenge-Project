// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentManagementSystem {
    struct Student {
        string cni;
        string cne;
        string name;
        string email;
        Degree[] degrees;
    }

    struct Degree {
        string schoolName;
        string degreeType;
        string major;
        uint256[] scores;
    }

    // Mapping to store student data
    mapping(string => Student) public students;
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


    // Keep track of the number of students
    uint256 public studentCount;

    // Event for logging
    event StudentRegistered(string _cni, string name);
    event DegreeAdded(string _cni, Degree degree);

    // Register a new student
    function registerStudent(string memory _cni,string memory _cne,string memory email,string memory _name) public {
        Student storage newStudent = students[_cni];
        newStudent.cni = _cni;
        newStudent.cne = _cne;
        newStudent.email = email;
        newStudent.name = _name;
        cneToCNI[_cne] = _cni;
        // Update mappings
        cniExists[_cni] = true;
        cneExists[_cne] = true;
        // newStudent.degrees = _degrees;
        studentCount++;
        emit StudentRegistered(_cni, _name);
    }

    // Add a degree to an existing student
    function addDegree(string memory cne, string memory _schoolName, string memory _degreeType, string memory _major, uint256[] memory _scores) public   {
        string storage _cni =cneToCNI[cne];
        students[_cni].degrees.push(Degree(_schoolName, _degreeType, _major, _scores));
        emit DegreeAdded(_cni, Degree(_schoolName, _degreeType, _major, _scores));
    }

    // Get degrees of a student
    function getStudent(string memory _cni) public view returns (string memory, string memory, string memory, string memory, string memory, string memory, string memory, uint256[] memory) {
        Student memory student = students[_cni];
        return (student.cni, student.cne, student.name, student.email, student.degrees[0].degreeType, student.degrees[0].schoolName, student.degrees[0].major, student.degrees[0].scores);
    }

}