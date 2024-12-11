//console.clear();
/*localStorage.removeItem("array-bookmarks");
localStorage.removeItem("array-cards");*/

if (JSON.parse(localStorage.getItem("array-cards")) === null) {
  const answerElement = document.querySelector('[data-js="answer"]');
  const questionElement = document.querySelector('[data-js="question"]');
  const tagElement = document.querySelector('[data-js="tag"]');
  
  const answer = answerElement.textContent;
  const question = questionElement.textContent;
  const tag = tagElement.textContent;
  
  const obj = {
    questionName: question, answerName: answer, tagName: tag, isBookmarkedValue: false
  };

  let arrayCards = [obj];

  localStorage.setItem("array-cards", JSON.stringify(arrayCards));
}

const container = document.querySelector(".card-container");
let arrayCards = JSON.parse(localStorage.getItem("array-cards"));
const numberCards = arrayCards.length;

if (numberCards > 1) {
// index 0 is the already present card
  let newCards = arrayCards.slice(1);

  newCards.map((obj) => {
    const cardAdded = document.createElement("section");
    cardAdded.classList.add("question-card-box");
    cardAdded.innerHTML = `
  <p class="question" data-js="question">${obj.questionName}</p>
          <button type="button" class="answer-button" data-js="answer-button">
            Hide answer
          </button>
          <p class="question" data-js="answer">${obj.answerName}</p> 
          <div class="tag-section">
             <p>Tag</p>
             <span class="category" data-js="tag">${obj.tagName}</span>
          </div>
          <button
            type="button"
            class="bookmark-button"
            aria-label="Bookmark card"
            title="Bookmark card"
            data-js="toggle-bookmark-button"
          >
            🔖
          </button>
  `;
    container.appendChild(cardAdded);
  });
}

const listOfToggleAnswerBtns = document.querySelectorAll('[data-js="answer-button"]');
const listOfToggleBookmarkBtns = document.querySelectorAll('[data-js="toggle-bookmark-button"]');
const listOfQuestions = document.querySelectorAll('[data-js="question"]');
const listOfAnswers = document.querySelectorAll('[data-js="answer"]');
const listOfTags = document.querySelectorAll('[data-js="tag"]');

for (let i = 0; i < numberCards; i++) {
  const btnBookmark = listOfToggleBookmarkBtns[i];
  const questionElement = listOfQuestions[i];
  const answerElement = listOfAnswers[i];
  const tagElement = listOfTags[i];
  const btnAnswer = listOfToggleAnswerBtns[i];

  if (arrayCards[i].isBookmarkedValue === true) {
    btnBookmark.classList.add("selected-bookmark-button");
    btnBookmark.setAttribute("isBookmarked", "");
  } else {
    btnBookmark.classList.remove("selected-bookmark-button");
    btnBookmark.removeAttribute("isBookmarked");
  }

  btnBookmark.addEventListener("click", () => {
    btnBookmark.classList.toggle("selected-bookmark-button");
    btnBookmark.toggleAttribute("isBookmarked");

    const answer = answerElement.textContent;
    const question = questionElement.textContent;
    const tag = tagElement.textContent;
    
    let arrayBookmarks;

    if (btnBookmark.hasAttribute("isBookmarked")) {
      arrayCards[i].isBookmarkedValue = true;
      
      localStorage.setItem("array-cards", JSON.stringify(arrayCards));

      const obj = {
        questionName: question, answerName: answer, tagName: tag, isBookmarkedValue: true
      }; 

        if (JSON.parse(localStorage.getItem("array-bookmarks")) === null) {
          arrayBookmarks = [obj];
          
          localStorage.setItem("array-bookmarks", JSON.stringify(arrayBookmarks)); 
        } else {
          arrayBookmarks = JSON.parse(localStorage.getItem("array-bookmarks"));
          
          const indexObjAlreadyBookmarked = arrayBookmarks.findIndex((object) => object.questionName === obj.questionName);
          
          if (indexObjAlreadyBookmarked === -1) {
            arrayBookmarks.push(obj);
            
            localStorage.setItem("array-bookmarks", JSON.stringify(arrayBookmarks)); 
          } else {
            arrayBookmarks[indexObjAlreadyBookmarked].isBookmarkedValue = true;
            
            localStorage.setItem("array-bookmarks", JSON.stringify(arrayBookmarks)); 
          }
        }
    } else {
      arrayCards[i].isBookmarkedValue = false;
      
      localStorage.setItem("array-cards", JSON.stringify(arrayCards));

      if (JSON.parse(localStorage.getItem("array-bookmarks")) !== null) {
        arrayBookmarks = JSON.parse(localStorage.getItem("array-bookmarks"));
        
        const obj = {
          questionName: question, answerName: answer, tagName: tag, isBookmarkedValue: false
        }; 

        const indexObjAlreadyBookmarked = arrayBookmarks.findIndex((object) => object.questionName === obj.questionName);
            
        if (indexObjAlreadyBookmarked !== -1) {
            arrayBookmarks[indexObjAlreadyBookmarked].isBookmarkedValue = false;
            
            localStorage.setItem("array-bookmarks", JSON.stringify(arrayBookmarks)); 
        }
      }
    }
  });

  btnAnswer.addEventListener("click", () => {
    btnAnswer.textContent = (answerElement.hasAttribute("hidden")) ? "Hide answer": "Show answer";
    answerElement.toggleAttribute("hidden");
  });
}

