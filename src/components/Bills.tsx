export function Bills() {
    return (
        <div id="bill" className="flex flex-row">
            <div className="basis-3/6 w-full p-2">
                <div id="bill_content" style={{ minWidth: "420px", maxWidth: "568px" }} className="flex flex-col items-center">
                    <div id="bill_header" className="flex flex-col items-center rounded-lg border w-full mb-3 p-2">
                        <div className="flex justify-between w-full p-2">
                            <span>order 1</span>
                            <span>2022-12-65</span>
                        </div>
                        <div className="flex justify-between w-full p-2">
                            <span>อัตราจ่าย</span>
                            <span>95</span>
                            <span>ดูรายละเอียด</span>
                            <span><img src="..." alt="รูป" className="object-cover" /></span>
                        </div>
                    </div>

                    <div id="bill_body" className="flex flex-col items-center rounded-lg border w-full mb-3 p-2">
                        <div className="w-full p-2">
                            <span>order 1</span>
                        </div>
                        <div className="flex justify-between w-full p-2">
                            <span>order 1</span>
                            <span>2022-12-65</span>
                        </div>
                        <div className="border-t w-full"></div>
                        <div className="flex justify-evenly w-full p-2">
                            <div className="w-full">
                                <button style={{ width: "60px" }} className="text-xs bg-white hover:bg-gray-200 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow mx-2 mb-2">2 ตัว</button>
                                <button style={{ width: "60px" }} className="text-xs bg-white hover:bg-gray-200 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow mx-2 mb-2">3 ตัว</button>
                                <button style={{ width: "60px" }} className="text-xs bg-white hover:bg-gray-200 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow mx-2 mb-2">6 กลับ</button>
                                <button style={{ width: "60px" }} className="text-xs bg-white hover:bg-gray-200 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow mx-2 mb-2">19 ประตู</button>
                                <button style={{ width: "60px" }} className="text-xs bg-white hover:bg-gray-200 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow mx-2 mb-2">เลขวิ่ง</button>
                                <button style={{ width: "60px" }} className="text-xs bg-white hover:bg-gray-200 text-gray-800 font-semibold p-2 border border-gray-400 rounded shadow mx-2 mb-2">วินเลข</button>
                            </div>
                            <div>
                                <img src="..." alt="รูป" />
                            </div>
                        </div>
                        <div className="flex justify-between w-full p-2">
                            <div id="show_digit_temps">

                            </div>
                            <div id="remove_digit_temps">
                                <button style={{ width: "60px" }} className="inline-flex text-xs bg-red-500 hover:bg-red-400 text-white font-light p-2 rounded shadow mx-2 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg> ยกเลิก</button>
                            </div>
                        </div>

                        <div className="flex justify-between w-full p-2">
                            <button style={{ width: "60px" }} className="inline-flex text-xs bg-green-600 hover:bg-green-700 text-white font-light p-2 rounded shadow mx-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                เลขเบิ้ล</button>
                        </div>
                        <div className="border-t w-full"></div>
                        <div className="flex justify-around p-2 pt-4 gap-4">
                            <div className="relative z-0">
                                <input type={"text"} id="input_digits" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="input_digits" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ใส่เลข</label>
                            </div>
                            <button style={{ minWidth: "60px" }} className="whitespace-nowrap items-center text-xs bg-orange-500 hover:bg-orange-400 text-white font-light p-2 rounded shadow">กลับเลข</button>
                            <div className="relative z-0">
                                <input type={"number"} id="input_price_top" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="input_price_top" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">บน</label>
                            </div>
                            <div className="relative z-0">
                                <input type={"number"} id="input_price_bottom" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="input_price_bottom" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ล่าง</label>
                            </div>
                            <button style={{ minWidth: "60px" }} className="whitespace-nowrap items-center inline-flex text-xs bg-green-600 hover:bg-green-500 text-white font-light p-2 rounded shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                เพิ่มบิล</button>
                        </div>
                        <div className="flex justify-between w-full p-2">
                            <div id="show_digit_orders">

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
                            <span>4 บาท</span>
                        </div>
                        <div className="flex justify-center w-full p-2 gap-2">
                            <button style={{ minWidth: "60px" }} className="whitespace-nowrap text-xs bg-blue-600 hover:bg-blue-500 text-white font-light p-2 rounded shadow">บันทึก</button>
                            <button style={{ minWidth: "60px" }} className="whitespace-nowrap inline-flex text-xs bg-green-600 hover:bg-green-500 text-white font-light p-2 rounded shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg> คัดลอกโพย</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="basis-3/6">

            </div>
        </div>
    )
}