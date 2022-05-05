import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";

export const useCollection = (firebaseCollection, booleanChoice) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		let ref = collection(db, firebaseCollection);

		if (booleanChoice) {
			ref = query(ref, orderBy("timestamp", "desc"));
		}

		const unsub = onSnapshot(ref, snapshot => {
			let results = [];
			snapshot.docs.forEach(doc => {
				results.push({ id: doc.id, ...doc.data() });
			});
			setData(results);
		});

		return () => unsub();
	}, [firebaseCollection]);

	return { data };
};
