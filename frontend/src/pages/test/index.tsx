import { useEffect, useState } from "react";
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import axios from "axios";

export default function Test() {
    const [users, setUsers] = useState();

    async function getUser() {
        const token = getCookie("access-token");
        const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/users/';
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(response.data.results);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    console.log('__user___', users);

    return (
        <div className="text-black">
            <h1 className="text-2xl font-bold">Hello, Test</h1>
            <h1 className="text-xl">All Users</h1>
            <div className="">
                <ul>
                    {
                        users.map(user => (
                            <li>{" > "}{user.username} ({user.role})</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}