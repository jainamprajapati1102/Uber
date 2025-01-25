import autocannon from "autocannon";
import { body, header, param } from "express-validator";

// const token=""
const urls = [
  { method: "GET", url: "http://localhost:5000" },
  {
    method: "POST",
    url: "http://localhost:5000/user/register",
    body: {
      fullname: { firstname: "jainam", lastname: "prajapati" },
      email: "jainamprajapati112@gmailcom",
      password: "123456",
    },
  },
  {
    method: "POST",
    url: "http://localhost:5000/user/login",
    body: { email: "jainamprajapati112@gmailcom", password: "123456" },
  },
  { method: "GET", url: "http://localhost:5000/user/profileall" },
  {
    method: "GET",
    url: "http://localhost:5000/user/logout",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzhlMTQwYzI0N2FiY2ZhODdlOTFiYmQiLCJpYXQiOjE3Mzc3OTQ2MjgsImV4cCI6MTczNzg4MTAyOH0.vBuctrWNKGTD3m2Av-8oojaT5g-ndk81qkOph2Iaeg4`,
    },
  },
  {
    method: "POST",
    url: "http://localhost:5000/captain/register",
    body: {
      fullname: {
        firstname: "shailesh",
        lastname: "chaudhary",
      },
      email: "shailesh@gmail.com",
      password: "12345678",
      vehicle: {
        color: "red",
        plate: "GJ05ZZ1234",
        vehicleType: "car",
        capacity: "2",
      },
    },
  },
  {
    method: "POST",
    url: "http://localhost:5000/captain/login",
    body: { email: "shailesh@gmail.com", password: "12345678" },
  },
  {
    method: "GET",
    url: "http://localhost:5000/captain/profile",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzgyOWJkOTNkN2YyNTAyYWVkODRmMmYiLCJpYXQiOjE3Mzc3OTQ3MzcsImV4cCI6MTczNzg4MTEzN30.vCiFszmBq8xUBw0Vij2l9xnhvvi793msaguPpU1-7Vc`,
    },
  },
  {
    method: "GET",
    url: "http://localhost:5000/captain/logout",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzgyOWJkOTNkN2YyNTAyYWVkODRmMmYiLCJpYXQiOjE3Mzc3OTQ3MzcsImV4cCI6MTczNzg4MTEzN30.vCiFszmBq8xUBw0Vij2l9xnhvvi793msaguPpU1-7Vc`,
    },
  },
  {
    method: "POST",
    url: "http://localhost:5000/ride/create",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk0YTY0ZDA0M2QxOThiYTExOGI2YTAiLCJpYXQiOjE3Mzc3OTUxNDksImV4cCI6MTczNzg4MTU0OX0.XliHSOqZ4ZwMV24b5vBmKTBDzma0IG90jk1_tUhzq-4`,
    },
    body: {
      pickup: "variyav",
      destination: "mota varachha",
    },
  },
  {
    method: "GET",
    url: "http://localhost:5000/ride/get-fare",
    params: { pickup: "variyav", destination: "mota varachha" },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk0YTY0ZDA0M2QxOThiYTExOGI2YTAiLCJpYXQiOjE3Mzc3OTUxNDksImV4cCI6MTczNzg4MTU0OX0.XliHSOqZ4ZwMV24b5vBmKTBDzma0IG90jk1_tUhzq-4`,
    },
  },
  {
    method: "POST",
    url: "http://localhost:5000/ride/confirmride",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk0YTc4NWE1N2ZkMzVmN2E3ZGE4NTQiLCJpYXQiOjE3Mzc3OTU0NjEsImV4cCI6MTczNzg4MTg2MX0.NkH97cMw8lXAEMIuJ0gLXRwdkwmNAmUMTCQbYT-Oz3Q`,
    },
    body: {
      rideId: "6794a7d2b965b3a0e3939db6",
    },
  },
  {
    method: "GET",
    url: "http://localhost:5000/ride/start-ride",
    params: { rideId: "6794a7d2b965b3a0e3939db6", otp: "245939" },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk0YTc4NWE1N2ZkMzVmN2E3ZGE4NTQiLCJpYXQiOjE3Mzc3OTU0NjEsImV4cCI6MTczNzg4MTg2MX0.NkH97cMw8lXAEMIuJ0gLXRwdkwmNAmUMTCQbYT-Oz3Q`,
    },
  },
  {
    method: "POST",
    url: "http://localhost:5000/ride/end-ride",
    body: { rideId: "6794a7d2b965b3a0e3939db6" },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk0YTc4NWE1N2ZkMzVmN2E3ZGE4NTQiLCJpYXQiOjE3Mzc3OTU0NjEsImV4cCI6MTczNzg4MTg2MX0.NkH97cMw8lXAEMIuJ0gLXRwdkwmNAmUMTCQbYT-Oz3Q`,
    },
  },
];

urls.forEach(({ method, url, headers, body }) => {
  const opts = {
    url,
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    connections: 10, // 10 concurrent connections
    duration: 60, // 20 seconds duration
  };

  console.log(`Testing ${method} ${url}`);
  const instance = autocannon(opts, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });

  autocannon.track(instance); // Log detailed stats
});
