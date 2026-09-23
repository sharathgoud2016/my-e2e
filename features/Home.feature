Feature: Home

  Background:
    Given the test environment is configured

  @regression @site-smoke @home
  Scenario: Home page loads with a document title
    Given user opens the home page
    Then the home page should be loaded
