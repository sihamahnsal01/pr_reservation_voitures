  document.getElementById("btnReservez").addEventListener("click", function(event) {
      event.preventDefault();
  let icon = this.querySelector("i");
  icon.classList.add("enAvant");
  setTimeout(() => {
      window.location.href = "reser.html";
  }, 500);
}); 
// top input tamer and date local value
document.addEventListener("DOMContentLoaded", function (event) {
      event.preventDefault();
  const Pickup = document.getElementById("Pickup_local");
  const Drop_Off =document.getElementById("Drop_Off_local"); 
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");
  const now = new Date();
 
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0, 5); 
  if (dateInput) dateInput.value = currentDate;
  if (timeInput) timeInput.value = currentTime;
 });

//filer bar
const buttonFilter = document.querySelectorAll("section.cars-manu li");
const cardsection = document.querySelectorAll("section.cars-card .card");

// Set default "li" class on the first <li>
buttonFilter[0].classList.add("li", "active");

const filterCard = e => {
  // Remove "li" and "active" class from all li
  buttonFilter.forEach(li => {
    li.classList.remove("li", "active");
  });

  // Add to the clicked one
  e.target.classList.add("li", "active");

  // Filter cards
  cardsection.forEach(card => {
    card.classList.add('hide');
    if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === "tous") {
      card.classList.remove('hide');
    }
  });
};

buttonFilter.forEach(li => li.addEventListener("click", filterCard));


//search bar
document.getElementById("searchVoitureN").addEventListener("input", (e)=>{
  const message = document.getElementById("erorSearch");
  const card =document.querySelectorAll("div.card");
    const value = e.target.value.toLowerCase();
    
  card.forEach(card => {
    const title = card.querySelector("h5").textContent.toLowerCase();

       if (title.includes(value)) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
  if(true){
    
    message.textContent="Désolé, la voiture recherchée n’est pas disponible maintenant. *";
      message.classList.add("searchEror");
  
  } setTimeout(()=>{
    message.style.display= "none"
  }, 1000);
});
// flider cars function

const sliderCard = document.querySelector("div.someDetail");

document.getElementById("leftFa").onclick = () => {
  const first = sliderCard.querySelector("div.theDetails:first-child");
  if (first) sliderCard.append(first);
};

document.getElementById("rightFa").onclick = () => {
  const last = sliderCard.querySelector("div.theDetails:last-child");
  if (last) sliderCard.prepend(last);
};

// flash move in section.full-width-wrapper
function addMoveAnimation(buttonId, animationClass) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const icon = this.querySelector("i");
    icon.classList.add(animationClass);
    setTimeout(() => {
      icon.classList.remove(animationClass);
    }, 400);
  });
}
addMoveAnimation("leftFa", "moveLeft");
addMoveAnimation("rightFa", "moveRight");


// quetion marque 
const icons = document.querySelectorAll(".IunderAbove i");
icons.forEach((icon) => {
  const gtBox = icon.closest(".gt"); // get the parent .gt of the icon

  icon.addEventListener("click", () => {
    // Rotate the icon
    icon.classList.add("underAbove");

    // Expand the gt box
    gtBox.style.height = "12vh";
    gtBox.style.transition = "height 0.3s ease";

    // Remove class & collapse after 5 seconds
    setTimeout(() => {
      icon.classList.remove("underAbove");
      gtBox.style.height = "30px";
    }, 5000);
  });
});
 // review eror message and adding review
 document.addEventListener("DOMContentLoaded", () => {
  const inputName = document.getElementById("inputName");
  const inputEmail = document.getElementById("inputEmail");
  const msReveiw = document.getElementById("msReveiw");
  const sendReview = document.getElementById("sendReview");
  const colParent = document.querySelector("section.review div.row");

  // 🔁 1. Load saved reviews on page load
  const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  savedReviews.forEach((review) => {
    addReviewToDOM(review.name, review.message);
  });

  // 🧾 2. On submit, validate then save & show
  sendReview.addEventListener("click", (e) => {
    e.preventDefault();

    const errorExists = document.querySelector(".error-message");

    if (
      inputName.value.trim() === "" ||
      inputEmail.value.trim() === "" ||
      msReveiw.value.trim() === ""
    ) {
      if (errorExists) return;

      const parentDivs = document.querySelectorAll("section#addCR div");
      parentDivs.forEach((div) => {
        const errorMsg = document.createElement("p");
        errorMsg.textContent = "All fields are required!";
        errorMsg.className = "error-message";
        errorMsg.style.color = "red";
        errorMsg.style.textAlign = "center";
        div.appendChild(errorMsg);
      });
    } else {
      const allErrors = document.querySelectorAll(".error-message");
      allErrors.forEach((msg) => msg.remove());

      const name = inputName.value.trim();
      const message = msReveiw.value.trim();

      // ✅ Save to localStorage
      savedReviews.push({ name, message });
      localStorage.setItem("reviews", JSON.stringify(savedReviews));

      // ✅ Add to DOM
      addReviewToDOM(name, message);

      // 🧹 Clear inputs
      inputName.value = "";
      inputEmail.value = "";
      msReveiw.value = "";
    }
  });

  // 📦 Reusable function to add review block
  function addReviewToDOM(name, message) {
    const col = document.createElement("div");
    col.className = "col";

    const imgCol = document.createElement("img");
    imgCol.setAttribute("src", "img/user_profile.png");
    imgCol.setAttribute("alt", "user profile");

    col.appendChild(imgCol);

    const p_Pre_Parent = document.createElement("div");

    const pReview = document.createElement("p");
    pReview.className = "userReview";
    pReview.textContent = message;
    p_Pre_Parent.appendChild(pReview);

    const preName = document.createElement("pre");
    preName.className = "userName";
    preName.textContent = name;
    p_Pre_Parent.appendChild(preName);

    col.appendChild(p_Pre_Parent);
    colParent.appendChild(col);
  }
});



