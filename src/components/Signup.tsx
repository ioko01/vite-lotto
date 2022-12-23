import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import TutorialHelperClass, { ITutorialDoc } from "../helpers/Tutorial";

function Signup() {
    const user = useContext(AuthContext);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const tutorialRef = useRef<HTMLInputElement>(null);
    const studentsRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    // console.log(user.auth.currentUser);
    const [tutorials, setTutorials] = useState<ITutorialDoc[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchTutorials = async () => {
        const tutorials = await TutorialHelperClass.getTutorials()
        setTutorials(tutorials)
    }

    useEffect(() => {
        fetchTutorials()
    }, [])

    console.log(tutorials)

    const addCourse = async () => {
        try {
            setIsLoading(true)
            await TutorialHelperClass.addTutorial({
                name: tutorialRef.current!.value,
                students: parseInt(studentsRef.current!.value),
                type: typeRef.current!.value
            })
        } catch (error) {
            console.log(error);
            alert(error)
        } finally {
            setIsLoading(false)
            fetchTutorials()
        }
    }


    // const createAccount = async () => {
    //     try {
    //         await createUserWithEmailAndPassword(
    //             auth,
    //             usernameRef.current!.value,
    //             passwordRef.current!.value
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const signIn = async () => {
    //     try {
    //         await signInWithEmailAndPassword(
    //             auth,
    //             usernameRef.current!.value,
    //             passwordRef.current!.value
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const signOut = async () => {
    //     await auth.signOut();
    // };

    return (
        <>
            <form className="mt-4" id="formSignup">
                <input ref={usernameRef} type={"text"} id="username" name="username" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Username" />
                <input ref={passwordRef} type={"password"} id="password" name="password" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Password" />
                <input ref={tutorialRef} type={"text"} id="tutorialRef" name="tutorialRef" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="tutorialRef" />
                <input ref={studentsRef} type={"number"} id="studentsRef" name="studentsRef" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="studentRef" />
                <input ref={typeRef} type={"text"} id="typeRef" name="typeRef" className="block h-8 py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="typeRef" />
                <button type={"button"} onClick={addCourse}>Add</button>
                {/* <button type={"button"}>Sign In</button> */}
                {/* <button type={"button"}>Sign Out</button> */}
            </form>
        </>
    );
}

export default Signup;