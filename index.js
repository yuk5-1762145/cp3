/*
 * Name: Rita Kuo
 * Date: November 4, 2020
 * Section: CSE 154 AJ
 *
 * This is the JS to implement the UI for my cryptogram generator, and generate
 * different types of ciphers from user input. There is a button in the page,
 * and when user clicks it, it will fetch a random joke from another website, and there's also
 * another button when users click, it will remove an image.
 */
"use strict";
(function() {
  const URL = "http://api.icndb.com/jokes/random";
  window.addEventListener("load", init);

  /**
   * When users click the button, it will remove the image in the middle
   * Initialize the ajax button to call the correct function when pressed.
   */
  function init() {
    id("remove-btn").addEventListener("click", removeImg);
    id("jokes-btn").addEventListener("click", fetchJokes);
  }

  /**
   * function used to remove the image
   */
  function removeImg() {
    let PARENT = id("parent");
    let REMOVE = id("remove");
    PARENT.removeChild(REMOVE);
  }

  /**
   * Function to start the ajax fetch call to ICNDB API once the button is hit.
   * Upon success, shows the jokes. Everytime the button is clicked, it will fetch a new joke
   */
  function fetchJokes() {
    id("response-message").textContent = "Joke Loading ...";
    id("response").innerHTML = "";
    id("jokes-btn").disabled = true;
    let url = URL;
    fetch(url)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(processIcdbnJson)
      .catch(handleRequestError);
  }

  /**
   * This method is used to process the data -> turn the object on the webpage to string
   * @param {IcndbJson} IcndbJson - data comes in JSON
   */
  function processIcdbnJson(IcndbJson) {
    id("response-message").textContent = "Joke appears!";
    let status = gen("p");
    status.textContent = "Status of fetching the Joke: " + JSON.stringify(IcndbJson.type);
    id("response").appendChild(status);
    let jokeContent = gen("p");
    jokeContent.textContent = "Joke: " + JSON.stringify(IcndbJson.value["joke"]);
    id("response").appendChild(jokeContent);
    id("jokes-btn").disabled = false;
  }

  /**
   * This function will be called when there's an error occur
   * fetch process failed, show error, place text, and re-enable the button
   */
  function handleRequestError() {
    let response = gen("p");
    let msg = "There was an error requesting data from the ICNDb service ";
    response.textContent = msg;
    id("response").appendChild(response);
    id("response-message").textContent = "Error!!!";
    id("jokes-btn").disabled = false;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * This is a helper function to throw an Error if the fetch response status is not ok
   * before processing the data.
   * @param {res} res - check status response
   */
  async function checkStatus(res) {
    if (!res.ok) {
      return new Error(await res.text());
    }
    return res;
  }
})();