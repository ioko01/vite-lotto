import { InputHTMLAttributes, KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addBill, deleteBill } from "../redux/features/bill/billSlice";
import { TWO, THREE, ONE } from "../models/Type";

export type TDigit = "ONE" | "TWO" | "THREE" | "SIX" | "NINETEEN" | "WIN"

export interface Bill {
    digit_type: TDigit
    digit: string[]
}

export function Bill() {

    const [digitsType, setDigitsType] = useState<TDigit>("TWO")
    const [digitsTemp, setDigitsTemp] = useState<string[]>([])
    const [billTemp, setBillTemp] = useState<Bill[]>([])
    const [price, setPrice] = useState<number[]>([])
    const digitRef = useRef<HTMLInputElement>(null)
    const priceTopRef = useRef<HTMLInputElement>(null)
    const priceBottomRef = useRef<HTMLInputElement>(null)
    const regex = /[\D\sa-zA-Zก-ฮ]/;

    const dispatch = useAppDispatch()
    const bills = useAppSelector(state => state.bill)

    const setDigitValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const value = e.currentTarget!.value as TDigit
        if (digitsTemp.length > 0) {
            alert(value)
        } else {
            setDigitsType(value)
            document.getElementById("input_digits")!.focus()
        }
    }

    const addDigitDoubleAndTripleValue = () => {
        if (TWO.includes(digitsType)) {
            setDigitsTemp([...digitsTemp, "00", "11", "22", "33", "44", "55", "66", "77", "88", "99"])
        } else if (THREE.includes(digitsType)) {
            setDigitsTemp([...digitsTemp, "000", "111", "222", "333", "444", "555", "666", "777", "888", "999"])
        }
        document.getElementById("input_digits")!.focus()
    }

    const inputTemps = () => {
        if (ONE.includes(digitsType)) {
            const digits = digitRef.current!.value.split(regex);
            digits.map((digit) => {
                if (digit.length === 1) {
                    digitRef.current!.value = ""
                    const digitFilter = digits.filter((digit) => digit != "" && digit.length === 1)
                    setDigitsTemp([...digitsTemp].concat(digitFilter))
                }
            })
        } else if (TWO.includes(digitsType)) {
            const digits = digitRef.current!.value.split(regex);
            digits.map((digit) => {
                if (digitsType === "TWO") {
                    if (digit.length === 2) {
                        digitRef.current!.value = ""
                        const digitFilter = digits.filter((digit) => digit != "" && digit.length === 2)
                        setDigitsTemp([...digitsTemp].concat(digitFilter))
                    }
                } else if (digitsType === "NINETEEN") {
                    if (digit.length === 1) {
                        digitRef.current!.value = ""
                        const digitFilter = digits.filter((digit) => digit != "" && digit.length === 1)

                        let digitNineteen = []
                        let digitNineteenRevers = []
                        for (let i = 0; i < 10; i++) {
                            digitNineteen[i] = digitFilter.concat(String(i)).join("")
                            digitNineteenRevers[i] = digitFilter.concat(String(i)).reverse().join("")
                        }
                        const digitNineteenReversResult = digitNineteenRevers.filter(digit => digit[0] != digit[1])
                        setDigitsTemp([...digitsTemp].concat(digitNineteen.concat(digitNineteenReversResult)))
                    }
                }
            })
        } else if (THREE.includes(digitsType)) {
            const digits = digitRef.current!.value.split(regex);
            digits.map((digit) => {
                if (digit.length == 3) {
                    digitRef.current!.value = ""
                    const digitFilter = digits.filter((digit) => digit != "" && digit.length === 3)
                    setDigitsTemp([...digitsTemp].concat(digitFilter))
                }
            })

        }
    }

    const inputTempsKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const spacebar = "space"
        if (e.code.toLowerCase() === spacebar) {
            digitRevers()
            digitRef.current!.value = ""
        }
    }

    const digitRevers = () => {
        if (TWO.includes(digitsType)) {
            if (digitsType === "TWO") {
                const digitRevers = digitsTemp.map((digitTemp) => {
                    const split = digitTemp.split("")
                    return split.reverse().join("")
                })
                const digitFilter = digitRevers.filter(digit => digit[0] != digit[1])
                setDigitsTemp([...digitsTemp].concat(digitFilter))
            }
        } else if (THREE.includes(digitsType)) {
            const digitRevers = digitsTemp.map((digitTemp) => {
                const split = digitTemp.split("")
                let tmp: string[] = []
                split.map((_, index) => {
                    let arrTemp = []
                    for (let i = 0; i < 3; i++) {
                        if (i !== index) {
                            arrTemp.push(i)
                        }
                    }
                    tmp.push(split[index].concat(split[arrTemp[0]], split[arrTemp[1]]))
                    tmp.push(split[index].concat(split[arrTemp[1]], split[arrTemp[0]]))
                })
                return tmp
            })
            const digitFilter = new Set(digitRevers[0])
            console.log(new Array(digitFilter))
            // setDigitsTemp([...digitsTemp].concat(digitFilter))
        }
    }

    const addBillTempKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const tab = "tab"
        if (e.code.toLowerCase() === tab) {
            addBillTemp()
        }
    }

    const addBillTemp = () => {
        const bill = digitsTemp.map((digitTemp) => {
            return digitTemp + ":" + (priceTopRef.current?.value ? priceTopRef.current!.value : "0") + ":" + (priceBottomRef.current?.value ? priceBottomRef.current!.value : "0")
        })

        if (bill.length > 0) {
            if (!priceTopRef.current?.value && !priceBottomRef.current?.value) {
                alert("กรุณาใส่ราคา");
            } else {
                const priceSum = ((priceTopRef.current!.value ? parseInt(priceTopRef.current!.value) : 0) * bill.length) + ((priceBottomRef.current?.value ? parseInt(priceBottomRef.current!.value) : 0) * bill.length)
                setPrice([...price, priceSum])

                setBillTemp([...billTemp, { digit_type: digitsType, digit: bill }])
                priceTopRef.current!.value = ""
                priceBottomRef.current!.value = ""
                setDigitsTemp([])
            }
        }

        setTimeout(() => {
            document.getElementById("input_digits")!.focus()
        }, 100)
    }

    const removeDigitTemp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        setDigitsTemp(digitsTemp.filter((_, index) => index !== parseInt(e.currentTarget.value)))


    const removeBillTemp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setBillTemp(billTemp.filter((_, index) => index !== parseInt(e.currentTarget.value)))
        setPrice(price.filter((_, index) => index !== parseInt(e.currentTarget.value)))
    }

    useEffect(() => {
        if (bills.length > 0) {
            setBillTemp(bills)
            dispatch(deleteBill())
        }
    }, [digitsTemp, billTemp, price])

    return (
        <div id="bill" className="flex flex-col" onLoad={() => document.getElementById("input_digits")!.focus()}>
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
                                <span>95 อัตราจ่ายเริ่มต้น</span>
                                <span>ดูรายละเอียด</span>
                                <span><img width={60} src="../../public/jones.jpg" alt="jones" className="object-cover" /></span>
                            </div>
                        </div>

                        <div id="bill_body" className="flex flex-col items-center rounded-lg border border-green-400 bg-green-100 w-full mb-3 p-2">
                            <div className="w-full p-2">
                                <span>แทงเร็ว</span>
                            </div>
                            <div className="flex justify-between w-full p-2">
                                <span>ดาวโจนส์ VIP</span>
                                <span>2022-12-65</span>
                            </div>
                            <div className="border-t w-full"></div>
                            <div className="flex justify-evenly w-full p-2">
                                <div className="w-full">
                                    <button value={"TWO" as TDigit} onClick={setDigitValue} style={{ width: "60px" }} className={"text-xs bg-white text-gray-800 font-semibold p-2 border rounded shadow mx-2 mb-2 " + (digitsType === "TWO" ? "bg-green-400 border-green-500" : "bg-gray-100 border-gray-400 hover:bg-gray-200")}>2 ตัว</button>
                                    <button value={"THREE" as TDigit} onClick={setDigitValue} style={{ width: "60px" }} className={"text-xs bg-white text-gray-800 font-semibold p-2 border rounded shadow mx-2 mb-2 " + (digitsType === "THREE" ? "bg-green-400 border-green-500" : "bg-gray-100 border-gray-400 hover:bg-gray-200")}>3 ตัว</button>
                                    <button value={"SIX" as TDigit} onClick={setDigitValue} style={{ width: "60px" }} className={"text-xs bg-white text-gray-800 font-semibold p-2 border rounded shadow mx-2 mb-2 " + (digitsType === "SIX" ? "bg-green-400 border-green-500" : "bg-gray-100 border-gray-400 hover:bg-gray-200")}>6 กลับ</button>
                                    <button value={"NINETEEN" as TDigit} onClick={setDigitValue} style={{ width: "60px" }} className={"text-xs bg-white text-gray-800 font-semibold p-2 border rounded shadow mx-2 mb-2 " + (digitsType === "NINETEEN" ? "bg-green-400 border-green-500" : "bg-gray-100 border-gray-400 hover:bg-gray-200")}>19 ประตู</button>
                                    <button value={"ONE" as TDigit} onClick={setDigitValue} style={{ width: "60px" }} className={"text-xs bg-white text-gray-800 font-semibold p-2 border rounded shadow mx-2 mb-2 " + (digitsType === "ONE" ? "bg-green-400 border-green-500" : "bg-gray-100 border-gray-400 hover:bg-gray-200")}>เลขวิ่ง</button>
                                    <button value={"WIN" as TDigit} onClick={setDigitValue} style={{ width: "60px" }} className={"text-xs bg-white text-gray-800 font-semibold p-2 border rounded shadow mx-2 mb-2 " + (digitsType === "WIN" ? "bg-green-400 border-green-500" : "bg-gray-100 border-gray-400 hover:bg-gray-200")}>วินเลข</button>
                                </div>
                                <div>
                                    <img width={60} src="../../public/jones.jpg" alt="jones" />
                                </div>
                            </div>
                            <div className="flex justify-between w-full p-2">
                                <div id="show_digit_temps">
                                    {
                                        digitsTemp.map((digit, index) => <button onClick={removeDigitTemp} value={index} key={index} style={{ width: "40px" }} className={"text-xs bg-white text-white font-semibold bg-blue-600 hover:bg-blue-700 p-3 border rounded shadow mx-1 mb-2"}>{digit}</button>)
                                    }

                                </div>
                                <div id="remove_digit_temps">
                                    <button onClick={() => setDigitsTemp([])} style={{ width: "60px" }} className="whitespace-nowrap inline-flex text-xs bg-red-500 hover:bg-red-400 text-white font-light p-2 rounded shadow mx-2 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        &nbsp;ยกเลิก</button>
                                </div>
                            </div>

                            <div className="flex justify-between w-full p-2">
                                {
                                    TWO.includes(digitsType) ?
                                        <button onClick={addDigitDoubleAndTripleValue} style={{ width: "60px" }} className="whitespace-nowrap inline-flex text-xs bg-green-600 hover:bg-green-700 text-white font-light p-2 rounded shadow mx-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            &nbsp;เลขเบิ้ล</button>
                                        : THREE.includes(digitsType) &&
                                        <button onClick={addDigitDoubleAndTripleValue} style={{ width: "60px" }} className="whitespace-nowrap inline-flex text-xs bg-green-600 hover:bg-green-700 text-white font-light p-2 rounded shadow mx-2 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            &nbsp;เลขตอง</button>
                                }

                            </div>
                            <div className="border-t w-full"></div>
                            <div className="flex justify-around p-2 pt-4 gap-4">
                                <div className="relative z-0">
                                    <input tabIndex={1} ref={digitRef} onKeyUp={inputTempsKey} onChange={inputTemps} type={"text"} id="input_digits" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label htmlFor="input_digits" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ใส่เลข</label>
                                </div>
                                <button onClick={digitRevers} style={{ minWidth: "60px" }} className="whitespace-nowrap items-center text-xs bg-orange-500 hover:bg-orange-400 text-white font-light p-2 rounded shadow">กลับเลข</button>
                                <div className="relative z-0">
                                    <input tabIndex={2} ref={priceTopRef} type={"number"} id="input_price_top" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label htmlFor="input_price_top" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">บน</label>
                                </div>
                                <div className="relative z-0">
                                    <input onKeyDown={addBillTempKey} tabIndex={3} ref={priceBottomRef} type={"number"} id="input_price_bottom" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                    <label htmlFor="input_price_bottom" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{["ONE", "TWO", "NINETEEN", "WIN"].includes(digitsType) ? "ล่าง" : "โต๊ด"}</label>
                                </div>
                                <button onClick={addBillTemp} style={{ minWidth: "60px" }} className="whitespace-nowrap items-center inline-flex text-xs bg-green-600 hover:bg-green-500 text-white font-light p-2 rounded shadow">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    &nbsp;เพิ่มบิล</button>
                            </div>
                            <div className="flex justify-between w-full p-2">
                                <div id="show_digit_orders" className="flex flex-col w-full">
                                    {
                                        billTemp!.map((bill, index) => (
                                            <div key={"bill_" + index} className="flex flex-row w-full bg-gray-100 justify-center items-center my-2">
                                                {
                                                    bill.digit[0] && ONE.includes(bill.digit_type) ?
                                                        <div className="p-2 px-4 mx-auto text-center">วิ่ง<br />บน x ล่าง<br />{bill.digit[0].split(":")[1]} x {bill.digit[0].split(":")[2]}</div>
                                                        : bill.digit[0] && TWO.includes(bill.digit_type) ?
                                                            <div className="p-2 px-4 mx-auto text-center">2 ตัว<br />บน x ล่าง<br />{bill.digit[0].split(":")[1]} x {bill.digit[0].split(":")[2]}</div>
                                                            : bill.digit[0] && THREE.includes(bill.digit_type) &&
                                                            <div className="p-2 px-4 mx-auto text-center">3 ตัว<br />บน x โต๊ด<br />{bill.digit[0].split(":")[1]} x {bill.digit[0].split(":")[2]}</div>
                                                }
                                                <div key={"digit_" + index} className="w-3/5 h-full bg-white p-2">
                                                    {
                                                        bill.digit.map((digit, index) => (
                                                            <span style={{ width: "20px" }} key={"number_" + index} className="inline-block font-light">{digit!.split(":")[0]!}&nbsp;</span>
                                                        ))
                                                    }
                                                </div>
                                                <div key={"delete_" + index} className="mx-auto text-center">
                                                    <button onClick={removeBillTemp} value={index} className="whitespace-nowrap inline-flex text-xs text-red-600 hover:text-red-400 font-light p-2 rounded shadow mx-2 mb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                        &nbsp;</button>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                                <div id="remove_digit_orders"></div>
                            </div>
                        </div>

                        <div id="bill_footer" className="flex flex-col items-center rounded-lg w-full mb-3 p-2">
                            <div className="flex justify-center w-full p-2 gap-2">
                                <span>หมายเหตุ: </span>
                                <input type="text" className="border-b w-full" />
                            </div>
                            <div className="flex justify-center w-full p-2 gap-2">
                                <span>รวม:</span>
                                <span>{price.reduce((price, current) => price + current, 0)} บาท</span>
                            </div>
                            <div className="flex justify-center w-full p-2 gap-2">
                                <button style={{ minWidth: "60px" }} className="whitespace-nowrap inline-flex text-xs bg-green-600 hover:bg-green-500 text-white font-light p-2 rounded shadow">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                    &nbsp;Screenshot</button>
                                <Link to="/bill/check">
                                    <button onClick={() => dispatch(addBill(billTemp))} style={{ minWidth: "60px" }} className="whitespace-nowrap text-xs bg-blue-600 hover:bg-blue-500 text-white font-light p-2 rounded shadow">บันทึก</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-3/6 w-full p-2">
                    <table id="statics" className="w-full mb-3">
                        <thead className="bg-red-500 text-white">
                            <tr>
                                <th>สถิติรางวัล</th>
                                <th>5 งวดล่าสุด</th>
                                <th>3 ตัวบน</th>
                                <th>2 ตัวบน</th>
                                <th>2 ตัวล่าง</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-1 font-light">ดาวน์โจนส์ VIP</td>
                                <td className="border px-1 font-light">2022-12-09</td>
                                <td className="border px-1 font-light">231</td>
                                <td className="border px-1 font-light">31</td>
                                <td className="border px-1 font-light">22</td>
                            </tr>
                        </tbody>
                    </table>

                    <table id="digits_close" className="w-full mb-3">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th>เลขมาแรง</th>
                                <th>จ่ายครึ่ง</th>
                                <th>ปิดรับ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-1 font-light">2 ตัวบน</td>
                                <td className="border px-1 font-light"></td>
                                <td className="border px-1 font-light"></td>
                            </tr>
                            <tr>
                                <td className="border px-1 font-light">2 ตัวล่าง</td>
                                <td className="border px-1 font-light"></td>
                                <td className="border px-1 font-light"></td>
                            </tr>
                            <tr>
                                <td className="border px-1 font-light">3 ตัวบน</td>
                                <td className="border px-1 font-light"></td>
                                <td className="border px-1 font-light"></td>
                            </tr>
                            <tr>
                                <td className="border px-1 font-light">3 ตัวโต๊ด</td>
                                <td className="border px-1 font-light"></td>
                                <td className="border px-1 font-light"></td>
                            </tr>
                            <tr>
                                <td className="border px-1 font-light">วิ่งบน</td>
                                <td className="border px-1 font-light"></td>
                                <td className="border px-1 font-light"></td>
                            </tr>
                            <tr>
                                <td className="border px-1 font-light">วิ่งล่าง</td>
                                <td className="border px-1 font-light"></td>
                                <td className="border px-1 font-light"></td>
                            </tr>
                        </tbody>
                    </table>

                    <table id="last_order" className="w-full mb-3">
                        <caption className="text-start">รายการบิลล่าสุด (แสดง 15 รายการ)</caption>
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th>เวลาแทง</th>
                                <th>ตลาด</th>
                                <th>รายการ</th>
                                <th>บาท</th>
                                <th>หมายเหตุ</th>
                                <th>ลบโพย</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-1 font-light">2022-12-10 16:57:40</td>
                                <td className="border px-1 font-light">ฮานอยพิเศษ#2022-12-10</td>
                                <td className="border px-1 font-light">20</td>
                                <td className="border px-1 font-light">230</td>
                                <td className="border px-1 font-light">ขวัญสุดา</td>
                                <td className="border px-1 font-light text-center">
                                    <button className="text-xs text-red-600 hover:text-red-500 font-light p-2 rounded shadow mx-2 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}