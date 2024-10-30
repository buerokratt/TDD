# Business DSL -> Playwright tests

- **prompt.txt** includes all neccessary context to generate suitable Playwright tests according to given Business DSL. 

- When giving the **businessDSL** to the chat, include the **prompt.txt** content aswell.


## **Rules for writing BDSLs**
Basic businessDSL structure begins as follows:

```
resource: chat/chatbot/emergency-notices
description: "Emergency notices"
test:
  main:
```
This is a basic DSL start, resource describes the URL path where the resource is located at, description is the heading of the resource. Each businessDSL should have a test block indicating the start of the start of the elements that are to be tested and are expected to be present on the page.

### **Test segments**

Test usually consists of heading, body and footer. In businessDSLs body is replaced with card which is the main part in HTML where the content is displayed to.

I.e

``` 
    heading:
    args:
      - type: text
      - value: "Settings"
      - style: h1

    card:
      name: card__header
      switch:
        label: "Chatbot active"
        args:
          - type: button
          - style: switch
          - adjacentTo: label

      name: card__body
      switch:
        label: "Show support name"
        args:
          - type: button
          - style: switch
          - adjacentTo: label

      switch:
        label: "Show support title"
        args:
          - type: button
          - style: switch
          - adjacentTo: label

      name: card__footer
      button:
        args:
          - type: button
          - value: "Save"
          - style: button

```

As heading is in a class in itself, it's not used in the card part and is handled separately. This is not the case for the footer as the footer is a part of the card class and thus is handled inside it.

Notice the card itself has a class in it called __card__body__ which helps chatGPT to identify the class the elements belongs to. This stands true for the footer aswell which has __card__footer__ class.

In general we use the type of element for the entry point of the element. Meaning for switch for example, we declare that this element is switch, declare its label and the arguments with __args__ do denote any additional information to further enhance the locating ability of chatGPT and make the DSL more intuitive.

```
switch:
        label: "Show support name"
        args:
          - type: button
          - style: switch
          - adjacentTo: label
```

There are some edge cases. These usually have deeper div structure that require special handling both in DSLs and in prompt. Edge cases are the hardest to handle as it is difficult to describe each edge case handling in the prompt.

```
    label:
      args:
          - type: text
          - value: "Monday"
          - style: label
    switch:
      args:
          - type: button
          - style: switch
          - selector: div div.switch button
    input:
      args:
          - type: input
          - style: timepicker
    input:
      args:
          - type: input
          - style: timepicker
```

# 


# How to use business.yml files to generate Playwright tests?

- First copy and paste the business.yml file to chatGPT. 

- Then take the whole of the prompt from the root folder and copy and paste it after the .yml file.

- Add that you want visibility tests. (Functionality tests generation have not been implemented yet)