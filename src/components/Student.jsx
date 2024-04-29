import React from "react"
import axios from "axios";
import { useEffect, useState } from "react";
const Student = () => {
    const [studentid, setId] = useState("");
    const [studentname, setStudentname] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [status, setStatus] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load() {
        const result = await axios.get("http://localhost:8081/api/v1/student/get");
        setStudents(result.data);
        console.log(result);
    }

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8081/api/v1/student/add", {
                studentname: studentname,
                address: address,
                mobile: mobile,
                status: status
            });
            alert("Student Registation Successfully");
            setId("");
            setStudentname("");
            setAddress("");
            setMobile("");
            setStatus("");
            Load();
        } catch (err) {
            alert(err);
        }
    }
    async function editStudent(students) {
        setStudentname(students.studentname);
        setAddress(students.address);
        setMobile(students.mobile);
        setStatus(students.status);
        setId(students.studentid);
    }

    async function DeleteStudent(studentid) {
        await axios.delete("http://localhost:8081/api/v1/student/delete/" + studentid);
        alert("Student deleted Successfully");
        Load();
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.put(
                "http://localhost:8081/api/v1/student/update",
                {
                    studentid: studentid,
                    studentname: studentname,
                    address: address,
                    mobile: mobile,
                    status: status
                }
            );
            alert("Student Updateddddd");
            setId("");
            setStudentname("");
            setAddress("");
            setMobile("");
            setStatus("");
            Load();
        } catch (err) {
            alert(err);
        }
    }
    return (
        <div className="mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl">
            <div className="flex justify-between items-center w-full space-x-12">
                <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Student Registation</h1>
            </div>
            <div className="flex justify-between items-center w-full space-x-12">
                <input type="text" className='w-1/2 border-2 borderzinc-800 py-2 pl-2' placeholder='StudentName'
                    id="studentname"
                    value={studentname}
                    onChange={(event) => {
                        setStudentname(event.target.value);
                    }}

                />

                <input type="text" className='w-1/2 border-2 borderzinc-800 py-2 pl-2' placeholder='Address'
                    id="address"
                    value={address}
                    onChange={(event) => {
                        setAddress(event.target.value);
                    }}

                />
            </div>

            <div className="flex justify-between items-center w-full space-x-12">
                <input type="text" className='w-1/2 border-2 borderzinc-800 py-2 pl-2' placeholder='Mobile'
                    id="mobile"
                    value={mobile}
                    onChange={(event) => {
                        setMobile(event.target.value);
                    }}

                />
                <select id="status" className='w-1/2 border-2 borderzinc-800 py-2 pl-2'
                    value={status}
                    onChange={e => setStatus(e.target.value)}>
                    <option value="select">Select</option>
                    <option value="1">Completed</option>
                    <option value="2">Not Completed</option>
                </select>
            </div>
            <div className="mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl">


                <div className="flex justify-end items-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={save}>
                        Save
                    </button>
                    <button class=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={update}>
                        Update
                    </button>

                </div>
            </div>
            <div className="mt-8 p-5 border-2 cursor-pointer border-neutral-900 shadow-2xl">

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Student Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Mobile
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {students.map(function fn(student) {
                            return (
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">

                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.studentname}</td>
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.address}</td>
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.mobile}</td>
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {student.status === "1" ? (
                                                <span style={{ color: "green", fontWeight: "Bold" }}>Completed</span>
                                            ) : (
                                                <span style={{ color: "red", fontWeight: "Bold" }}>Not Completed</span>
                                            )}
                                        </td>
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <button class="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"


                                                onClick={() => editStudent(student)}
                                            >
                                                Edit
                                            </button>
                                            <button class="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"

                                                onClick={() => DeleteStudent(student.studentid)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Student