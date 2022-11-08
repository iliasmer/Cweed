# CWeed

This application matches job candidates resumes with a given set of keywords relevant to the role. 
[Website 🌎.](https://cweed-8332c.web.app/)

## Features

The user (targeted to be HR/recruitment workers) simply inputs the keywords of a certain job role. 
The pool of uploaded resumes will then be ranked and sorted according to the given keywords. Ranking 
of a resume is done with regards to equal words, synonyms and antonyms. 

The application keeps track of past searches to facilitate the work for the user. The user can 
ultimately read or retrieve contact details of suitable candidates. 

## Project structure

The *main* files and directories as described below.

```shell
cweed
├───public            # static assets (images, icons)
│   index.html        # HTML page the app is loaded into
└───src               # source files
    ├───components    # reusable components, e.g. buttons, forms, ..
    ├───presenters    # presentation logic
    └───views         # "pages" of the app
    App.js            # main app component
    CweedModel.js     # model definition
    index.js          # app entry point
    thesaurus.js      # API library
```

## Getting started

See [DEVELOPMENT.md](./DEVELOPMENT.md) for the setup guide.
