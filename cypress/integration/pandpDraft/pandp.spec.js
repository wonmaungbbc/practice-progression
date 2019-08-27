describe("Identify activity example test", () => {
  it("Visit to 'ch' sound identify activity", () => {
    cy.visit("https://www.bbc.co.uk/bitesize/articles/zjp3pg8");
    // Verify "blocks-article__focused-journey__next-block-arrow" should be visible
    cy.get("button.blocks-article__focused-journey__next-block-arrow").should(
      "be.visible"
    );
  });
  it("Verify there is an audio button, audio-described__subject, four selectable word card, feedback bar with check it button and focused-journey__next-block-arrow", () => {
    cy.get(".blocks-article__focused-journey__next-block-arrow")
      .click()
      .url()
      .should("include", "bitesize/articles/zjp3pg8");
    cy.get("button.ec-audio-described__button").should("be.visible");
    cy.get(".bitesize-blocks-identify-practice__instruction-name").should(
      "have.text",
      "Select the item that uses the sound ch"
    );
    cy.get(".bitesize-blocks-identify-practice__word-list").should(
      "be.visible"
    );
    cy.get(".ec-feedback-bar__container")
      .contains("Check it")
      .should("be.visible");
    cy.get(".ec-feedback-bar__button-container")
      .find("button")
      .contains("Check it")
      .should("be.visible");
  });
  it("Verify there is four word card", () => {
    cy.get(".bitesize-blocks-identify-practice__word-list")
      .children()
      .its("length")
      .should("be", 4);
  });
  it("Verify that there is at least one ch sound in the word card", () => {
    cy.get(".bitesize-blocks-identify-practice__word-list")
      .find(".education-selectable-card__content")
      .as("wordContent")
      .then($wordContent => {
        const desiredWord = "ch";
        const elements = $wordContent.map((i, el) => Cypress.$(el));
        const chWord = elements
          .get()
          .filter(element => element.text().includes(desiredWord));
        expect(chWord, "has 1 element").to.have.length(1);
        cy.log("The word with ch sound is" + " " + chWord);
      });
  });
  it("Select the ch sound in the word card,check if the word is correct, when correct answer is selected the color of the word card, feedback bar is green, feedback bar has logo, message and it has next button ", () => {
    const correctColor = "rgb(5, 188, 68)";
    cy.get(".bitesize-blocks-identify-practice__word-list")
      .find(".education-selectable-card__content")
      .as("wordContent")
      .then($wordContent => {
        const desiredWord = "ch";
        const elements = $wordContent.map((i, el) => Cypress.$(el));
        const chWord = elements
          .get()
          .filter(element => element.text().includes(desiredWord));
        expect(chWord, "has 1 element").to.have.length(1);
        cy.log("The word with ch sound is" + " " + chWord);
        cy.get(chWord[0]).click();
        cy.contains("Check it").click();
        cy.get(chWord[0]);
        cy.get(".education-selectable-card__checked")
          .find("title")
          .should("have.text", "yes");
        cy.get(".ec-feedback-bar__container").should("be.visible");
        cy.get(
          ".ec-feedback-bar__grid-row.ec-feedback-bar__background--correct"
        )
          .and("have.css", "background-color", correctColor)
          .should(
            "have",
            "[.ec-feedback-bar__message-container,.ec-feedback-bar__button-container]"
          )
          .should("be.visible");
        cy.get(".ec-feedback-bar__message-container")
          .children()
          .should("have", "[span.ec-feedback-bar__icon-container,h2]");
        cy.get(".ec-feedback-bar__button-container").should(
          "have.text",
          "Next"
        );
        cy.get("button.ec-feedback-bar__button").click();
      });
  });
  it("Select incorrect answer", () => {
    const incorrectColor = "rgb(225, 82, 85)";
    cy.get(".bitesize-blocks-identify-practice__word-list")
      .find(".education-selectable-card__content")
      .as("wordContent")
      .then($wordContent => {
        const desiredWord = "ch";
        const elements = $wordContent.map((i, el) => Cypress.$(el));
        const nonchWord = elements
          .get()
          .filter(element => !element.text().includes(desiredWord));
        expect(nonchWord, "3 elements apart from chWord").to.have.length(3);
        // cy.log("The word with non ch sound is" + " " + nonchWord);
        cy.get(nonchWord[0]).click();
        cy.contains("Check it").click();
        cy.get(nonchWord[0]);
        cy.get(".education-selectable-card__checked")
          .find("title")
          .should("have.text", "no");
        cy.get(
          ".education-selectable-card__container--activity-incorrect .education-selectable-card__checked"
        ).should("have.css", "background-color", incorrectColor);
        cy.get(".ec-feedback-bar__container").should("be.visible");
        cy.get(
          ".ec-feedback-bar__grid-row.ec-feedback-bar__background--incorrect"
        )
          .and("have.css", "background-color", incorrectColor)
          .should(
            "have",
            "[.ec-feedback-bar__message-container,.ec-feedback-bar__button-container]"
          )
          .should("be.visible");
        cy.get(".ec-feedback-bar__message-container")
          .children()
          .should("have", "[span.ec-feedback-bar__icon-container,h2]");
        cy.get(".ec-feedback-bar__button-container").should(
          "have.text",
          "Next"
        );
        cy.get("button.ec-feedback-bar__button").click();
      });
  });
});
