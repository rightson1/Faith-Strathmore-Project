"use client";
import {
  collection,
  orderBy,
  query,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "@/utils/firebase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProps, notificationTypes } from "@/types";

const fetchMembers = async () => {
  const q = query(collection(db, "feedback"), orderBy("date", "desc"));
  return await getDocs(collection(db, "users")).then((querySnapshot) =>
    querySnapshot.docs.map((doc) => doc.data() as UserProps)
  );
};
const fetchNotifications = async () => {
  const q = query(collection(db, "feedback"), orderBy("date", "desc"));
  return await getDocs(q).then((querySnapshot) =>
    querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as notificationTypes;
    })
  );
};

export const useNotifications = () => {
  return useQuery(["notifications"], fetchNotifications, {
    staleTime: 1000 * 60 * 60 * 24,
  });
};
export const useUsers = () => {
  return useQuery(["users"], fetchMembers, {
    staleTime: 1000 * 60 * 60 * 24,
  });
};
const updateNotification = async (id: string, read: boolean) => {
  const docRef = doc(db, "feedback", id);
  await updateDoc(docRef, {
    read: read,
  });
};
export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation((uid: string) => updateNotification(uid, true), {
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};
