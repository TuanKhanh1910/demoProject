/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        // gọi ra số 10 tức là cái đuôi khi gọi ra chữ h vd h-10
        // 10: "400px",
        // cách tạo ra uilit riêng có thể truyền string,hoặc là number
        "70vh": "70vh",
        "80vh": "80vh",
        "100vh": "100vh",
      },
    },
  },
  plugins: [],
};
