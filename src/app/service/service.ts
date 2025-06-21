import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { IRenterProfile } from "../interface/interface";

export const getRenterDetails = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "renters"));
    const rentersData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as IRenterProfile[];
    return rentersData;
  } catch (error) {
    console.error("Error fetching renters:", error);
    throw error;
  }
};

export const editRenterDetails = async (newOrEditRenterDetails: any) => {
  try {
    const renterRef = doc(db, "renters", newOrEditRenterDetails.id);
    await updateDoc(renterRef, newOrEditRenterDetails as any);
    return true;
  } catch (error) {
    console.error("Error updating renter:", error);
    throw error;
  }
};

export const addNewRenter = async (newOrEditRenterDetails: any) => {
  try {
    const docRef = await addDoc(
      collection(db, "renters"),
      newOrEditRenterDetails
    );
    return docRef;
  } catch (error) {
    console.error("Error adding renter:", error);
    throw error;
  }
};

export const deleteRenterDetails = async (id: string) => {
  try {
    await deleteDoc(doc(db, "renters", id));
    return true;
  } catch (error) {
    console.error("Error deleting renter:", error);
    throw error;
  }
};

export const addNewHistoryRecord = async (rentHistoryData: any) => {
  try {
    // const rentDocRef = doc(db, "rentHistory", rentHistoryData.id);
    // await setDoc(rentDocRef, rentHistoryData);
    // return true;
    // try {
    const rentDocRef = doc(db, "rentHistory", rentHistoryData.id);

    // Check if history exists for this renter
    const docSnap = await getDoc(rentDocRef);

    if (docSnap.exists()) {
      // ✅ Append to existing records array
      await updateDoc(rentDocRef, {
        records: arrayUnion(rentHistoryData),
      });
    } else {
      // 🆕 Create new document with records array
      await setDoc(rentDocRef, {
        records: [rentHistoryData],
      });
    }

    return true;
  } catch (error) {
    console.error("Error adding rent history record:", error);
    throw error;
  }
};
