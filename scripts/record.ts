const helpers = require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";

async function main() {
    // const [owner, user1, user2] = await ethers.getSigners();
    const RecordFactory = await ethers.getContractFactory("Record");
    const recordFactory = await RecordFactory.deploy();
    await recordFactory.deployed();

    console.log("Record is deployed to this contract: ", recordFactory.address);

    const user1 = "0x7A3E0DFf9B53fA0d3d1997903A48677399b22ce7";
    const user2 = "0x8D5b0F873c00F8e8EA7FEF0C24DBdC5Ac2758D26"

    // interacte with create student record
    const createRecordTxn = await recordFactory.createStudentRecord(
        user1,
        "Adekunle Jinadu",
        1,
        80
    )
    const createRecordTxnReciept = await createRecordTxn.wait();
    console.log("Create Student Record Txn Reciept: ", createRecordTxnReciept);


    // get student record
    const getRecordTxn = await recordFactory.getStudentRecord(
        user1
    )
    console.log("Get Student Record Txn Reciept: ", getRecordTxn);

    // update student record
    const updateRecordTxn = await recordFactory.updateStudentRecord(
        user1,
        50
    )
    const updateRecordTxnReciept = await updateRecordTxn.wait();
    console.log("Update Student Record Txn Reciept: ", updateRecordTxnReciept);

    // interacte with another create student record
    const createRecordTxn2 = await recordFactory.createStudentRecord(
        user2,
        "Emmanuel Mesole",
        1,
        75
    )
    const createRecordTxnReciept2 = await createRecordTxn2.wait();
    console.log("Create Student Record Txn Reciept: ", createRecordTxnReciept2);

    // get all record transaction
    const getAllRecordTxn = await recordFactory.getStudentRecordArray(
        [user1,
        user2]
    )
    console.log("Get All Student Record Txn Reciept: ", getAllRecordTxn);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
