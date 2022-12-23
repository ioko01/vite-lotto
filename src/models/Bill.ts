import { ILotto } from "./Lotto";
import { IInitialState } from "./Main";
import { IRate } from "./Rate";
import { IStore } from "./Store";

export type TBillStatus = "WAIT" | "CANCEL" | "REWARD"

export interface IBill extends IInitialState {
    store: IStore //ไอดีร้าน
    lotto: ILotto //ไอดีหวย
    rate: IRate //ไอดีเรทการจ่าย
    times: string //งวดที่ออก
    one_digits: string //เลขวิ่ง ตัวเลข/ราคาบน/ราคาล่าง ==> [1:5000:5000:0, 3:5000:0:0]
    two_digits: string //เลข 2 ตัว ตัวเลข/ราคาบน/ราคาล่าง/ราคาจ่ายโต๊ด [01:5:5:0, 10:5:5:0, 02:10:5:0, 20:10:5:0]
    three_digits: string //เลข 3 ตัว ตัวเลข/ราคาบน/ราคาล่าง/ราคาจ่ายโต๊ด [011:5:0:5, 101:5:0:5, 025:5:0:5, 205:5:0:5]
    reward: string //ถูกรางวัล
    note: string //หมายเหตุ
    status: TBillStatus //สถานะ
}