import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { IRenterProfile } from "../interface/interface";

export const getRenterDetails = async () => {
  const querySnapshot = await getDocs(collection(db, "renters"));
  const rentersData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as IRenterProfile[];
  return rentersData;
};

export const editRenterDetails = async (newOrEditRenterDetails: any) => {
  const renterRef = doc(db, "renters", newOrEditRenterDetails.id);
  let res = await updateDoc(renterRef, newOrEditRenterDetails as any);
  return res;
};

export const addNewRenter = async (newOrEditRenterDetails: any) => {
  const docRef = await addDoc(
    collection(db, "renters"),
    newOrEditRenterDetails
  );
  return docRef;
};

export const deleteRenterDetails = async (id: string) => {
  let res = await deleteDoc(doc(db, "renters", id));
  return res;
};

export const addNewHistoryRecord = async (rentHistoryData: any) => {
  const rentDocRef = doc(db, "rentHistory", rentHistoryData.id);

  let res = await setDoc(rentDocRef, rentHistoryData);
  return res;
};
