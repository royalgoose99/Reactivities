import { create } from "domain";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";

interface Props {
  activity: IActivity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: IActivity) => void;
}

export default function ActivityDetails({activity: selectedActivity, closeForm, createOrEdit}: Props) {

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  }; 

  const [activity, setActivity] = useState(initialState);

  function handleSubmit(){
    createOrEdit(activity);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name, value} = event.target;
    setActivity({...activity, [name]: value});
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="Description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="Category"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name="Date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="City"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          name="Venue"
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="submit"
        />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="cancel"
        />
      </Form>
    </Segment>
  );
}
