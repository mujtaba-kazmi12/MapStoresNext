/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
       
          'custom-image': "url('/BlueBackGround.jpeg')",
      },

      screens: {
        // Define your custom screen sizes here
        'small': '480px', // Custom small screen size
        'medium': '768px', // Custom medium screen size (overwrites the default medium)
        'large': '1024px', // Custom large screen size (matches the default large)
      },

      colors: {
        // Define your custom colors here
        'custom-blue': '#007bff', // Example custom color
        'custom-red': '#ff073a', // Another example custom color
        // Add as many as you need
      },
      borderRadius: {
        '4xl': '2rem', // or any specific value you prefer
      },

    },
  },
  plugins: [],
};
