// get api key for any public api
const apiKey = "53d1da66f8f7838016bdd48fd7c1ca6e";

document.addEventListener("DOMContentLoaded", () => {
  const city = "Nairobi";

  // Fetch weather data from OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Display the fetched weather data
      const location = `${data.name}, ${data.sys.country}`;
      const temperature = `${data.main.temp}°C`;
      const weatherDescription = `${data.weather[0].description}`;
      const position = `${data.coord.lat}, ${data.coord.lon}`;

      // Update HTML with fetched data
      document.getElementById(
        "location"
      ).innerHTML = `${location} - ${temperature}, ${weatherDescription}, ${position}`;
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Handle form submission
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');

    // Validate form inputs
    if (!firstName || !lastName || !email || !gender) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Process form data (for example, send it to a server)
    console.log("Form submitted with the following data:");
    console.log(`First Name: ${firstName}`);
    console.log(`Last Name: ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Gender: ${gender.id}`);

    // Optionally, you can reset the form
    form.reset();
  });
});
