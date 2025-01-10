import axios from "axios";

const testLogin = async () => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", {
      email: "jainamprajapati1102@gmail.com",
      password: "123456",
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

testLogin();
