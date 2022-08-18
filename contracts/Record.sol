// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Record {
    address owner;


    enum GENDER {
        MALE,
        FEMALE
    }
    struct Student {
        string name;
        // string department;
        uint level;
        GENDER gender;
        uint256[] score;
    }

    mapping(address => Student) studentRecord;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == owner, "Only Admin");
        _;
    }

    function createStudentRecord(address _address, string memory _name, GENDER _gender, uint256 _score) public {
        Student storage s = studentRecord[_address];
        s.name = _name;
        s.gender = _gender;
        s.score.push(_score);
    }

    function getStudentRecord(address _address) public view onlyAdmin returns(Student memory) {
        return studentRecord[_address];
    }

    function getStudentRecordArray(address[] memory _address) public view onlyAdmin returns(Student[] memory c) {
        c = new Student[](_address.length);

        for (uint256 i = 0; i < _address.length; i++) {
            c[i] = studentRecord[_address[i]];
        }
    }

    function updateStudentRecord(address _address, uint _score) public onlyAdmin {
        Student storage s = studentRecord[_address];
        s.score.push(_score);
    }
}