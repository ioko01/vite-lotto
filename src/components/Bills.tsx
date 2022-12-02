export function Bills() {
    return (<div className="flex flex-row">
        <div className="basis-1/4">
            <a href="#" className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/docs/images/blog/image-4.jpg" alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ORDER 1</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">งวดที่</p>
                </div>
            </a>
        </div>
    
    </div>)
}