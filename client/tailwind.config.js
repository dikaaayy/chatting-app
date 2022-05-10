module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f3f5",
        },
        discordBg: {
          sideBar: "#202225",
          userBar: "#292B2F",
          channelBar: "#2E3036",
          channelContainer: "#4F545C",
          chatContainer: "#37393F",
          textInputContainer: "#40444B",
          chatBorderColor: "#303239",
          channelBorderColor: "#222327",
        },
        discordText: {
          channelText: "#8E9297",
          inputText: "#DCDDDE",
          lightGray: "#B9BBBE",
        },
        discordPurple: "#5865F2",
      },
      spacing: {
        88: "22rem",
      },
    },
  },
  plugins: [],
};
