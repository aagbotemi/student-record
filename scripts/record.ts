const helpers = require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";

async function main() {
    const [owner, user1, user2] = await ethers.getSigners();
    const RecordFactory = await ethers.getContractFactory("Record");
    const recordFactory = await RecordFactory.deploy();
    await recordFactory.deployed();

    console.log("Record is deployed to this contract: ", recordFactory.address);

    // interacte with create student record
    const createRecordTxn = await recordFactory.createStudentRecord(
        user1.address,
        "Adekunle Jinadu",
        1,
        80
    )
    const createRecordTxnReciept = await createRecordTxn.wait();
    console.log("Create Student Record Txn Reciept: ", createRecordTxnReciept);


    // get student record
    const getRecordTxn = await recordFactory.getStudentRecord(
        user1.address
    )
    console.log("Get Student Record Txn Reciept: ", getRecordTxn);

    // update student record
    const updateRecordTxn = await recordFactory.updateStudentRecord(
        user1.address,
        50
    )
    const updateRecordTxnReciept = await updateRecordTxn.wait();
    console.log("Update Student Record Txn Reciept: ", updateRecordTxnReciept);

    // interacte with another create student record
    const createRecordTxn2 = await recordFactory.createStudentRecord(
        user2.address,
        "Emmanuel Mesole",
        1,
        75
    )
    const createRecordTxnReciept2 = await createRecordTxn2.wait();
    console.log("Create Student Record Txn Reciept: ", createRecordTxnReciept2);

    const getAllRecordTxn = await recordFactory.getStudentRecordArray(
        [user1.address,
        user1.address]
    )
    console.log("Get All Student Record Txn Reciept: ", getAllRecordTxn);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
