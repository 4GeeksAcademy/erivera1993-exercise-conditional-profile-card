import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  const safe = v => (v === null || v === undefined ? "" : String(v).trim());

  let cover = `<div class="cover"><img src="${safe(
    variables.background
  )}" /></div>`;
  if (variables.includeCover === false) cover = "<div class='cover'></div>";

  const fullName = `${safe(variables.name)} ${safe(variables.lastName)}`.trim();
  const role = safe(variables.role);
  const city = safe(variables.city);
  const country = safe(variables.country);
  const location = [city, country].filter(Boolean).join(", ");

  const rawPos = safe(variables.socialMediaPosition).toLowerCase();
  const positionClass = rawPos.startsWith("position-")
    ? rawPos
    : rawPos === "right"
    ? "position-right"
    : "position-left";

  const socialItems = [
    variables.twitter
      ? `<li><a href="https://twitter.com/${safe(
          variables.twitter
        )}" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a></li>`
      : "",
    variables.github
      ? `<li><a href="https://github.com/${safe(
          variables.github
        )}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a></li>`
      : "",
    variables.linkedin
      ? `<li><a href="https://linkedin.com/in/${safe(
          variables.linkedin
        )}" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a></li>`
      : "",
    variables.instagram
      ? `<li><a href="https://instagram.com/${safe(
          variables.instagram
        )}" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a></li>`
      : ""
  ].join("");

  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${safe(variables.avatarURL)}" class="photo" />
      <h1>${fullName}</h1>
      <h2>${role}</h2>
      <h3>${location}</h3>
      <ul class="${positionClass}">
        ${socialItems}
      </ul>
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
