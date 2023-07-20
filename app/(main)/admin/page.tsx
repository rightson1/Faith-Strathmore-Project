"use client";
import React, { useState, useEffect, use } from "react";
import { useAuth } from "@/utils/AuthContext";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import { Button } from "@/components";
import { format } from "timeago.js";
import { NotificationModalProps, UserProps, notificationTypes } from "@/types";
import {
  useNotifications,
  useUpdateNotification,
  useUsers,
} from "@/utils/hooks/useFetch";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Profile = () => {
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: notifications, isLoading: notificationsLoading } =
    useNotifications();
  const [active, setActive] = useState<"users" | "notifications">("users");
  const { mutate } = useUpdateNotification();
  const [selectedNotification, setSelectedNotification] =
    useState<notificationTypes | null>(null);

  // Function to handle closing the modal
  const handleCloseNotificationModal = () => {
    setSelectedNotification(null);
  };
  useEffect(() => {
    if (!selectedNotification) return;
    if (!selectedNotification.read) {
      mutate(selectedNotification?.id);
    }
  }, [selectedNotification]);

  return (
    <section className="pt-10 pad-x">
      <div className="grid grid-cols-3 w-full gap-5 items-start">
        <div className="col-span-3 sm:col-span-1 relative w-full h-full gap-5 flex sm:flex-col ">
          <Button
            containerStyles={`${
              active === "users" ? "filled" : "outlined"
            } w-full`}
            title="Users"
            handleClick={() => setActive("users")}
          />
          <Button
            containerStyles={`${
              active === "notifications" ? "filled" : "outlined"
            } w-full`}
            title="Notifications"
            handleClick={() => setActive("notifications")}
          />
        </div>

        {active === "users" ? (
          <div className="col-span-3 sm:col-span-2 relative w-full h-full ">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-size p-2 text-left">Name</th>
                  <th className="p-size p-2 text-left">Email</th>
                  <th className="p-size p-2 text-left">Phone</th>
                  <th className="p-size p-2 text-left">Is Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {usersLoading ? (
                  <tr className="bg-white">
                    <td className="p-size p-2">Loading...</td>
                    <td className="p-size p-2">Loading...</td>
                    <td className="p-size p-2">Loading...</td>
                    <td className="p-size p-2">Loading...</td>
                  </tr>
                ) : (
                  users?.map((member) => (
                    <tr key={member.email} className="bg-white">
                      <td className="p-size p-2">{member.displayName}</td>
                      <td className="p-size p-2">{member.email}</td>
                      <td className="p-size p-2">{member.phone}</td>
                      <td className="p-size p-2">
                        <button
                          className={`${
                            member.admin ? "bg-red-500" : "bg-indigo-500"
                          } text-white p-2 rounded-md`}
                          type="button"
                        >
                          {member.admin ? "Admin" : "User"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="col-span-3 sm:col-span-2 relative w-full h-full ">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-size p-2 text-left">Name</th>
                  <th className="p-size p-2 text-left">Email</th>
                  <th className="p-size p-2 text-left">Time</th>

                  <th className="p-size p-2 text-left">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {notificationsLoading ? (
                  <>
                    <tr className="bg-white">
                      <td className="p-size p-2">Loading...</td>
                      <td className="p-size p-2">Loading...</td>
                      <td className="p-size p-2">Loading...</td>
                    </tr>
                  </>
                ) : (
                  notifications?.map((item, index) => {
                    const date = new Date(
                      item.date.seconds * 1000 + item.date.nanoseconds / 1000000
                    );

                    // Conditionally apply different styles based on the 'read' field
                    const rowClass = item.read ? "bg-white" : "bg-blue-100";
                    const nameClass = item.read
                      ? "p-size p-2 "
                      : "p-size p-2  text-indigo-500";

                    return (
                      <tr key={index} className={rowClass}>
                        <td className={nameClass}>{item.name}</td>
                        <td className={nameClass}>{item.email}</td>
                        <td className={nameClass}>{format(date)}</td>
                        <td className={nameClass}>
                          <button
                            onClick={() => setSelectedNotification(item)}
                            className="bg-indigo-500 text-white p-2 rounded-md"
                            type="button"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <NotificationModal
        notification={selectedNotification}
        isOpen={!!selectedNotification}
        onClose={handleCloseNotificationModal}
      />
    </section>
  );
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  notification,
  isOpen,
  onClose,
}) => {
  if (!notification) return null;
  const date = new Date(
    notification.date.seconds * 1000 + notification.date.nanoseconds / 1000000
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {notification.name}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {notification.description}
                      </p>
                      <p className="mt-2 text-sm text-gray-500">
                        Date: {date.toDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Profile;
