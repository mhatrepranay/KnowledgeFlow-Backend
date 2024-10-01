import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IUser } from "./user.model";

interface Event extends Document {
  title: string;
  start: Date;
  end: Date;
  notes: string;
  user: IUser;
}

const EventSchema = new Schema<Event>({
  title: {
    type: String,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  notes: {
    type: String,
  },
  user: Object,
});

const EventModel: Model<Event> = mongoose.model("Event", EventSchema);

export default EventModel;
