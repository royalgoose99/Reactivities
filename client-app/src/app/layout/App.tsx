import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import Navbar from "./navbar";
import ActivityDashboard from "./activities/dashboard/ActivityDashboard";
import "./styles.css";
import {v4 as uuid} from 'uuid';

function App() {
  // putting an array in a resulted method will fix a undeclared variable issue
  const [activities, setActivitities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivitities(response.data);
      });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id? : string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity (activity: IActivity){
    activity.id 
    ? setActivitities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivitities([...activities, {...activity, id: uuid()}])
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity (id: string){
    setActivitities([...activities.filter(x => x.id !== id)])
  }


  return (
    <>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
