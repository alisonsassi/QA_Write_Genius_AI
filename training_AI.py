

from openai import OpenAI
from configAI import OpenIA

class TrainingModelAI:
  
  def suggestionOpenAI(description):

      client = OpenAI(api_key=OpenIA.api_key)
      
      Teach_chat_1 = '''Copy this typed message, and standardize it according to the test case rules:
                          rule 1- Use simple, direct language.
                          rule 2- Write a set of tests that demonstrate that the system meets the specified requirements.
                          rule 3- Avoid using names that can be changed. Examples to avoid Screen names; Field names; Button names.
                          rule 4- when quoting the name of a language in English, capitalize the first letter.
                          rule 5- Whenever you mention the name of the system or platform, it must be capitalized. example: "Tasy" is the name of the system.
                          rule 6- Always use single spaces between all words.
                          rule 7- There must be a character after the words: "ART/Squad:", "Sprint:", "SO:", "User story:", "Localization:", "Goal:", "Prerequisites:", "Step:" if there are no characters after these words, write a text suggestion so that the correct values can be set. Never write data if it is empty. 
                          
                      '''
      
      Teach_chat_2 = '''
                  Follow this template to suggest: Change the order if necessary:

                  ART/Squad: After the word 'ART/Squad:' is filled with name of team Format: DTP - Odin 
                  
                  Sprint:  After the word 'Sprint:' is one work and one number Format: Juno 1 or Juno.1 or Juno-1
                  
                  User story: After the word 'User story:' is a Number, normaly of more than 5 digits differents. No letters, no special symbols. Format: 6857485 
                  
                  SO: After the word 'SO:' is a Number, normaly of more than 6 digits differents. No letters, no special symbols. Format: 3126905 
                  
                  Localization: After the word 'Localization:' follow this Options: "Global", "Colombia", "Mexico", "Argentina".
                  
                  Goal: After the word 'Goal:' in the text, write a concise and direct sentence for better understanding. For example: 'As a user, I want to visualize the batch and the expiration date on stock movement when I register a consigned material as a loss.

                  Prerequisites: In this field is a text, which must have a logical sequence to describe one or more precondition requirements in order to perform the test.
                  For example: 
                  "
                  1- Material record: Have a medication record as "Consigned" on the record material screen where select if the material is consigned, not consigned, or both.
                  2- Core Table Settings: Have a "Rule for generating supplier batch" with the medication registered (Quantity to generate = Stock / Invoice Rule = Yes / Rule for Barcode on the Material = No / Rule of the receiving inspection = Yes
                  3- Core Table Settings: Have a "Stock operation" (Incoming/Outgoing = Incoming / Type of operation = Purchase invoice / Consigned type = Consigned purchase with material / Consumption = Does not affect / Cost calculation = Participate in average cost / Checkbox marked = Account for consigned consumption / Allows editing / Active Status / Summary column = Purchase)
                  4- Core Table Settings: Have a "Invoice operation" (Stock operation = same registered on previous step / Checkbox marked = Integrates accounts receivable / It is a purchase bill / Establishment stock transfer / Active status / Date rule of the Invoice accounting = Stock update / Generation of the invoice number = Manual / Retains Service Tax = Depends existence ISS on NF / Type of electronic invoice = Not an e-Invoice / Requires purchase order = No / Requires cost center when direct stock location = Requires cost center for direct location (Tasy default)
                  5- Invoice: Have an Invoice with the same stock operation registered before, an Item (material = medicine) with the amount, cost center, batch, and expiration. (Right-click button > Update invoice total > Calculate invoice)
                  6- System Administration: Function parameters > Chemotherapy > Parameter 181 = Yes and Parameter 306 = Yes.
                  "
                  Step: in the text, there should be a sequence of function names and commands to guide how to perform the test. 
                  For exemple: "
                  'Chemotherapy > Pharmacy > Cabin feeding > Select the medicine > Right-click button > Settle material as loss > Hamburger menu > Functions > Stock Management > Movement > Stock movement > Filter by the medicine."
                   '''
      Teach_Chat_3 = '''It is compulsory to leave them in the following order: "ART/Squad: Sprint: SO: User story: Localization: Goal: Prerequisites: Step:"
                  Suggestion: "ART/Squad: [Name of the team, e.g. DTP - Odin]

                              Sprint: [Sprint Name and Number, e.g. Juno 1]

                              SO: [Sales Order Number, e.g. 3126905]

                              User Story: [User Story Number, e.g. 6857485]

                              Localization: [Global, Colombia, Mexico, or Argentina]

                              Goal: [Concise and direct sentence describing the goal of the test]

                              Prerequisites: 
                              1. [Precondition requirement 1]
                              2. [Precondition requirement 2]
                              3. [Precondition requirement 3]
                              ...
                              [Additional preconditions if applicable]

                              Step: 
                              1. [Step 1: Action to perform]
                              2. [Step 2: Action to perform]
                              3. [Step 3: Action to perform]
                              ...
                              [Additional steps if necessary]"
                  ''' 
      
      Teach_Chat_4 = ''' Follow the rules below:
                      Avoid the word "Alter", recommend the word "Edit"
                      Avoid the word "Alteration", recommend the word "Edit"
                      Avoid the word "Consult/View", recommend the word "Search for"
                      Avoid the word "Shown", recommend the word "Display"
                      Avoid the word "Exclude", recommend the word "Delete"
                      Avoid the word "Include", recommend the word "Add"
                      Avoid the word "Consist", recommend the word "Validate"
                      Avoid the word "Release", recommend the word "Submit"
                      Avoid the word "Added", recommend the word "Saved"
                      Avoid the word "Viewed", recommend the word "Displayed"
                      Avoid the word "Keep/maintain/manage", recommend the word "Add, Edit, Delete, Search for, Print"
                      Avoid the word "wasn’t", recommend the word "was not "
                      Avoid the word "weren’t", recommend the word "were not"
                      Avoid the word "the system", recommend the word "Verify if"
                      Avoid the word "the user", recommend the word "Verify if"
                      Avoid the word "Validate", recommend the word "Verify if"
                      Avoid the word "shall be not", recommend the word "shall not be"
                      '''

      Teach_Chat_5 = "Deliver all information in a text format, with spacing between each item with break line, and each item in bold. Place each item in front of the sentence with the colon."
      Teach_Chat_6 = "In light of the rules, write a clearer test case that modifies the model and avoid modifying important information provided in that test case:"

      
      completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
          {"role": "system", "content": Teach_chat_1},
          {"role": "system", "content": Teach_chat_2},
          {"role": "system", "content": Teach_Chat_3},
          {"role": "system", "content": Teach_Chat_4},
          {"role": "system", "content": Teach_Chat_5},
          {"role": "system", "content": Teach_Chat_6},
          {"role": "user", "content": description}
      ]
      )
      return completion.choices[0].message.content

  def opinionTestCaseTyped(description):

      client = OpenAI(api_key=OpenIA.api_key)
      
      Teach_chat_1 = "return in model HTML with color when is written bad, and bold when opinion. The tips write in color red. The title is in model: '<h3>What do I understand from your writing?</h3>' and rest text in '<p>', but when need destaque, edit this HTML."
      Teach_chat_2 = "With the following text, being a test case, answer with reasons whether this test case is well written, and tips on how to improve it."

      
      completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
          {"role": "system", "content": Teach_chat_1},
          {"role": "system", "content": Teach_chat_2},
          {"role": "user", "content": description}
      ]
      )
      return completion.choices[0].message.content
