import { Given, Then } from "@cucumber/cucumber";
import { applyTestEnvironment } from "../core/env";
import { CustomWorld } from "../core/world";
import { HomePage } from "../pages/HomePage";

function home(world: CustomWorld): HomePage {
  return new HomePage(world.page);
}

Given("the test environment is configured", function () {
  applyTestEnvironment();
});

Given("user opens the home page", async function (this: CustomWorld) {
  await home(this).openHome();
});

Then("the home page should be loaded", async function (this: CustomWorld) {
  await home(this).expectPageLoaded();
});
