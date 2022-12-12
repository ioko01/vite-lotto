import { Link } from "react-router-dom";

export function Home() {
    return (
        <div id="home" className="flex flex-row">
            <div className="p-2 xl:basis-1/5 lg:basis-1/4 basis-1/3">
                <Link to="/bill" className="flex flex-col items-center text-white bg-green-600 rounded-none shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="flex flex-row items-center p-2 w-full">
                        <img className="object-cover w-auto h-96 h-auto rounded-none" src="../../public/jones.jpg" alt="jones" />
                        <div className="flex text-end w-full flex-col justify-between leading-normal">
                            <h5 className="text-sm font-bold tracking-tight dark:text-white">ดาวโจนส์ VIP
                                <br />
                                2022-12-06 05:00:00</h5>
                        </div>
                    </div>

                    <hr className="w-full" />
                    <div className="w-full text-xs px-2">
                        <p className="flex justify-between w-full">
                            <span className="font-light">เวลาปิด</span>
                            <span className="font-light">2022-12-06 12:10:00</span>
                        </p>
                        <p className="flex justify-between w-full">
                            <span className="font-light">สถานะ</span>
                            <span className="font-light">ปิดรับใน 00:46:25</span>
                        </p>
                    </div>
                </Link>
            </div>

        </div>
    )
}