import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

type TypeDate = {
    startDate: string | Date | null,
    endDate: string | Date | null
} | null

export function OrderAll() {
    const [isDate, setDate] = useState<TypeDate>({
        startDate: new Date(),
        endDate: new Date().setMonth(11).toString()
    });


    const handleDateChange = (newDate: TypeDate) => {
        setDate(newDate)
    }

    return (
        <div id="order_all" className="flex flex-row">
            <div id="order_content" className="w-full">
                <div id="order_header" className="flex flex-col w-full">
                    <strong className="text-lg h-10 text-[blue]">รายการแทง</strong>
                    <div className="flex flex-col border rounded w-full p-4">
                        <strong>ตัวเลือกการค้นหา</strong>
                        <div className="flex flex-row mt-5">
                            <div className="flex items-center mr-6">
                                <input defaultChecked id="today" type="radio" name="order_filter" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="today" className="font-bold ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">วันนี้</label>
                            </div>
                            <div className="flex items-center mr-6">
                                <input id="yesterday" type="radio" name="order_filter" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="yesterday" className="font-bold ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">เมื่อวาน</label>
                            </div>
                            <div className="flex items-center mr-6">
                                <input id="weeked" type="radio" name="order_filter" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="weeked" className="font-bold ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">สัปดาห์นี้</label>
                            </div>
                            <div className="flex items-center mr-6">
                                <input id="last_week" type="radio" name="order_filter" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="last_week" className="font-bold ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">สัปดาห์ที่แล้ว</label>
                            </div>
                        </div>

                        <div className="flex flex-row mt-5">
                            <div className="flex items-center mr-6">
                                <input id="month" type="radio" name="order_filter" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="month" className="font-bold ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">เดือน</label>
                            </div>
                            <div className="flex items-center mr-6">
                                <label htmlFor="select_month" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                                <select id="select_month" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>-- เลือกเดือน --</option>
                                    <option value="1">มกราคม</option>
                                    <option value="2">กุมภาพันธ์</option>
                                    <option value="3">มีนาคม</option>
                                    <option value="4">เมษายน</option>
                                    <option value="5">พฤษภาคม</option>
                                    <option value="6">มิถุนายน</option>
                                    <option value="7">กรกฎาคม</option>
                                    <option value="8">สิงหาคม</option>
                                    <option value="9">กันยายน</option>
                                    <option value="10">ตุลาคม</option>
                                    <option value="11">พฤษจิกายน</option>
                                    <option value="12">ธันวาคม</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-row mt-5 whitespace-nowrap">
                            <div className="flex items-center mr-6">
                                <input id="custom_date" type="radio" name="order_filter" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="custom_date" className="font-bold ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">เลือกวันที่</label>
                            </div>
                            <div className="flex items-center w-auto border rounded-lg w-auto">
                                <Datepicker
                                    primaryColor="indigo"
                                    i18n="th"
                                    configs={{
                                        footer: {
                                            apply: "ยืนยัน",
                                            cancel: "ยกเลิก"
                                        }
                                    }}
                                    placeholder="ปี-เดือน-วัน ~ ปี-เดือน-วัน"
                                    showFooter={true}
                                    value={isDate}
                                    onChange={handleDateChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-row mt-5">
                            <button className="inline-flex text-xs bg-blue-500 hover:bg-blue-400 text-white font-light p-2 px-4 rounded shadow mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                ค้นหา</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}