import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addBill } from "../redux/features/bill/billSlice";
import { TDigit } from "./Bill";

interface Props {
    digit: string
    type: string
    index: number
}

function TableBill({ digit, type, index }: Props) {

    return (
        <tr>
            <td className="border px-1 font-light">{type}</td>
            <td className="border px-1 font-light">{digit.split(":")[0]}</td>
            <td className="border px-1 font-light">{digit.split(":")[index]}</td>
            <td className="border px-1 font-light">95.00</td>
            <td className="border px-1 font-light">0.00</td>
            <td className="border px-1 font-light text-center">
                <button className="text-xs text-red-600 hover:text-red-400 font-bold p-2 rounded shadow mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg></button>
            </td>
        </tr>
    )
}

export function BillCheck() {
    const dispatch = useAppDispatch()
    const bills = useAppSelector(state => state.bill)

    return (
        <div id="bill_check" className="flex flex-col">
            <div className="basis-full w-full p-2">
                <div id="bill_time" className="flex flex-col w-full mb-3 p-2 text-red-500">
                    เหลือเวลา 02: 35: 08
                </div>
            </div>
            <div className="flex flex-row">
                <div className="basis-3/6 w-full p-2">
                    <div id="bill_content" style={{ minWidth: "420px", maxWidth: "568px" }} className="flex flex-col items-center">

                        <div id="bill_header" className="flex flex-col items-center rounded-lg border border-green-400 bg-green-100 w-full mb-3 p-2">
                            <div className="flex justify-between w-full p-2">
                                <span>ดาวโจนส์ VIP</span>
                                <span>2022-12-65</span>
                            </div>
                            <div className="flex justify-between w-full p-2">
                                <span>อัตราจ่าย</span>
                                <span>95</span>
                                <span>ดูรายละเอียด</span>
                                <span><img width={60} src="../../public/jones.jpg" alt="jones" className="object-cover" /></span>
                            </div>
                        </div>

                        <div id="bill_body" className="flex flex-col items-center w-full mb-3 p-2">
                            <table className="w-full">
                                <caption className="text-left text-lg">รายการแทง</caption>
                                <thead className="bg-blue-800 text-white">
                                    <tr>
                                        <th>ประเภท</th>
                                        <th>หมายเลข</th>
                                        <th>ยอดเดิมพัน</th>
                                        <th>เรทจ่าย</th>
                                        <th>ส่วนลด</th>
                                        <th>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bills.map((bill) => (
                                        bill.digit_type === "TWO" ?
                                            bill.digit.map((digit, index) =>
                                                <>
                                                    {digit.split(":")[1] != "0" && <TableBill key={"two_t" + index} digit={digit} type={"2 ตัวบน"} index={1} />}
                                                    {digit.split(":")[2] != "0" && <TableBill key={"two_b" + index} digit={digit} type={"2 ตัวล่าง"} index={2} />}
                                                </>
                                            )
                                            :
                                            bill.digit_type === "THREE" ?
                                                bill.digit.map((digit, index) =>
                                                    <>
                                                        {digit.split(":")[1] != "0" && <TableBill key={"three_t" + index} digit={digit} type={"3 ตัวบน"} index={1} />}
                                                        {digit.split(":")[2] != "0" && <TableBill key={"three_b" + index} digit={digit} type={"3 ตัวโต๊ด"} index={2} />}
                                                    </>
                                                )
                                                : null
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div id="bill_footer" className="flex flex-col items-center rounded-lg w-full mb-3 p-2">
                            <div className="flex justify-center w-full p-2 gap-2">
                                <span>หมายเหตุ: พี่อิน</span>
                            </div>
                            <div className="flex justify-center w-full p-2 gap-2">
                                <span>รวม:</span>
                                <span>4 บาท</span>
                            </div>
                            <div className="flex justify-center w-full p-2 gap-2">
                                <Link to="/bill">
                                    <button onClick={() => dispatch(addBill(bills))} style={{ minWidth: "60px" }} className="whitespace-nowrap text-xs bg-gray-400 hover:bg-gray-500 text-white font-light p-2 rounded shadow">ย้อนกลับ</button>
                                </Link>
                                <Link to="/bill/check">
                                    <button style={{ minWidth: "60px" }} className="whitespace-nowrap text-xs bg-blue-600 hover:bg-blue-500 text-white font-light p-2 rounded shadow">ยืนยัน</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}