import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoTaskModelSchema = new Schema({
  title: String,
});

const TodoTaskModel = mongoose.model("TodoTaskSchema", TodoTaskModelSchema);

export default TodoTaskModel;
