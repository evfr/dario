1. There are 4 endpoints in this project:

    GET '/import' - triggers the contacts import from the "data/contacts.csv"
        before the import process all the previously existing contacts are deleted from the DB (i used mongo)
  
    GET '/form' - sends the input form html to the client

    POST '/submit' - sends the user data from the input form. Payload: name, email, phone and id
        if the user data exists in the DB and the user.isEnrolled is false, 
            user.isEnrolled property is set to "true" and a confirmation email is sent to the user's mail.
        if the user already  - the list of eligible devices is sent to the client
        if the user does not exist in the DB, a message "not eligible user" is sent to the client

    GET '/report' - returns the number of enrolled users divided by the total users number

2. the contacts.csv file currently has only 7 users. you can replace them with your own data instead.
    To make the contacts data import more efficient i use the "bulkWrite" method. The bulk size is set to 50
    but it can be changed (.ENV file). 

    I didn't use mongoose schema in this project because the contacts.csv can be huge and using mongoose can be 
    resource consuming in this scenario.