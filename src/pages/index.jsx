import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataUserAll, setDataUserAll] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");

  const fetchData = () => {
    axios({
      method: "get",
      url: `https://randomuser.me/api/?page=1&pageSize=10&results=100&seed=aaaa`,
    })
      .then((response) => {
        // console.log(response.data.results);
        setDataUser(response.data.results);
        setDataUserAll(response.data.results); // full nya
      })
      .catch((error) => {
        console.log(error);
        alert("Error, reload the page!");
      });
  };

  function konversiTanggal(tanggal) {
    const tanggalAwal = new Date(tanggal);
    const dd = String(tanggalAwal.getDate()).padStart(2, "0");
    const mm = String(tanggalAwal.getMonth() + 1).padStart(2, "0");
    const yyyy = tanggalAwal.getFullYear();
    const jam = String(tanggalAwal.getHours()).padStart(2, "0");
    const menit = String(tanggalAwal.getMinutes()).padStart(2, "0");
    return `${dd}-${mm}-${yyyy} ${jam}:${menit}`;
  }

  const handleAllFilter = (search, gender) => {
    let filteredData = dataUserAll;

    // implement filter search
    if (search.length > 0) {
      filteredData = filteredData.filter((item) => {
        return item.login.username.toLowerCase().includes(search.toLowerCase()) || `${item.name.first} ${item.name.last}`.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
      });
    }

    // implement filter gender
    if (gender === "Male" || gender === "Female") {
      filteredData = filteredData.filter((item) => {
        return item.gender.toLowerCase() === gender.toLowerCase();
      });
    }

    // update data user
    setDataUser(filteredData);

    // update state
    setGender(gender);
    setSearch(search);
  };

  const handleSearchClick = () => {
    handleAllFilter(search, gender);
  };

  const handleChangeGender = (selectedgender) => {
    handleAllFilter(search, selectedgender);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleResetFilter = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="px-40">
        <div className="flex flex-row items-center ">
          <h1 className="text-xl font-semibold mb-4 mr-60">Search</h1>
          <h1 className="text-xl font-semibold mb-4">gender</h1>
        </div>

        <div className="">
          <input type="text" placeholder="search" className="" onChange={(e) => setSearch(e.target.value)} onKeyPress={handleInputKeyPress} />
          <button className="bg-blue-500 mr-4 px-2" onClick={handleSearchClick}>
            <i className="fas fa-search"></i>
          </button>
          <select name="cars" id="cars" onChange={(e) => handleChangeGender(e.target.value)} className="bg-white px-8 py-1 mr-4">
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button className="bg-white" onClick={handleResetFilter}>
            Reset Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto px-40 pt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Registered date</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td>{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.login.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.name.first} {item.name.last}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{konversiTanggal(item.registered.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
