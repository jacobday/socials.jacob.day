function generateSocials(dataJSON) {
  for (const key in dataJSON) {
    if (Object.hasOwnProperty.call(dataJSON, key)) {
      const element = dataJSON[key];

      const socialAnchor = document.createElement("a");
      socialAnchor.classList.add("social-link");
      socialAnchor.href = element.url;
      socialAnchor.target = "_blank";

      const socialLabel = document.createElement("div");
      socialLabel.classList.add("social-label");
      socialLabel.innerHTML = `<span>${element.label}</span>`;

      socialAnchor.appendChild(socialLabel);

      const socialIcon = document.createElement("i");
      socialIcon.classList.add("social-icon");

      element.icon.split(" ").forEach((iconClass) => {
        socialIcon.classList.add(iconClass);
      });

      socialLabel.appendChild(socialIcon);

      // Append new social anchor to container
      document.querySelector("#socials").appendChild(socialAnchor);
    }
  }
}

// Load socials data
function loadJSON(fileName) {
  // make a JSON loading object
  const xobj = new XMLHttpRequest();

  // prepare to read JSON files
  xobj.overrideMimeType("application/json");

  // specify the request type
  xobj.open("GET", fileName);

  // what to do once you read the file
  xobj.onreadystatechange = () => {
    // check if the file is loaded correctly
    if (xobj.readyState == 4 && xobj.status == 200) {
      // ready to read the JSON and process it
      // first get the file content
      const responseText = xobj.responseText;

      // this is a raw string, convert from string to JSON object
      const dataJSON = JSON.parse(responseText);

      generateSocials(dataJSON);
    }
  };

  xobj.send();
}

loadJSON("socials.json");
