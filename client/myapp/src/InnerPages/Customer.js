import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'datatables.net-dt/css/dataTables.dataTables.css'
import 'datatables.net-dt/js/dataTables.dataTables.min.js'

import $ from 'jquery'

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [cityCounts, setCityCounts] = useState({});
    const [countryCounts, setCountryCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Step 1: Sync
                await axios.get('http://localhost:4000/sync-customers');

                // Step 2: Fetch
                const res = await axios.get('http://localhost:4000/customers');

                setCustomers(res.data);
            } catch (err) {
                console.log(err);
                alert("Error fetching data");
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (customers.length > 0) {
            const counts = {};

            customers.forEach((c) => {
                let country = c.country || 'Unknown';

                // 🔥 Normalize
                country = country.trim().toUpperCase();

                if (counts[country]) {
                    counts[country] += 1;
                } else {
                    counts[country] = 1;
                }
            });

            setCountryCounts(counts);
        }
    }, [customers]);


    useEffect(() => {
        if (customers.length > 0) {
            const counts = {};

            customers.forEach((c) => {
                let city = c.city || 'Unknown';

                // 🔥 Normalize city
                city = city.trim().toLowerCase();

                if (counts[city]) {
                    counts[city] += 1;
                } else {
                    counts[city] = 1;
                }
            });

            setCityCounts(counts);
        }
    }, [customers]);


    useEffect(() => {
        if (customers.length > 0) {
            // Destroy old instance if exists
            if ($.fn.DataTable.isDataTable('#myTable')) {
                $('#myTable').DataTable().destroy();
            }

            // Initialize
            $('#myTable').DataTable();
        }
    }, [customers])

    return (
        <>
            <div className='col-8 container p-5'>
                <h2>Customer List</h2>

                <table className='table table-hover table-bordered' id='myTable'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address City</th>
                            <th>state</th>
                            <th>Country Code</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.length === 0 ? (
                            <tr>
                                <td colSpan="4">No Data Found</td>
                            </tr>
                        ) : (
                            customers.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.firstName} {item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone || 'N/A'}</td>
                                    <td>{item.city}</td>
                                    <td>{item.country} {item.state}</td>
                                    <td>{item.zip}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>


                <div className="container mb-4">
                    <h4>Country Wise Customer Count</h4>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(countryCounts)
                                .sort((a, b) => b[1] - a[1])
                                .map(([country, count], index) => (
                                    <tr key={index}>
                                        <td>{country}</td>
                                        <td>{count}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>




                <div className="container mb-4">
                    <h4>City Wise Customer Count</h4>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>City</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(cityCounts).map((city, index) => (
                                <tr key={index}>
                                    <td>{city}</td>
                                    <td>{cityCounts[city]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Customer;