# todo-list

todo-list -> Organise your day 

This is a simple todolist web application system to manage to-dos implemented with NodeJs, Express, lodash, Ejs and Mongoose.

One can perform CRUD operations -> add new task, delete the completed task. 

One can also add custom url and it will be redirected to your custom url. Example - localhost:3000/job (It will redirect you to a new job title page)

## Screenshot 
![Screenshot 2023-02-05 at 00-42-36 ToDo List](https://user-images.githubusercontent.com/63224718/216814670-98c46136-0504-4f6d-9467-1e13d5ac1dbe.png)

## GIF
![ezgif com-gif-maker(1)](https://user-images.githubusercontent.com/63224718/216815593-85884332-a4e4-4a5e-bd3f-fab4a474b2fb.gif)

## To run the app:

> Prerequisites

In order to run this application locally you'll need to have Node.js installed in your system, as well as MongoDB. Running the app locally

Once you clone or download the repository files to your desired location, open a command-line terminal, navigate into the app top-level directory, and install the required package dependencies.

``` > $ cd todo-list  # or your chosen other directory name ```

``` > $ npm install             > install package dependencies ```

Then open two command-line terminals, one to run the mongosh process and the other to run the app:

`` CLI tab 1 (For rendering the MongoDB database locally) ``
> $ mongosh 

Finally, start the app by running the 'app.js' file: 

`` # CLI tab 2 ``
> $ node app.js   > or 'nodemon app.js', etc

and type "http://localhost:3000" in your browser's address to see the application running.

This site was developed by following along [The Complete 2023 Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/) Udemy course by [Angela Yu](https://www.google.com/search?client=firefox-b-d&q=angela-yu)
