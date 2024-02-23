import React, { useState, useEffect } from "react";
import TripList from "../TripList/TripList";
import TripDetails from "../TripDetails/TripDetails";
import AddTripModal from "../AddTripModal/AddTripModal";
import WeatherPanel from "../WeatherPanel/WeatherPanel";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdolRheLF8KwiowVe_rHwOTG_grI8wysE",
  authDomain: "trip-app-aaa12.firebaseapp.com",
  projectId: "trip-app-aaa12",
  storageBucket: "trip-app-aaa12.appspot.com",
  messagingSenderId: "624881075064",
  appId: "1:624881075064:web:b6052a6182bdefe0047e8d",
  measurementId: "G-VRX0EY0B6N",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const Trip = () => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showAddTripModal, setShowAddTripModal] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        loadUserTrips(user.uid);
      } else {
        setTrips([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      saveUserTrips(user.uid, trips);
    }
  }, [user, trips]);

  const loadUserTrips = async (userId) => {
    try {
      const tripsRef = firestore.collection("trips").doc(userId);
      const doc = await tripsRef.get();
      if (doc.exists) {
        setTrips(doc.data().trips);
      } else {
        await tripsRef.set({ trips: [] });
      }
    } catch (error) {
      console.error("Error loading user trips:", error);
    }
  };

  const saveUserTrips = async (userId, userTrips) => {
    try {
      const tripsRef = firestore.collection("trips").doc(userId);
      await tripsRef.set({ trips: userTrips });
    } catch (error) {
      console.error("Error saving user trips:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        {user ? (
          <button onClick={handleLogout}>Выйти</button>
        ) : (
          <button onClick={handleLogin}>Войти с Google</button>
        )}
      </div>
      {user ? (
        <div className="content">
          <div className="left-panel">
            <TripList
              trips={trips}
              onSelectTrip={setSelectedTrip}
              onDeleteTrip={(tripToDelete) => {
                const updatedTrips = trips.filter(
                  (trip) => trip !== tripToDelete
                );
                setTrips(updatedTrips);
              }}
              onClearTrips={() => {
                setTrips([]);
              }}
            />
            <button onClick={() => setShowAddTripModal(true)}>
              Добавить поездку
            </button>
            <AddTripModal
              show={showAddTripModal}
              onClose={() => setShowAddTripModal(false)}
              onAddTrip={(newTrip) => {
                setTrips([...trips, newTrip]);
              }}
            />
          </div>
          <div className="right-panel">
            <WeatherPanel selectedTrip={selectedTrip} />
            <TripDetails trip={selectedTrip} />
          </div>
        </div>
      ) : (
        <div className="login-message">Войдите, чтобы увидеть ваши поездки</div>
      )}
    </div>
  );
};

export default Trip;
