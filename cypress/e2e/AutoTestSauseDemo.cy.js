Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
// В beforeEach() можно записать повторяющиеся действия + вынести session(). Все это позволит сократить время прогона тестов.
// Вынесла в beforeEach() и записала в session() - авторизацию

beforeEach(() => { 
    cy.viewport(1600, 1000);
    cy.visit("/");
    cy.get('[data-test="username"]').should('have.value', '').type('standard_user');
    cy.get('[data-test="password"]').should('have.value', '').type('secret_sauce');
    cy.contains('Login').should('be.visible').click();
    cy.location("pathname").should("eq", '/inventory.html');
});

describe('E2E тесты сайта Sausedemo', function () {
  it('Авторизация standard_user', () => {
    cy.visit("/");
  });
  // Если необходим запустить только один тест, то нужно добавить only => it.only
  it('Добавление товаров в корзину и оформление покупки', () => {
    // Добавление товара через открытие карточки товара
    cy.contains('Sauce Labs Backpack').click();
    cy.url().should('include', '/inventory-item.html?id=4');
    cy.contains('$29.99').should('be.visible');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click();
    // Возврат на главную страницу и добавление еще одного товара
    cy.contains('Back to products').click();
    // Добвление товаров без открытия карточки
    cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    cy.get('[data-test=add-to-cart-sauce-labs-onesie]').click();
    // Просмотр корзины и проверка того, что товары добавлены
    cy.get('.shopping_cart_link').click();
    cy.contains('Test.allTheThings() T-Shirt (Red)').should('be.visible');
    cy.contains('Sauce Labs Onesie').should('be.visible');
    // Удаление товара из корзины
    cy.get('[data-test=remove-sauce-labs-onesie]').click();
    // Скриншот корзины чтобы убедиться, что товар действительно удален
    cy.screenshot('Cypress-project\\sausedemo\\screen');
    // Проверка товара и завершение покупки
    cy.get('[data-test="checkout"]').should('be.visible').click();
    cy.contains('Checkout: Your Information').should('be.visible');
    cy.get('[data-test="firstName"]').type('Bertie');
    cy.get('[data-test="lastName"]').type('Botts');
    cy.get('[data-test="postalCode"]').type('1234');
    cy.get('[data-test="continue"]').should('be.visible').click();
    cy.contains('Checkout: Overview').should('be.visible');
    cy.get('[data-test="finish"]').click();
    cy.contains('Thank you for your order!').should('be.visible')
  });
})
