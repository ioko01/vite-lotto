import { Link } from "react-router-dom";

export function Home() {
    return (
        <div id="home" className="flex flex-row">
            <div className="p-2 xl:basis-1/5 lg:basis-1/4 basis-1/3">
                <Link to="/bills" className="flex flex-col items-center bg-white border rounded-none shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="flex flex-row items-center p-2 w-full">
                        <img className="object-cover w-auto h-96 h-auto rounded-none" src="" alt="..." />
                        <div className="flex text-end w-full flex-col justify-between leading-normal">
                            <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">ORDER 1
                                <br />
                                2022-12-06 05:00:00</h5>
                        </div>
                    </div>

                    <hr className="w-full" />
                    <div className="w-full text-xs px-2">
                        <p className="flex justify-between w-full">
                            <span>เวลาปิด</span>
                            <span>2022-12-06 12:10:00</span>
                        </p>
                        <p className="flex justify-between w-full">
                            <span>สถานะ</span>
                            <span>ปิดรับใน 00:46:25</span>
                        </p>
                    </div>
                </Link>
            </div>

        </div>
    )
}