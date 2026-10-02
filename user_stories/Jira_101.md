## User Story: Checkout 123 - E-commerce Checkout Process

## Business Rules
1. Users must be logged in to access checkout
2. Cart cannot be empty when proceeding to checkout
3. Order confirmation should clear the cart
4. Users can cancel checkout at any step and return to cart

## Technical Notes
- Use Playwright for test automation
- Test across Chrome, Firefox, and Safari browsers
- Ensure mobile responsiveness in checkout flow
- Validate all form validation messages
- Test navigation flow and back button behavior
- Test environment: https://sauce-demo.myshopify.com/
- Credentials: set `TEST_USERNAME` and `TEST_PASSWORD` in the local `.env` file

## Definition of Done
[ ] All acceptance criteria have test cases
[ ] Manual exploratory testing completed
[ ] Automated test scripts created and passing
[ ] Test results documented
[ ] Bugs logged for any failures
[ ] Code committed to repository