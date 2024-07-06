import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/mern_project", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("connect okkkkk");
  })
  .catch((err) => {
    console.log("errer conn ", err);
  });
