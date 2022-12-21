import { db } from "../utils/firebase";
import { collection, getDoc, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export type TStatus = "WAIT" | "CANCEL" | "REWARD"

export interface IBill {
    lotto_id: string
    user_created_id: string
    store_id: string
    rate_id: string
    times: Date
    one_digits_t: string
    one_digits_b: string
    two_digits_t: string
    two_digits_b: string
    two_digits_toad: string
    three_digits_t: string
    three_digits_b: string
    three_digits_toad: string
    reward: string
    note: string
    status: TStatus
}

export interface IBillDoc extends IBill {
    id: string;
}

const dbName = "bills"
const billCollectionRef = collection(db, dbName)

class BillController {

    getBill = async () => {
        const { docs } = await getDocs(billCollectionRef)
        return docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as IBillDoc
        })
    }

    addBill = async (bill: IBill) => {
        return addDoc(billCollectionRef, bill)
    }

    updateBill = async (id: string, bill: IBill) => {
        const tutorialDoc = doc(db, dbName, id)
        return updateDoc(tutorialDoc, dbName, bill)
    }
}

export default new BillController()