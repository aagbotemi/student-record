const helpers = require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config({ path: ".env" });
import { ethers } from "hardhat";

// Contract creation Txn Hash: 0xd2b593da3995a1a34a313b3bc53d40a76da8d6a4e1b0e47f622cf0013c143a5e
// Create Student Record Txn Hash: 0xd306ae324415cd6e122b8afbb3ee3fd14b7d77efd5a3c70175f7eccaa1a12de9
// Update Student Record Txn HAsh: 0xab5d15e3ca91195d62aaea9f3f8321722696437b5252d2359ff59a44b356d91b
// Create Another Student Record Txn Hash: 0xbee3fb349c060128e55bd3b89f56be6c270b8baa3d5d656aaceca5cf247daa7c


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
