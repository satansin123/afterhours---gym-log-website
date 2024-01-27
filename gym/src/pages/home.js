import React from 'react';

const Home = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FitCampus Homepage</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>
          {`
            body {
              font-family: 'Poppins', sans-serif;
              background-color: #000;
              color: #fff;
              overflow: hidden;
            }

            .bg-image {
              background-image: url('missiom.png');
              background-size: cover;
              background-position: center;
            }

            .gradient-overlay {
              background: linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 1) 100%);
            }
          `}
        </style>
      </head>
      <body className="bg-image gradient-overlay flex flex-col justify-between h-screen p-10">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">FitCampus</h1>
          <div>
            <button className="bg-transparent text-yellow-500 font-semibold hover:text-yellow-400 py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
              Login
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded ml-4">
              Sign Up
            </button>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <h2 className="text-6xl font-semibold text-center">
            Your daily<br />health coach
          </h2>
        </main>

        {/* Leave the footer empty if there's nothing to put there */}
        <footer></footer>
      </body>
    </html>
  );
};

export default Home;
