import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();
  console.log(user.email);
  const token = localStorage.getItem("access-token");

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:1000/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  // console.log(orders);
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-7 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* text md=medium device; navaye paxadi ko default value use hunxa, */}
          <div className="text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track all your orders{" "}
              <span className="text-lightbrown">From here</span>
            </h2>
          </div>
        </div>
      </div>
      {/* table */}
      <div>
        {" "}
        <div>
          {" "}
          {orders.length > 0 ? (
            <div>
              <div className="">
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead className="bg-brown text-white rounded-sm">
                      <tr>
                        <th>#</th>
                        <th>Order Date</th>
                        <th>TransitionId</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatDate(item.createdAt)}</td>
                          <td className="font-medium">{item.transitionId}</td>
                          <td>${item.price}</td>
                          <td>{item.status}</td>
                          <td>
                            <Link
                              to="/contact"
                              className="btn btn-sm border-none text-red bg-transparent"
                            >
                              Contact
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {/* foot */}
                  </table>
                </div>
              </div>
              <hr />
            </div>
          ) : (
            <div className="text-center mt-20">
              <p>Cart is empty. Please add products.</p>
              <Link to="/menu">
                <button className="btn bg-brown text-white mt-3">
                  Back to Menu
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
